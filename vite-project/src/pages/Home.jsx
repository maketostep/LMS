import {
  Container,
  Typography,
  Box,
  Grid2,
  Paper,
  Button,
} from "@mui/material";
import React from "react";
import { Link, Outlet } from "react-router";

const Home = () => {
  return (
    <>
      <Container>
        <Box my={4}>
          <Typography variant="h2" component="h1" gutterBottom>
            Добро пожаловать в центр обучения
          </Typography>
          <Typography variant="subtitle2">
            ГОСУДАРСТВЕННОЕ КАЗЕННОЕ УЧРЕЖДЕНИЕ ДОПОЛНИТЕЛЬНОГО
            ПРОФЕССИОНАЛЬНОГО ОБРАЗОВАНИЯ СТАВРОПОЛЬСКОГО КРАЯ "ЦЕНТР ПОДДЕРЖКИ
            ОСУЩЕСТВЛЕНИЯ ЗАКУПОК"
          </Typography>
        </Box>
        <Box
          component={Link}
          to="/auth"
          my={4}
          sx={{
            p: 3,
            alignItems: "center",
            alignContent: "center",
            alignSelf: "center",
          }}
        >
          <Button variant="outlined">Вход</Button>
        </Box>
      </Container>
    </>
  );
};

export default Home;
