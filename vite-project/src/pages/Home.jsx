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
        <Outlet />
        <Grid2 container spacing={4}>
          <Grid2 item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h5">
                Учитесь в своем собственном темпе
              </Typography>
              <Typography variant="body1">
                Вы можете получить доступ к нашим курсам в любое время и в любом
                месте.
              </Typography>
            </Paper>
          </Grid2>
          <Grid2 item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h5">Опытные инструкторы</Typography>
              <Typography variant="body1">
                Учитесь у экспертов отрасли с реальным опытом.
              </Typography>
            </Paper>
          </Grid2>
          <Grid2 item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h5">Круглосуточный доступ</Typography>
              <Typography variant="body1">Учитесь 24/7.</Typography>
            </Paper>
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
};

export default Home;
