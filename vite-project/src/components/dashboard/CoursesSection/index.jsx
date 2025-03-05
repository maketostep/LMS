import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Chip,
} from "@mui/material";
import { School, People, AccessTime } from "@mui/icons-material";
import {
  getCourseList,
  getStudentCountByCourse,
} from "../../../functions/data/coursesData";

// Демо-данные для курсов
// const demoСourses = [
//   {
//     id: 1,
//     title: "Введение в React",
//     description: "Базовый курс по React для начинающих разработчиков",
//     students: 24,
//     duration: "8 недель",
//     status: "active",
//   },
//   {
//     id: 2,
//     title: "JavaScript продвинутый",
//     description:
//       "Углубленное изучение JavaScript и современных возможностей языка",
//     students: 18,
//     duration: "10 недель",
//     status: "active",
//   },
//   {
//     id: 3,
//     title: "Основы Node.js",
//     description: "Изучение серверной разработки на Node.js",
//     students: 15,
//     duration: "6 недель",
//     status: "draft",
//   },
//   {
//     id: 4,
//     title: "Redux и управление состоянием",
//     description:
//       "Продвинутые техники управления состоянием в React-приложениях",
//     students: 12,
//     duration: "4 недели",
//     status: "active",
//   },
// ];

function CoursesSection() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    // Получаем список курсов
    async function fetchData() {
      const [error, data] = await getCourseList();

      if (error) {
        return setErrorMessage(await error.message);
      } else {
        for (const course of data) {
          const count = await getStudentCountByCourse(course.course_id);
          course.students = parseInt(count.studentCount);
          return setCourses([...data]);
        }
      }
    }
    fetchData();
    setLoading(false);
  }, []);

  // useEffect(() => {
  //   setLoading(true);
  //   async function fetchStudentCounts() {
  //     for (const course of courses) {
  //       const count = await getStudentCountByCourse(course.course_id);
  //       course.students = parseInt(count.studentCount);
  //       setCourses([...courses]);
  //     }
  //   }
  //   fetchStudentCounts();
  //   console.log(courses);
  //   setLoading(false);
  // }, []);

  const renderCourse = (course) => <Card key={course.id}></Card>;
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
        <Typography variant="h4">Курсы</Typography>
        <Button variant="contained" color="primary" startIcon={<School />}>
          Создать новый курс
        </Button>
      </Box>

      <Typography paragraph>
        Управляйте своими курсами, создавайте новые и редактируйте существующие.
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {loading ? (
          <Typography>Загрузка</Typography>
        ) : (
          courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.course_id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
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
                      {course.course_name}
                    </Typography>
                    <Chip
                      label={
                        course.status === "active" ? "Активный" : "Черновик"
                      }
                      color={course.status === "active" ? "success" : "default"}
                      size="small"
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {course.description}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <People
                      fontSize="small"
                      sx={{ mr: 1, color: "text.secondary" }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {course.students}{" "}
                      {course.students === 1 ? "студент" : "студента/студентов"}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <AccessTime
                      fontSize="small"
                      sx={{ mr: 1, color: "text.secondary" }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {course.duration} {course.duration === 1 ? "час" : "часа"}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button size="small">Редактировать</Button>
                  <Button size="small" color="primary">
                    Просмотр
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}

export default CoursesSection;
