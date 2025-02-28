import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Chip,
  Avatar,
  AvatarGroup,
} from "@mui/material";
import { Group, Add } from "@mui/icons-material";

// Демо-данные для групп
const demoGroups = [
  {
    id: 1,
    name: "Группа React-01",
    course: "Введение в React",
    students: 12,
    startDate: "15.09.2023",
    endDate: "10.11.2023",
    status: "active",
  },
  {
    id: 2,
    name: "Группа JS-Advanced",
    course: "JavaScript продвинутый",
    students: 8,
    startDate: "20.09.2023",
    endDate: "29.11.2023",
    status: "active",
  },
  {
    id: 3,
    name: "Группа Node-01",
    course: "Основы Node.js",
    students: 10,
    startDate: "05.10.2023",
    endDate: "16.11.2023",
    status: "pending",
  },
];

function GroupsSection() {
  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">Группы</Typography>
        <Button variant="contained" color="primary" startIcon={<Add />}>
          Создать новую группу
        </Button>
      </Box>

      <Typography paragraph>
        Управляйте группами студентов, создавайте новые группы и назначайте
        курсы.
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {demoGroups.map((group) => (
          <Grid item xs={12} sm={6} md={4} key={group.id}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography variant="h6" component="div" gutterBottom>
                    {group.name}
                  </Typography>
                  <Chip
                    label={group.status === "active" ? "Активная" : "Ожидание"}
                    color={group.status === "active" ? "success" : "warning"}
                    size="small"
                  />
                </Box>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Курс: <strong>{group.course}</strong>
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Начало: {group.startDate}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Окончание: {group.endDate}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="body2">
                    {group.students} студентов
                  </Typography>
                  <AvatarGroup max={4}>
                    {Array.from({ length: group.students }, (_, i) => (
                      <Avatar key={i} sx={{ width: 24, height: 24 }}>
                        {String.fromCharCode(65 + i)}
                      </Avatar>
                    ))}
                  </AvatarGroup>
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small">Редактировать</Button>
                <Button size="small" color="primary">
                  Просмотр
                </Button>
                <Button size="small" color="secondary">
                  Студенты
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default GroupsSection;
