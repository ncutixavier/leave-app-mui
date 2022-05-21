import * as React from "react";
import { useState } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { Button, CircularProgress, Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import { login } from "../../features/LoginSlice";
import { Item, Title, SubTitle } from "../../components/Auth";

const FormInput = styled("div")(({ theme }) => ({
  height: "70px",
}));

export default function Register() {
  const dispatch = useDispatch();
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
    name: Yup.string().required("Name is required"),
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
          <SubTitle variant="h5">Let’s create you an account</SubTitle>
          <Alert severity="error" sx={{ display: loginError.display }}>
            {loginError.message ?? "Error occured while logging in"}
          </Alert>
          <Alert severity="success" sx={{ display: loginSuccess.display }}>
            {loginSuccess.message ?? "Login successful"}
          </Alert>
          <FormInput>
            <TextField
              fullWidth
              label="Full Name"
              size="small"
              name="name"
              control={control}
              {...register("name")}
              error={errors.name ? true : false}
              helperText={errors.name ? errors.name.message : null}
            />
          </FormInput>
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
          <Autocomplete
            id="clear-on-escape"
            clearOnEscape
            options={["Pending", "Received", "Inline"]}
            sx={{ height: "4rem" }}
            renderInput={(params) => (
              <TextField {...params} label="Department" size="small" />
            )}
          />

          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitted ? (
              <CircularProgress color="inherit" size={25} />
            ) : (
              "Register"
            )}
          </Button>
        </Item>
      </Grid>
    </Grid>
  );
}
