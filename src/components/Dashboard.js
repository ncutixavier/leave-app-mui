import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { Typography, Avatar } from "@mui/material";
import logo from "../assets/logo.png";
import { useTheme } from "@mui/material/styles";
import FolderSharedOutlinedIcon from "@mui/icons-material/FolderSharedOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useNavigate, Outlet } from "react-router-dom";
import Button from "@mui/material/Button";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { decodeToken } from "../utils/auth";

const drawerWidth = 230;

const menuItems = [
  {
    text: "Home",
    path: "/employee",
    icon: <HomeOutlinedIcon color="primary" fontSize="medium" />,
  },
  {
    text: "Profile",
    path: "/admin/users",
    icon: <FolderSharedOutlinedIcon color="primary" fontSize="medium" />,
  },
];

export default function Dashboard(props) {
  const { window } = props;
  const theme = useTheme();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const user = decodeToken();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/auth");
  };

  React.useEffect(() => {
    if (!(user && user.role === "employee")) {
      localStorage.clear();
      navigate("/auth");
    }
  }, [navigate, user]);

  const drawer = (
    <Box
      sx={{
        backgroundColor: theme.palette.secondary.main,
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
                  color: theme.palette.primary.main,
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
        color="secondary"
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
            LEAVE APP
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
              color={theme.palette.primary.main}
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
              height: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
