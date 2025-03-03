import React, { useState } from "react";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  ListItemButton,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  BarChart as BarChartIcon,
  Group as GroupIcon,
} from "@mui/icons-material";

// Импортируем все секции
import StatisticsSection from "../components/dashboard/StatisticsSection";
import CoursesSection from "../components/dashboard/CoursesSection";
import UsersSection from "../components/dashboard/UsersSection";
import AnswersSection from "../components/dashboard/AnswersSection";
import ProfileSection from "../components/dashboard/ProfileSection";
import GroupsSection from "../components/dashboard/GroupsSection";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { login, userData, logout } from "../redux/slices/userSlice";
import { decodeToken } from "../functions/auth/decodeToken";

const drawerWidth = 240;

function Dashboard() {
  const [open, setOpen] = useState(true);
  // Текущий выбранный пункт меню
  const [selectedSection, setSelectedSection] = useState("statistics");
  // Состояние для меню профиля
  const [anchorEl, setAnchorEl] = useState(null);
  //// REDUX
  const { email, name, role } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  ////////////////////////
  console.log(email, name);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/auth");
    } else {
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        dispatch(
          userData({
            email: email,
            name: name,
            role: role,
          })
        );
      }
    }
  }, [dispatch, navigate]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Обработчик для выхода из системы
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("AuthToken");
    navigate("/auth");
  };
  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  // Функция для отображения выбранной секции
  const renderSection = () => {
    switch (selectedSection) {
      case "statistics":
        return <StatisticsSection />;
      case "courses":
        return <CoursesSection />;
      case "users":
        return <UsersSection />;
      case "answers":
        return <AnswersSection />;
      case "groups":
        return <GroupsSection />;
      case "profile":
        return <ProfileSection email={email} name={name} role={role} />;
      default:
        return <StatisticsSection />;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${open ? drawerWidth : 0}px)` },
          ml: { sm: `${open ? drawerWidth : 0}px` },
          transition: (theme) =>
            theme.transitions.create(["margin", "width"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerOpen}
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Образовательная платформа
          </Typography>
          <Tooltip title="Профиль">
            <IconButton onClick={handleMenuOpen} color="inherit">
              <Avatar sx={{ width: 32, height: 32 }}>
                {name ? name[0].toUpperCase() : "A"}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              onClick={() => {
                handleSectionChange("profile");
                handleMenuClose();
              }}
            >
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              Мой профиль
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Выйти
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "0 8px",
            ...{
              minHeight: 64,
              justifyContent: "flex-end",
            },
          }}
        >
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          <ListItemButton
            selected={selectedSection === "statistics"}
            onClick={() => handleSectionChange("statistics")}
          >
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Статистика" />
          </ListItemButton>
          <ListItemButton
            selected={selectedSection === "courses"}
            onClick={() => handleSectionChange("courses")}
          >
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="Курсы" />
          </ListItemButton>
          {role === "Администратор" && (
            <ListItemButton
              selected={selectedSection === "users"}
              onClick={() => handleSectionChange("users")}
            >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Пользователи" />
            </ListItemButton>
          )}
          {role === "Администратор" && (
            <ListItemButton
              selected={selectedSection === "groups"}
              onClick={() => handleSectionChange("groups")}
            >
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Группы" />
            </ListItemButton>
          )}
          {role === "Администратор" && (
            <ListItemButton
              selected={selectedSection === "answers"}
              onClick={() => handleSectionChange("answers")}
            >
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Ответы" />
            </ListItemButton>
          )}
        </List>
        <Divider />
        <List>
          <ListItem
            selected={selectedSection === "profile"}
            onClick={() => handleSectionChange("profile")}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Профиль" />
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 0,
          transition: (theme) =>
            theme.transitions.create("margin", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          marginLeft: `-${drawerWidth}px`,
          ...(open && {
            transition: (theme) =>
              theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
              }),
            marginLeft: 0,
          }),
        }}
      >
        <Toolbar /> {/* Этот элемент создает отступ под AppBar */}
        {renderSection()}
      </Box>
    </Box>
  );
}

export default Dashboard;
