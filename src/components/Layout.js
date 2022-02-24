import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet, useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import { List } from "@mui/material";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FolderIcon from "@mui/icons-material/Folder";
import { useTheme } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";

export default function Layout() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setOpen(open);
  };

  const menuItems = [
    {
      text: "Home",
      path: "/admin",
      icon: <HomeIcon style={{ color: "white" }} />,
    },
    {
      text: "Users",
      path: "/admin/users",
      icon: <AccountBoxIcon style={{ color: "white" }} />,
    },
    {
      text: "Departments",
      path: "/admin/departments",
      icon: <FolderIcon style={{ color: "white" }} />,
    },
  ];

  const list = () => (
    <Box
      sx={{ width: "93%" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            onClick={() => navigate(item.path)}
            sx={{ borderRadius: "0 50px 50px 0" }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const handlelogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: theme.palette.secondary.main,
        minHeight: "100vh",
      }}
    >
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="body1"
            noWrap
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Leave Application System
          </Typography>
          {localStorage.getItem("token") ? (
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => {
                handlelogout();
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            height: "100%",
            color: "white",
          }}
        >
          <Toolbar sx={{ width: "170px" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(false)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="body1" noWrap component="div">
              Leave Application System
            </Typography>
          </Toolbar>
          <Divider />
          {list()}
        </Box>
      </Drawer>
      <Outlet />
    </Box>
  );
}
