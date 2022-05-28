import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "../components/Layout";
import Auth from "../components/Auth";
import Department from "../pages/Department";
import Login from "../pages/auth/Login";
import Users from "../pages/Users";
import Admin from "../pages/Admin";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import Register from "../pages/auth/Register";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const theme = createTheme({
  palette: {
    primary: {
      main: "#AD0B63",
      text: "#000000",
    },
    secondary: {
      main: "#f5f5f5",
      text: "#888888",
    },
    error: {
      main: "#C32200",
    },
    warning: {
      main: "#ff9800",
    },
    text: {
      primary: "#000000",
      secondary: "#888888",
    },
  },
  typography: {
    fontFamily: `"Work Sans", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

const Index = () => {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/auth/" element={<Auth />}>
            <Route path="" element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="recover-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="admin" element={<Layout />}>
            <Route path="" element={<Admin />} />
            <Route exact path="departments" element={<Department />} />
            <Route exact path="users" element={<Users />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default Index;
