import * as React from "react";
import Button from "@mui/material/Button";
import { TextField, IconButton, MenuItem } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { requestLeave } from "../../features/leave/requestLeave";
import { requestLeaveSchema } from "../../validations/index";
import { showErrorMessage } from "../../utils/toast";
import { getLeaves } from "../../features/leave/getLeaves";

export default function RequestLeave(props) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(requestLeaveSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitted(true);
      const res = await dispatch(requestLeave(data)).unwrap();
      if (res.status === 201) {
        setIsSubmitted(false);
        props.close();
        dispatch(getLeaves());
      }
    } catch (error) {
      setIsSubmitted(false);
      showErrorMessage(error.data.message);
    }
  };

  return (
    <div>
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "100%" } }}
        maxWidth="xs"
        open={props.open}
        onClose={props.close}
        fullScreen={fullScreen}
      >
        <DialogTitle
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "white",
          }}
        >
          Request a Leave
          <IconButton
            aria-label="close"
            onClick={props.close}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "white",
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ my: 3 }}>
            Fill in the form below to request a leave*.
          </DialogContentText>
          <TextField
            label="When would you like to take your leave?"
            type="date"
            fullWidth
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: new Date(new Date().setDate(new Date().getDate() + 1))
                .toISOString()
                .split("T")[0],
            }}
            autoFocus
            sx={{ mb: 1 }}
            {...register("startDate")}
            error={errors.startDate ? true : false}
            helperText={errors.startDate ? errors.startDate.message : null}
          />
          <TextField
            margin="dense"
            label="Number of days"
            type="number"
            fullWidth
            variant="standard"
            InputProps={{
              inputProps: {
                max: 18,
                min: 1,
              },
            }}
            sx={{ mb: 1 }}
            {...register("numberOfDays")}
            error={errors.numberOfDays ? true : false}
            helperText={
              errors.numberOfDays ? errors.numberOfDays.message : null
            }
          />
          <TextField
            id="select"
            label="Leave type"
            value={getValues("type")}
            defaultValue=""
            select
            margin="dense"
            fullWidth
            variant="standard"
            sx={{ mb: 1 }}
            control={control}
            onChange={(e) =>
              setValue("select", e.target.value, { shouldValidate: true })
            }
            {...register("type")}
            error={errors.type ? true : false}
            helperText={errors.type ? errors.type.message : null}
          >
            {[
              "Sick Leave",
              "Vacation Leave",
              "Maternity Leave",
              "Paternity Leave",
              "Bereavement Leave",
              "Study Leave",
              "Other",
            ].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label="Reason for leave"
            fullWidth
            variant="standard"
            maxRows={4}
            multiline
            {...register("reason")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitted}>
            {isSubmitted ? "Submitting..." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
