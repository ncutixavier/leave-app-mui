import * as React from "react";
import { useState } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import {
  Button,
  CircularProgress,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Item, Title, SubTitle } from "../../components/Auth";
import { useTheme } from "@emotion/react";
import { resetPassword } from "../../features/auth/ResetPasswordSlice";
import { showErrorMessage } from "../../utils/toast";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";

const FormInput = styled("div")(({ theme }) => ({
  height: "70px",
}));

export default function Login() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const theme = useTheme();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    code: Yup.string().required("Code is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
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
      const payload = {
        otp: data.code,
        password: data.password,
        email: localStorage.getItem("email"),
      };
      const res = await dispatch(resetPassword(payload)).unwrap();
      if (res.status === 200) {
        setIsSubmitted(false);
        navigate("/auth/login");
      }
    } catch (err) {
      showErrorMessage(err.data.message);
      setIsSubmitted(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
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
          <FormInput>
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      {showPassword ? (
                        <VisibilityOutlined />
                      ) : (
                        <VisibilityOffOutlined />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
              label="Password"
              size="small"
              name="password"
              type={showPassword ? "text" : "password"}
              control={control}
              {...register("password")}
              error={errors.password ? true : false}
              helperText={errors.password ? errors.password.message : null}
            />
          </FormInput>
          <FormInput>
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      {showPassword ? (
                        <VisibilityOutlined />
                      ) : (
                        <VisibilityOffOutlined />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
              label="Confirm Password"
              size="small"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
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
            {localStorage.getItem("email") ? (
              <span>
                code sent to <u>{localStorage.getItem("email")}</u>
              </span>
            ) : null}
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
