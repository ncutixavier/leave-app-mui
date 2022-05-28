import * as React from "react";
import { useState } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { Button, CircularProgress } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../features/auth/ForgotPasswordSlice";
import { Item, Title, SubTitle } from "../../components/Auth";
import { showSuccessMessage, showErrorMessage } from "../../utils/toast";

const FormInput = styled("div")(({ theme }) => ({
  height: "70px",
}));

export default function ForgotPassword() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid email"),
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
      console.log(data);
      const response = await dispatch(forgotPassword(data)).unwrap();
      if (response.status === 200) {
        showSuccessMessage(response.data.message);
        navigate("/auth/reset-password");
        setIsSubmitted(false);
      }
    } catch (err) {
      setIsSubmitted(false);
      showErrorMessage(err.data.message);
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
          <SubTitle variant="h5">Forgot password</SubTitle>
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

          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitted ? (
              <CircularProgress color="inherit" size={25} />
            ) : (
              "Send Email"
            )}
          </Button>
        </Item>
      </Grid>
    </Grid>
  );
}
