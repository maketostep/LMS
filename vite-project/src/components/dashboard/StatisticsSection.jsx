import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
} from "@mui/material";
import {
  School,
  People,
  Assignment,
  CheckCircle,
  PendingActions,
  TrendingUp,
  Group,
} from "@mui/icons-material";

// Импортируем библиотеку для графиков (нужно установить)
// npm install recharts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Демо-данные для статистики
const activityData = [
  { name: "Пн", студенты: 40, задания: 24 },
  { name: "Вт", студенты: 30, задания: 13 },
  { name: "Ср", студенты: 45, задания: 28 },
  { name: "Чт", студенты: 50, задания: 39 },
  { name: "Пт", студенты: 65, задания: 48 },
  { name: "Сб", студенты: 25, задания: 10 },
  { name: "Вс", студенты: 15, задания: 5 },
];

const courseCompletionData = [
  { name: "Введение в React", завершено: 75, незавершено: 25 },
  { name: "JavaScript продвинутый", завершено: 60, незавершено: 40 },
  { name: "Основы Node.js", завершено: 45, незавершено: 55 },
  { name: "Redux и управление состоянием", завершено: 30, незавершено: 70 },
];

const studentDistributionData = [
  { name: "Активные", value: 65 },
  { name: "Неактивные", value: 15 },
  { name: "Новые", value: 20 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function StatisticsSection() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Статистика
      </Typography>

      <Typography paragraph>
        Обзор ключевых показателей и статистики по курсам и студентам.
      </Typography>

      {/* Карточки с основными показателями */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{ p: 2, display: "flex", flexDirection: "column", height: 140 }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography color="text.secondary" variant="body2">
                Всего курсов
              </Typography>
              <School color="primary" />
            </Box>
            <Typography component="p" variant="h4" sx={{ mt: 2 }}>
              12
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ flex: 1, fontWeight: "bold", mt: 1 }}
            >
              <TrendingUp
                fontSize="small"
                sx={{ verticalAlign: "middle", mr: 0.5 }}
              />
              +2 за последний месяц
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{ p: 2, display: "flex", flexDirection: "column", height: 140 }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography color="text.secondary" variant="body2">
                Всего студентов
              </Typography>
              <People color="secondary" />
            </Box>
            <Typography component="p" variant="h4" sx={{ mt: 2 }}>
              248
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ flex: 1, fontWeight: "bold", mt: 1 }}
            >
              <TrendingUp
                fontSize="small"
                sx={{ verticalAlign: "middle", mr: 0.5 }}
              />
              +15 за последний месяц
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{ p: 2, display: "flex", flexDirection: "column", height: 140 }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography color="text.secondary" variant="body2">
                Активных заданий
              </Typography>
              <Assignment color="warning" />
            </Box>
            <Typography component="p" variant="h4" sx={{ mt: 2 }}>
              56
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ flex: 1, fontWeight: "bold", mt: 1 }}
            >
              <TrendingUp
                fontSize="small"
                sx={{ verticalAlign: "middle", mr: 0.5 }}
              />
              +8 за последнюю неделю
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{ p: 2, display: "flex", flexDirection: "column", height: 140 }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography color="text.secondary" variant="body2">
                Ответов на проверку
              </Typography>
              <PendingActions color="error" />
            </Box>
            <Typography component="p" variant="h4" sx={{ mt: 2 }}>
              23
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ flex: 1, fontWeight: "bold", mt: 1 }}
            >
              <CheckCircle
                fontSize="small"
                sx={{ verticalAlign: "middle", mr: 0.5, color: "success.main" }}
              />
              18 проверено сегодня
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Графики */}
      <Grid container spacing={3}>
        {/* График активности */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Активность за неделю
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={activityData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="студенты" stroke="#8884d8" />
                <Line type="monotone" dataKey="задания" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Распределение студентов */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Распределение студентов
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={studentDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {studentDistributionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Завершение курсов */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Прогресс по курсам (%)
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={courseCompletionData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="завершено" fill="#8884d8" />
                <Bar dataKey="незавершено" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Дополнительная статистика */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Топ курсов по активности" />
            <Divider />
            <CardContent>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography variant="body1">Введение в React</Typography>
                <Typography variant="body2" color="text.secondary">
                  78 студентов
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography variant="body1">JavaScript продвинутый</Typography>
                <Typography variant="body2" color="text.secondary">
                  65 студентов
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography variant="body1">Основы Node.js</Typography>
                <Typography variant="body2" color="text.secondary">
                  42 студента
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography variant="body1">
                  Redux и управление состоянием
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  36 студентов
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1">TypeScript для React</Typography>
                <Typography variant="body2" color="text.secondary">
                  27 студентов
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Активность групп" />
            <Divider />
            <CardContent>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Group sx={{ mr: 1, color: "primary.main" }} />
                  <Typography variant="body1">
                    Группа React-разработчиков
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Высокая
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Group sx={{ mr: 1, color: "secondary.main" }} />
                  <Typography variant="body1">JavaScript интенсив</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Средняя
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Group sx={{ mr: 1, color: "warning.main" }} />
                  <Typography variant="body1">Node.js практикум</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Высокая
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Group sx={{ mr: 1, color: "error.main" }} />
                  <Typography variant="body1">Fullstack разработка</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Низкая
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Group sx={{ mr: 1, color: "success.main" }} />
                  <Typography variant="body1">TypeScript мастер</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Средняя
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default StatisticsSection;
