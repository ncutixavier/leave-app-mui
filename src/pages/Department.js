import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  getAllDepartments,
  selectGetAllDepartments,
} from "../features/department/getAllDepartment";
import { useDispatch, useSelector } from "react-redux";
import { addNewDepartment } from "../features/department/addNewDepartment";
import { updateDepartment } from "../features/department/updateDepartment";
import { deleteDepartment } from "../features/department/deleteDepartment";
import DialogContentText from "@mui/material/DialogContentText";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";

function createData(name, supervisor_name, supervisor_email) {
  return { name, supervisor_name, supervisor_email };
}

const rows = [
  createData("IT Department", "Xavier Ncuti", "test.it@gmail.com"),
  createData("Finance Department", "Peter Ncuti", "test.finance@gmail.com"),
  createData("HR Department", "Peter Chira", "test.hr@gmail.com"),
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    textTransform: "uppercase",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.secondary.main,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    borderBottom: `3px solid ${theme.palette.primary.main}`,
  },
}));

const TopHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const Department = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [form, setForm] = useState({
    title: "",
    editBtnDisplay: "none",
    createBtnDisplay: "none",
  });
  const [openEditModal, setOpenEditModal] = useState({ open: false });
  const [open, setOpen] = React.useState(false);
  const departments = useSelector(selectGetAllDepartments);
  const loadingStatus = useSelector((state) => state.getAllDepartments.loading);
  const error = useSelector((state) => state.getAllDepartments.error);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rowId, setRowId] = useState("");
  const [formError, setFormError] = useState({
    display: "none",
    message: "",
  });

  useEffect(() => {
    dispatch(getAllDepartments());
  }, [dispatch]);

  const DisplayDataInTable = (rows) => { 
    return (
      <TableContainer component={Paper} elevation={0}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Department Name</StyledTableCell>
              <StyledTableCell>Supervisor</StyledTableCell>
              <StyledTableCell>Supervisor Email</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell>{row.supervisor_name}</StyledTableCell>
                <StyledTableCell>{row.supervisor_email}</StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton
                    color="error"
                    onClick={() => handleAlertOpen(row)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton color="primary" onClick={() => handleEdit(row)}>
                    <EditIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  let content, rowsData;
  if (loadingStatus) {
    content = (
      <Box sx={{ position: "absolute", left: "47.5%", top: "45%" }}>
        <CircularProgress size={60} />
      </Box>
    );
  } else if (error) {
    content = (
      <Alert severity="error">
        Error occured while fetching data. Please try again later.
      </Alert>
    );
  } else if (departments.data && departments.data.data) {
    rowsData = departments.data.data.departments;
    content = DisplayDataInTable(rowsData);
  }

  const handleAlertOpen = (row) => {
    setOpen(true);
    setRowId(row._id);
  };

  const handleAlertClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      setIsSubmitted(true);
      const res = await dispatch(deleteDepartment(rowId)).unwrap();
      if (res.status === 200) {
        setIsSubmitted(false);
        setOpen(false);
        console.log("RESPONSE::", res);
        await dispatch(getAllDepartments());
      }
    } catch (err) {
      console.log("ERROR::", err);
      setIsSubmitted(false);
    }
  };

  const handleCreateDepartment = async (data) => {
    try {
      setIsSubmitted(true);
      const res = await dispatch(
        addNewDepartment({
          name: data.name,
          supervisor_name: data.supervisor,
          supervisor_email: data.email,
        })
      ).unwrap();
      if (res.status === 201) {
        setIsSubmitted(false);
        await dispatch(getAllDepartments());
        setFormError({ display: "none", message: "" });
        setOpenEditModal({ open: false });
      }
    } catch (err) {
      setIsSubmitted(false);
      setFormError({
        display: "flex",
        message: err.data.error,
      });
    }
  };

  const handleUpdateDepartment = async (data) => {
    console.log("UPDATE::", data, rowId);
    try {
      setIsSubmitted(true);
      const res = await dispatch(
        updateDepartment({
          id: rowId,
          name: data.name,
          supervisor_name: data.supervisor,
          supervisor_email: data.email,
        })
      ).unwrap();
      if (res.status === 200) {
        setOpenEditModal({ open: false });
        console.log("RESPONSE::", res);
        setIsSubmitted(false);
        await dispatch(getAllDepartments());
        setFormError({ display: "none", message: "" });
      }
    } catch (err) {
      console.log("ERROR::", err);
      setIsSubmitted(false);
      setFormError({
        display: "flex",
        message: "err.data.error",
      });
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Supervisor Email is required")
      .email("Invalid email"),
    name: Yup.string().required("Name is required"),
    supervisor: Yup.string().required("Supervisor Name is required"),
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    const subscription = watch((data) => {
      console.log("watch::", data);
      if (data.search) {
        const filteredData = rows.filter((row) => {
          return (
            row.name.toLowerCase().includes(data.search.toLowerCase()) ||
            row.supervisor_name
              .toLowerCase()
              .includes(data.search.toLowerCase()) ||
            row.supervisor_email
              .toLowerCase()
              .includes(data.search.toLowerCase())
          );
        });
        return filteredData;
        // setTableData(filteredData);
      } else {
        // setTableData(rows);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleEdit = (row) => {
    console.log("EDIT::", row);
    setRowId(row._id);
    setForm({
      title: "Edit Department",
      editBtnDisplay: "block",
      createBtnDisplay: "none",
    });
    setValue("email", row.supervisor_email);
    setValue("name", row.name);
    setValue("supervisor", row.supervisor_name);
    setOpenEditModal({ open: true });
    setFormError({ display: "none", message: "" });
  };

  const handleClose = () => {
    setOpenEditModal({ open: false });
  };

  const handleClickOpen = () => {
    setForm({
      title: "Add New Department",
      editBtnDisplay: "none",
      createBtnDisplay: "block",
    });
    setOpenEditModal({ open: true });
    resetField("email");
    resetField("name");
    resetField("supervisor");
  };

  return (
    <Container sx={{ mt: 3 }}>
      <TopHeader>
        <Typography variant="h5" component="div">
          Departments
        </Typography>
        <Paper
          variant="outlined"
          sx={{
            p: "2px 4px",
            display: "none",
            alignItems: "center",
            width: 400,
            height: "35px",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search department"
            inputProps={{ "aria-label": "search department" }}
            {...register("search")}
          />
          <IconButton sx={{ p: "10px" }} aria-label="search" disabled>
            <SearchIcon />
          </IconButton>
        </Paper>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Add
        </Button>
      </TopHeader>
      <Divider sx={{ my: 2 }} />
      {content}

      <Dialog
        fullScreen={fullScreen}
        open={openEditModal.open}
        onClose={handleClose}
      >
        <DialogTitle
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "white",
          }}
        >
          {form.title}
          <IconButton
            aria-label="close"
            onClick={handleClose}
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
        <Divider />

        <Alert severity="error" sx={{ display: formError.display }}>
          {formError.message}
        </Alert>

        <DialogContent>
          <TextField
            sx={{ height: "55px" }}
            margin="dense"
            label="Department Name"
            fullWidth
            variant="standard"
            {...register("name")}
            error={errors.name ? true : false}
            helperText={errors.name ? errors.name.message : null}
          />
          <TextField
            sx={{ height: "55px" }}
            margin="dense"
            label="Supervisor"
            fullWidth
            variant="standard"
            {...register("supervisor")}
            error={errors.supervisor ? true : false}
            helperText={errors.supervisor ? errors.supervisor.message : null}
          />
          <TextField
            sx={{ height: "55px" }}
            margin="dense"
            label="Supervisor Email"
            fullWidth
            variant="standard"
            {...register("email")}
            error={errors.email ? true : false}
            helperText={errors.email ? errors.email.message : null}
          />
        </DialogContent>
        <DialogActions sx={{ mb: 3 }}>
          <Button variant="contained" color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(handleCreateDepartment)}
            sx={{ display: form.createBtnDisplay, width: "100px" }}
          >
            {isSubmitted ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              "Create"
            )}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(handleUpdateDepartment)}
            sx={{ display: form.editBtnDisplay, width: "100px" }}
          >
            {isSubmitted ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              "Update"
            )}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open} onClose={handleAlertClose}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Confirm to delete the department
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleAlertClose}>
            Cancel
          </Button>
          <Button onClick={handleDelete} autoFocus disabled={isSubmitted}>
            {isSubmitted ? "Loading..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Department;
