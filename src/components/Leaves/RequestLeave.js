import * as React from "react";
import Button from "@mui/material/Button";
import { TextField, IconButton, Alert } from "@mui/material";
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
import { editLeave } from "../../features/leave/editLeave";
import { requestLeaveSchema } from "../../validations/index";
import { showErrorMessage } from "../../utils/toast";
import { getLeaves } from "../../features/leave/getLeaves";
import SelectDropdown from "../form/SelectDropdown";
import { getReturnDate } from "../../utils/date";

export default function RequestLeave(props) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [leaveType, setLeaveType] = React.useState("");
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const leaveTypes = [
    "Sick Leave",
    "Vacation Leave",
    "Maternity Leave",
    "Paternity Leave",
    "Bereavement Leave",
    "Study Leave",
    "Other",
  ];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(requestLeaveSchema),
  });

  React.useEffect(() => {
    if (props.leave) {
      setLeaveType(props.leave?.type);
      setValue("type", props.leave?.type);
      setValue("startDate", props.leave?.startDate.split("T")[0]);
      setValue("numberOfDays", props.leave?.numberOfDays);
      setValue("reason", props.leave?.reason);
    }
  }, [props.leave, setValue]);

  const onSubmit = async (data) => {
    try {
      setIsSubmitted(true);
      const res = await dispatch(requestLeave(data)).unwrap();
      if (res.status === 201) {
        setIsSubmitted(false);
        props.close();
        dispatch(getLeaves());
        reset();
      }
    } catch (error) {
      setIsSubmitted(false);
      showErrorMessage(error.data.message);
    }
  };

  const onSave = async (data) => {
    try {
      console.log("SAVE", data);
      setIsSubmitted(true);
      data = { ...data, id: props.leave?._id };
      const res = await dispatch(editLeave(data)).unwrap();
      if (res.status === 200) {
        setIsSubmitted(false);
        props.close();
        dispatch(getLeaves());
        reset();
      }
    } catch (error) {
      console.log(error);
      setIsSubmitted(false);
      showErrorMessage(error.data.message);
    }
  };

  const addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const leaveDays = parseInt(watch("numberOfDays"));
  const leaveStartDate = watch("startDate");

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
          {props.leave ? "Edit Leave" : "Request Leave"}
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
            defaultValue={addDays(new Date(), 1).toISOString().split("T")[0]}
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: addDays(new Date(), 1).toISOString().split("T")[0],
            }}
            autoFocus
            // sx={{ mb: 1 }}
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
          <SelectDropdown
            label="Leave type"
            onChange={(e) => {
              setLeaveType(e.target.value);
              setValue("type", e.target.value);
            }}
            value={leaveType}
            options={leaveTypes}
            error={errors.type ? true : false}
            helperText={errors.type ? errors.type.message : null}
            name="type"
            register={register}
          />
          <TextField
            margin="dense"
            label="More comments"
            fullWidth
            variant="standard"
            maxRows={4}
            multiline
            {...register("reason")}
          />
          {leaveDays > 0 && (
            <Alert severity="info" sx={{ mt: 2 }}>
              Return date:{" "}
              {getReturnDate(leaveStartDate, leaveDays).toLocaleDateString(
                "en-US",
                dateOptions
              )}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close}>Cancel</Button>
          {props.leave ? (
            <Button onClick={handleSubmit(onSave)} disabled={isSubmitted}>
              {isSubmitted ? "Saving..." : "Save"}
            </Button>
          ) : (
            <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitted}>
              {isSubmitted ? "Submitting..." : "Submit"}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
