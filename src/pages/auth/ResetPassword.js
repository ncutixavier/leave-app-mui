import * as React from "react";
import { useState } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { Button, CircularProgress, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import { login } from "../../features/LoginSlice";
import { Item, Title, SubTitle } from "../../components/Auth";
import { useTheme } from "@emotion/react";

const FormInput = styled("div")(({ theme }) => ({
  height: "70px",
}));

export default function Login() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const theme = useTheme();
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
    code: Yup.string().required("Code is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
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
        navigate("/admin/departments");
      }
    } catch (err) {
      setLoginError({ display: "flex", message: err.data.message });
      setIsSubmitted(false);
    }
  };

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: "80vh",
      }}
    >
      <Grid item xs={12} sm={8} md={4}>
        <Item>
          <Title variant="h5">Leave Application System</Title>
          <SubTitle variant="h5">Reset password</SubTitle>
          <Alert severity="error" sx={{ display: loginError.display }}>
            {loginError.message ?? "Error occured while logging in"}
          </Alert>
          <Alert severity="success" sx={{ display: loginSuccess.display }}>
            {loginSuccess.message ?? "Login successful"}
          </Alert>

          <FormInput>
            <TextField
              fullWidth
              label="Password"
              size="small"
              name="password"
              type="password"
              control={control}
              {...register("password")}
              error={errors.password ? true : false}
              helperText={errors.password ? errors.password.message : null}
            />
          </FormInput>
          <FormInput>
            <TextField
              fullWidth
              label="Confirm Password"
              size="small"
              name="confirmPassword"
              type="password"
              control={control}
              {...register("confirmPassword")}
              error={errors.confirmPassword ? true : false}
              helperText={
                errors.confirmPassword ? errors.confirmPassword.message : null
              }
            />
          </FormInput>
          <FormInput style={{ height: "40px" }}>
            <TextField
              fullWidth
              label="Code"
              size="small"
              name="code"
              control={control}
              {...register("code")}
              error={errors.code ? true : false}
              helperText={errors.code ? errors.code.message : null}
            />
          </FormInput>
          <Box
            sx={{
              color: theme.palette.text.secondary,
              textAlign: "right",
              fontSize: "0.9rem",
              marginBottom: "1rem",
            }}
          >
            code sent to <u>ncuti65@gmail.com</u>
          </Box>

          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitted ? (
              <CircularProgress color="inherit" size={25} />
            ) : (
              "Save"
            )}
          </Button>
        </Item>
      </Grid>
    </Grid>
  );
}
