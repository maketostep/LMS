import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Search,
  AssignmentTurnedIn,
  CheckCircle,
  PendingActions,
} from "@mui/icons-material";

// Демо-данные для ответов на проверку
const demoAnswers = [
  {
    id: 1,
    student: "Иванов Иван",
    course: "Введение в React",
    assignment: "Создание компонента с хуками",
    submittedDate: "2023-10-15",
    status: "pending",
  },
  {
    id: 2,
    student: "Петрова Анна",
    course: "JavaScript продвинутый",
    assignment: "Реализация промисов",
    submittedDate: "2023-10-14",
    status: "pending",
  },
  {
    id: 3,
    student: "Сидоров Алексей",
    course: "Введение в React",
    assignment: "Работа с состоянием",
    submittedDate: "2023-10-13",
    status: "checked",
  },
  {
    id: 4,
    student: "Козлова Мария",
    course: "Основы Node.js",
    assignment: "Создание REST API",
    submittedDate: "2023-10-12",
    status: "pending",
  },
  {
    id: 5,
    student: "Новиков Дмитрий",
    course: "JavaScript продвинутый",
    assignment: "Асинхронные функции",
    submittedDate: "2023-10-11",
    status: "checked",
  },
  {
    id: 6,
    student: "Морозова Елена",
    course: "Введение в React",
    assignment: "Маршрутизация в React",
    submittedDate: "2023-10-10",
    status: "pending",
  },
  {
    id: 7,
    student: "Волков Сергей",
    course: "Основы Node.js",
    assignment: "Работа с файловой системой",
    submittedDate: "2023-10-09",
    status: "pending",
  },
  {
    id: 8,
    student: "Соколова Ольга",
    course: "JavaScript продвинутый",
    assignment: "Паттерны проектирования",
    submittedDate: "2023-10-08",
    status: "checked",
  },
];

function AnswersSection() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  // Фильтрация ответов по поисковому запросу
  const filteredAnswers = demoAnswers.filter(
    (answer) =>
      answer.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      answer.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      answer.assignment.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <Typography variant="h4">Проверка ответов</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Chip
            icon={<PendingActions />}
            label={`Ожидают проверки: ${
              demoAnswers.filter((a) => a.status === "pending").length
            }`}
            color="warning"
          />
          <Chip
            icon={<CheckCircle />}
            label={`Проверено: ${
              demoAnswers.filter((a) => a.status === "checked").length
            }`}
            color="success"
          />
        </Box>
      </Box>

      <Typography paragraph>
        Здесь вы можете проверять ответы студентов на задания и выставлять
        оценки.
      </Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Поиск по студенту, курсу или заданию..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="таблица ответов">
          <TableHead>
            <TableRow>
              <TableCell>Студент</TableCell>
              <TableCell>Курс</TableCell>
              <TableCell>Задание</TableCell>
              <TableCell>Дата отправки</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAnswers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((answer) => (
                <TableRow key={answer.id}>
                  <TableCell component="th" scope="row">
                    {answer.student}
                  </TableCell>
                  <TableCell>{answer.course}</TableCell>
                  <TableCell>{answer.assignment}</TableCell>
                  <TableCell>{answer.submittedDate}</TableCell>
                  <TableCell>
                    <Chip
                      label={
                        answer.status === "pending"
                          ? "Ожидает проверки"
                          : "Проверено"
                      }
                      color={
                        answer.status === "pending" ? "warning" : "success"
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<AssignmentTurnedIn />}
                      color={
                        answer.status === "pending" ? "primary" : "secondary"
                      }
                    >
                      {answer.status === "pending"
                        ? "Проверить"
                        : "Просмотреть"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredAnswers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Строк на странице:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} из ${count}`
        }
      />
    </Box>
  );
}

export default AnswersSection;
