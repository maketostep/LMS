import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Container,
  Box,
  Typography,
  Alert,
} from "@mui/material";
import { AuthServer } from "../functions/auth/authServer";
import { useNavigate } from "react-router";
import { decodeToken } from "../functions/auth/decodeToken";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/userSlice";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authType, setAuthType] = useState(true);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Использование Redux

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    // Если есть токен, проверяем его действительность
    if (token) {
      const decoded = decodeToken(token);
      const currentTime = Date.now() / 1000; // Время в секундах
      if (decoded && decoded.exp > currentTime) {
        navigate("/dashboard");
      } else {
        localStorage.removeItem("authToken");
      }
    }
  }, [navigate]);

  const checkUserData = async (event) => {
    setAlert(null);
    event.preventDefault();
    console.log(authType, email, password);
    try {
      const data = await AuthServer(email, password, authType);
      console.log(data);
      if (data[0] === 200 || data[0] === 201) {
        dispatch(
          login({
            token: data[1].token,
            email: email,
            role: data[1].role,
            name: data[1].name,
            password: password,
          })
        );
        localStorage.setItem("authToken", data[1].token);
        navigate("/dashboard");
        data[0] === 200
          ? console.log("Login Succesful")
          : console.log("Register Succesful");
      } else {
        setAlert(
          <Alert severity="error">{data[1].message || "Ошибка входа"}</Alert>
        );
      }
    } catch (error) {
      console.error(error);
      setAlert(<Alert severity="error">Ошибка сервера</Alert>);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {alert}
        <Typography component="h1" variant="h5">
          {authType ? "Вход" : "Регистрация"}
        </Typography>
        <Box component="form" onSubmit={checkUserData} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 1 }}
          >
            {authType ? "Войти" : "Зарегистрироваться"}
          </Button>
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          color="inherit"
          sx={{ mb: 2 }}
          onClick={() => setAuthType(!authType)}
        >
          {!authType ? "Войти" : "Зарегистрироваться"}
        </Button>
      </Box>
    </Container>
  );
}

export default Auth;
