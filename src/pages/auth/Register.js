import * as React from "react";
import { useState } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import {
  Button,
  CircularProgress,
  Autocomplete,
  Skeleton,
  Box,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Item, Title, SubTitle } from "../../components/Auth";
import {
  getAllDepartments,
  selectGetAllDepartments,
} from "../../features/department/getAllDepartment";

const FormInput = styled("div")(({ theme }) => ({
  height: "70px",
}));

export default function Register() {
  const dispatch = useDispatch();
  // let navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { departments, loadingStatus, error } = useSelector(
    selectGetAllDepartments
  );

  React.useEffect(() => {
    dispatch(getAllDepartments()).unwrap();
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
    } catch (err) {
      setIsSubmitted(false);
    }
  };

  console.log(departments);

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

          {loadingStatus ? (
            <Box sx={{ marginBottom: "1.3rem" }}>
              <Skeleton variant="rectangular" height={38} />
            </Box>
          ) : error ? (
            <>Error</>
          ) : (
            <Autocomplete
              id="clear-on-escape"
              clearOnEscape
              loading={loadingStatus}
              options={
                loadingStatus
                  ? []
                  : error
                  ? []
                  : departments?.data?.data?.departments?.map(
                      (item) => item.name
                    )
              }
              sx={{ height: "4rem" }}
              renderInput={(params) => (
                <TextField {...params} label="Department" size="small" />
              )}
            />
          )}

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
