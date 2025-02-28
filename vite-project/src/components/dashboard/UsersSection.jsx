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
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Search,
  Add,
  Edit,
  Delete,
  AdminPanelSettings,
  School,
  Person,
} from "@mui/icons-material";

// Демо-данные для пользователей
const demoUsers = [
  {
    id: 1,
    name: "Иванов Иван",
    email: "ivanov@example.com",
    role: "admin",
    status: "active",
    lastLogin: "2023-10-15 14:30",
  },
  {
    id: 2,
    name: "Петрова Анна",
    email: "petrova@example.com",
    role: "teacher",
    status: "active",
    lastLogin: "2023-10-14 09:15",
  },
  {
    id: 3,
    name: "Сидоров Алексей",
    email: "sidorov@example.com",
    role: "student",
    status: "active",
    lastLogin: "2023-10-13 16:45",
  },
  {
    id: 4,
    name: "Козлова Мария",
    email: "kozlova@example.com",
    role: "student",
    status: "inactive",
    lastLogin: "2023-09-30 11:20",
  },
  {
    id: 5,
    name: "Новиков Дмитрий",
    email: "novikov@example.com",
    role: "teacher",
    status: "active",
    lastLogin: "2023-10-12 13:10",
  },
  {
    id: 6,
    name: "Морозова Елена",
    email: "morozova@example.com",
    role: "student",
    status: "active",
    lastLogin: "2023-10-11 10:05",
  },
  {
    id: 7,
    name: "Волков Сергей",
    email: "volkov@example.com",
    role: "student",
    status: "active",
    lastLogin: "2023-10-10 15:30",
  },
  {
    id: 8,
    name: "Соколова Ольга",
    email: "sokolova@example.com",
    role: "teacher",
    status: "inactive",
    lastLogin: "2023-09-25 09:45",
  },
];

function UsersSection() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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

  const handleOpenDialog = (user = null) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  // Фильтрация пользователей по поисковому запросу
  const filteredUsers = demoUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Получение иконки для роли пользователя
  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <AdminPanelSettings fontSize="small" />;
      case "teacher":
        return <School fontSize="small" />;
      case "student":
        return <Person fontSize="small" />;
      default:
        return <Person fontSize="small" />;
    }
  };

  // Получение названия роли на русском
  const getRoleName = (role) => {
    switch (role) {
      case "admin":
        return "Администратор";
      case "teacher":
        return "Преподаватель";
      case "student":
        return "Студент";
      default:
        return role;
    }
  };

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
        <Typography variant="h4">Пользователи</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Добавить пользователя
        </Button>
      </Box>

      <Typography paragraph>
        Управляйте пользователями системы, назначайте роли и права доступа.
      </Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Поиск по имени, email или роли..."
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
        <Table sx={{ minWidth: 650 }} aria-label="таблица пользователей">
          <TableHead>
            <TableRow>
              <TableCell>Пользователь</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Роль</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Последний вход</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell component="th" scope="row">
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        sx={{
                          mr: 2,
                          bgcolor:
                            user.role === "admin"
                              ? "primary.main"
                              : user.role === "teacher"
                              ? "secondary.main"
                              : "success.main",
                        }}
                      >
                        {user.name.charAt(0)}
                      </Avatar>
                      {user.name}
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip
                      icon={getRoleIcon(user.role)}
                      label={getRoleName(user.role)}
                      color={
                        user.role === "admin"
                          ? "primary"
                          : user.role === "teacher"
                          ? "secondary"
                          : "default"
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.status === "active" ? "Активен" : "Неактивен"}
                      color={user.status === "active" ? "success" : "error"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => handleOpenDialog(user)}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton color="error" size="small">
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Строк на странице:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} из ${count}`
        }
      />

      {/* Диалог добавления/редактирования пользователя */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedUser
            ? "Редактирование пользователя"
            : "Добавление нового пользователя"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              fullWidth
              label="Имя пользователя"
              variant="outlined"
              defaultValue={selectedUser?.name || ""}
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              defaultValue={selectedUser?.email || ""}
            />
            {!selectedUser && (
              <TextField
                fullWidth
                label="Пароль"
                variant="outlined"
                type="password"
              />
            )}
            <FormControl fullWidth>
              <InputLabel>Роль</InputLabel>
              <Select
                defaultValue={selectedUser?.role || "student"}
                label="Роль"
              >
                <MenuItem value="admin">Администратор</MenuItem>
                <MenuItem value="teacher">Преподаватель</MenuItem>
                <MenuItem value="student">Студент</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Статус</InputLabel>
              <Select
                defaultValue={selectedUser?.status || "active"}
                label="Статус"
              >
                <MenuItem value="active">Активен</MenuItem>
                <MenuItem value="inactive">Неактивен</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Отмена</Button>
          <Button variant="contained" color="primary">
            {selectedUser ? "Сохранить" : "Добавить"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UsersSection;
