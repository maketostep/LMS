import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Divider,
  Paper,
  TextField,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import { Save, Logout } from "@mui/icons-material";
import { logout } from "../../reducers/userSlice";

function ProfileSection() {
  const { token, email, name } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    name: name || "",
    email: email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("authToken");
    navigate("/auth");
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
    // Сбрасываем поля пароля при выходе из режима редактирования
    if (editMode) {
      setUserData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    // Здесь будет логика сохранения профиля
    // Для демонстрации просто показываем уведомление
    setNotification({
      open: true,
      message: "Профиль успешно обновлен",
      severity: "success",
    });
    setEditMode(false);
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Мой профиль
      </Typography>

      <Paper sx={{ p: 3, mt: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              bgcolor: "primary.main",
              fontSize: "2.5rem",
              mr: 3,
            }}
          >
            {name ? name.charAt(0).toUpperCase() : "U"}
          </Avatar>
          <Box>
            <Typography variant="h5">{name}</Typography>
            <Typography variant="body1" color="text.secondary">
              {email}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {!editMode ? (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Личная информация
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 2fr",
                gap: 2,
                mt: 2,
              }}
            >
              <Typography variant="body1" color="text.secondary">
                Имя:
              </Typography>
              <Typography variant="body1">{name}</Typography>

              <Typography variant="body1" color="text.secondary">
                Email:
              </Typography>
              <Typography variant="body1">{email}</Typography>

              <Typography variant="body1" color="text.secondary">
                Роль:
              </Typography>
              <Typography variant="body1">Администратор</Typography>
            </Box>

            <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleEditToggle}
              >
                Редактировать профиль
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleLogout}
                startIcon={<Logout />}
              >
                Выйти из системы
              </Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Редактирование профиля
            </Typography>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Имя"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  variant="outlined"
                  type="email"
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                  Изменение пароля
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Оставьте поля пустыми, если не хотите менять пароль
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Текущий пароль"
                  name="currentPassword"
                  value={userData.currentPassword}
                  onChange={handleChange}
                  variant="outlined"
                  type="password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Новый пароль"
                  name="newPassword"
                  value={userData.newPassword}
                  onChange={handleChange}
                  variant="outlined"
                  type="password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Подтверждение пароля"
                  name="confirmPassword"
                  value={userData.confirmPassword}
                  onChange={handleChange}
                  variant="outlined"
                  type="password"
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveProfile}
                startIcon={<Save />}
              >
                Сохранить изменения
              </Button>
              <Button variant="outlined" onClick={handleEditToggle}>
                Отмена
              </Button>
            </Box>
          </Box>
        )}
      </Paper>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ProfileSection;
