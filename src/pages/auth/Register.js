import * as React from "react";
import { useState } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import {
  Button,
  CircularProgress,
  Autocomplete,
  InputAdornment,
  IconButton,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Item, Title, SubTitle } from "../../components/Auth";
import {
  getAllDepartments,
  selectGetAllDepartments,
} from "../../features/department/getAllDepartment";
import { register as registerUser } from "../../features/auth/RegisterSlice";
import { showErrorMessage } from "../../utils/toast";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";

const FormInput = styled("div")(({ theme }) => ({
  height: "70px",
}));

export default function Register() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { data, loading } = useSelector(selectGetAllDepartments);

  React.useEffect(() => {
    dispatch(getAllDepartments());
  }, [dispatch]);

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
      const res = await dispatch(registerUser(data)).unwrap();
      if (res.status === 201) {
        setIsSubmitted(false);
        navigate("/auth");
      }
    } catch (err) {
      setIsSubmitted(false);
      showErrorMessage(err.data.message);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (loading) return <CircularProgress />;

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

          <Autocomplete
            id="clear-on-escape"
            clearOnEscape
            loading={loading}
            options={data.data?.departments.map((option) => option.name)}
            sx={{ height: "4rem" }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Department"
                size="small"
                {...register("department_name")}
              />
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
