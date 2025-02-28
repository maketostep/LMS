// Содержимое боковой панели
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  menuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AccountCircle,
  School,
  Group,
  AssignmentTurnedIn,
  People,
  Logout,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";

function Sidebar({ selectedMenu, setSelectedMenu }) {
  // Состояние для мобильной версии (открыта/закрыта боковая панель)
  const [mobileOpen, setMobileOpen] = useState(false);

  // Обработчик для выбора пункта меню
  const handleMenuSelect = (menuItem) => {
    setSelectedMenu(menuItem);
    setMobileOpen(false); // Закрываем боковую панель на мобильных устройствах
  };
  // Содержимое для каждого пункта меню
  const renderContent = () => {
    switch (selectedMenu) {
      case "dashboard":
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Добро пожаловать, {name}!
            </Typography>
            <Typography paragraph>
              Это ваша персональная панель управления. Здесь вы можете видеть
              общую информацию о ваших курсах, группах и заданиях.
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 4 }}>
              <Box
                sx={{
                  bgcolor: "primary.light",
                  p: 3,
                  borderRadius: 2,
                  width: 250,
                }}
              >
                <Typography variant="h6" color="white">
                  Активные курсы
                </Typography>
                <Typography variant="h4" color="white">
                  5
                </Typography>
              </Box>
              <Box
                sx={{
                  bgcolor: "secondary.light",
                  p: 3,
                  borderRadius: 2,
                  width: 250,
                }}
              >
                <Typography variant="h6" color="white">
                  Мои группы
                </Typography>
                <Typography variant="h4" color="white">
                  3
                </Typography>
              </Box>
              <Box
                sx={{
                  bgcolor: "success.light",
                  p: 3,
                  borderRadius: 2,
                  width: 250,
                }}
              >
                <Typography variant="h6" color="white">
                  Ответы на проверку
                </Typography>
                <Typography variant="h4" color="white">
                  12
                </Typography>
              </Box>
            </Box>
          </Box>
        );
      case "courses":
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Курсы
            </Typography>
            <Typography paragraph>
              Здесь вы можете управлять своими курсами, создавать новые и
              редактировать существующие.
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Создать новый курс
            </Button>
          </Box>
        );
      case "groups":
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Группы
            </Typography>
            <Typography paragraph>
              Здесь вы можете управлять группами студентов, создавать новые
              группы и назначать курсы.
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Создать новую группу
            </Button>
          </Box>
        );
      case "answers":
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Проверка ответов
            </Typography>
            <Typography paragraph>
              Здесь вы можете проверять ответы студентов на задания и выставлять
              оценки.
            </Typography>
          </Box>
        );
      case "users":
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Пользователи
            </Typography>
            <Typography paragraph>
              Здесь вы можете управлять пользователями системы, назначать роли и
              права доступа.
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Добавить пользователя
            </Button>
          </Box>
        );
      default:
        return null;
    }
  };
  return (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Учебная платформа
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            selected={selectedMenu === "dashboard"}
            onClick={() => handleMenuSelect("dashboard")}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Главная" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            selected={selectedMenu === "courses"}
            onClick={() => handleMenuSelect("courses")}
          >
            <ListItemIcon>
              <School />
            </ListItemIcon>
            <ListItemText primary="Курсы" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            selected={selectedMenu === "groups"}
            onClick={() => handleMenuSelect("groups")}
          >
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText primary="Группы" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            selected={selectedMenu === "answers"}
            onClick={() => handleMenuSelect("answers")}
          >
            <ListItemIcon>
              <AssignmentTurnedIn />
            </ListItemIcon>
            <ListItemText primary="Проверка ответов" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            selected={selectedMenu === "users"}
            onClick={() => handleMenuSelect("users")}
          >
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Пользователи" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
}

export default Sidebar;
