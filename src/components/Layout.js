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
import { List, Avatar, ListItemButton, CssBaseline } from "@mui/material";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FolderIcon from "@mui/icons-material/Folder";
import { useTheme } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import { decodeToken } from "../utils/auth";
import logo from "../assets/logo_light.png";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";

const drawerWidth = 230;

export default function Layout(props) {
  const { window } = props;
  const navigate = useNavigate();
  const theme = useTheme();
  const user = decodeToken();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/auth");
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

  React.useEffect(() => {
    if (!(user && user.role === "admin")) {
      localStorage.clear();
      navigate("/auth");
    }
  }, [navigate, user]);

  const drawer = (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: theme.spacing(5, 0, 2, 0),
        }}
      >
        <Avatar
          variant="square"
          alt="Logo"
          src={logo}
          sx={{ width: 100, height: 58 }}
        />
      </Box>
      <Typography
        sx={{
          textAlign: "center",
          padding: theme.spacing(0, 3, 12),
          fontWeight: 800,
        }}
      >
        Leave Application System
      </Typography>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            button
            onClick={() => navigate(item.path)}
            sx={{ padding: theme.spacing(0, 4) }}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  color: theme.palette.primary.light,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        elevation={0}
        color="primary"
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography sx={{ flexGrow: 1, fontWeight: 800 }}>
            DASHBOARD
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography noWrap component="div">
              Welcome,
            </Typography>
            <Typography
              noWrap
              component="div"
              color={theme.palette.primary.contrast}
              ml={1}
            >
              {localStorage.getItem("user")}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          PaperProps={{
            sx: {
              backgroundColor: theme.palette.primary.main,
            },
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
          <Box
            sx={{
              height: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.palette.primary.main,
            }}
          >
            <Button
              variant="contained"
              onClick={() => logout()}
              startIcon={<ExitToAppOutlinedIcon />}
            >
              Logout
            </Button>
          </Box>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.palette.primary.main,
            }}
          >
            <Button
              variant="contained"
              onClick={() => logout()}
              startIcon={<ExitToAppOutlinedIcon />}
            >
              Logout
            </Button>
          </Box>
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
