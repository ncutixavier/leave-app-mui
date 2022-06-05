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
import { login } from "../../features/auth/LoginSlice";
import { Item, Title, SubTitle } from "../../components/Auth";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
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
        navigate("/dashboard");
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
          <SubTitle variant="h5">Sign in to continue</SubTitle>
          <FormInput>
            <TextField
              fullWidth
              label="Email"
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
          <Box
            sx={{
              margin: "1.5rem 0",
              fontSize: "1rem",
            }}
          >
            <Link
              to="/auth/recover-password"
              style={{
                color: theme.palette.primary.main,
                textDecoration: "none",
              }}
            >
              Forgot password?
            </Link>
          </Box>
        </Item>
      </Grid>
    </Grid>
  );
}
