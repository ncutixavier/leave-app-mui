import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "../components/Layout";
import Department from "../pages/Department";
import Login from "../pages/Login";
import Users from "../pages/Users";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9c27b0",
    },
    secondary: {
      main: "#f3e5f5",
    },
    error: {
      main: "#f44336",
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
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="admin" element={<Layout />}>
            <Route exact path="departments" element={<Department />} />
            <Route exact path="users" element={<Users />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default Index;
