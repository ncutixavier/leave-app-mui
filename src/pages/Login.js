import * as React from "react";
import { useState } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography, Button, CircularProgress } from "@mui/material";
import { useTheme } from "@emotion/react";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import { login } from "../features/LoginSlice";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  color: theme.palette.text.secondary,
}));

const FormInput = styled("div")(({ theme }) => ({
  height: "70px",
}));

const useStyles = makeStyles(({ spacing }) => ({
  loginForm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "55vh",
  },
}));

export default function Login() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const classes = useStyles();
  let navigate = useNavigate();
  const [loginError, setLoginError] = useState({
    display: "none",
    message: "",
  });
  const [loginSuccess, setLoginSuccess] = useState({
    display: "none",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitted(true);
      const res = await dispatch(login(data)).unwrap();
      if (res.status === 200) {
        setIsSubmitted(false);
        setLoginSuccess({ display: "flex", message: res.data.message });
        setLoginError({ display: "none", message: "" });
        navigate("/dashboard/departments");
      }
    } catch (err) {
      setLoginError({ display: "flex", message: err.data.message });
      setIsSubmitted(false);
    }
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ background: theme.palette.primary.main, height: "100vh" }}
    >
      <Grid item xs={12} sm={8} md={4}>
        <Typography
          variant="h5"
          sx={{
            my: 3,
            color: "white",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          Leave Application System
        </Typography>

        <Item className={classes.loginForm}>
          <Alert severity="error" sx={{ display: loginError.display }}>
            {loginError.message ?? "Error occured while logging in"}
          </Alert>
          <Alert severity="success" sx={{ display: loginSuccess.display }}>
            {loginSuccess.message ?? "Login successful"}
          </Alert>
          <Typography variant="h5" sx={{ my: 2, textAlign: "center" }}>
            Log in
          </Typography>
          <FormInput>
            <TextField
              fullWidth
              label="Email"
              id="fullWidth"
              size="small"
              name="email"
              control={control}
              {...register("email")}
              error={errors.email ? true : false}
              helperText={errors.email ? errors.email.message : null}
            />
          </FormInput>
          <FormInput>
            <TextField
              fullWidth
              label="Password"
              id="fullWidth"
              size="small"
              name="password"
              type="password"
              control={control}
              {...register("password")}
              error={errors.password ? true : false}
              helperText={errors.password ? errors.password.message : null}
            />
          </FormInput>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitted ? (
              <CircularProgress color="inherit" size={25} />
            ) : (
              "Login"
            )}
          </Button>
        </Item>
      </Grid>
    </Grid>
  );
}
