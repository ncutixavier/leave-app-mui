import React, { useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Grid, Paper, Avatar, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { styled } from "@mui/material/styles";
import logo from "../assets/logo.png";
import { decodeToken } from "../utils/auth";

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: theme.shadows[0],
}));

export const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  textAlign: "center",
  fontSize: "1.6rem",
  lineHeight: "1.5",

  [theme.breakpoints.down("sm")]: {
    fontSize: "1.45rem",
  },
}));

export const SubTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textAlign: "center",
  fontSize: "1.1rem",
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(5),
}));

const Auth = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const user = decodeToken();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/auth");
    }
    if (user && user.role === "employee") {
      navigate("/employee");
    } else if (user && user.role === "admin") {
      navigate("/admin");
    }
  }, [location.pathname, navigate, user]);
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      sx={{
        padding: theme.spacing(4),
      }}
    >
      <Grid
        container
        direction="row"
        alignItems="center"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={6}>
          <Item>
            <Avatar
              variant="square"
              alt="Logo"
              src={logo}
              sx={{ width: 80, height: 45 }}
            />
          </Item>
        </Grid>
        <Grid item xs={6}>
          {/register/.test(location.pathname) ? (
            <Item sx={{ textAlign: "right" }}>
              Already have account?{" "}
              <Link
                to="/auth"
                style={{
                  color: theme.palette.primary.main,
                }}
              >
                Sign in
              </Link>
            </Item>
          ) : (
            <Item sx={{ textAlign: "right" }}>
              Don’t have an account?{" "}
              <Link
                to="/auth/register"
                style={{
                  color: theme.palette.primary.main,
                }}
              >
                Sign up
              </Link>
            </Item>
          )}
        </Grid>
      </Grid>
      <Outlet />
    </Grid>
  );
};

export default Auth;
