import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Autocomplete,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
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
import { useDispatch, useSelector } from "react-redux";
import DialogContentText from "@mui/material/DialogContentText";
import { getAllUsers } from "../features/user/getAllUsers";
import { getAllDepartments } from "../features/department/getAllDepartment";
import { deleteUser } from "../features/user/deleteUser";
import Snackbar from "@mui/material/Snackbar";
import useMediaQuery from "@mui/material/useMediaQuery";

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

const Users = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [state, setstate] = useState({
    loading: false,
    openAlert: false,
    rowId: "",
    openSnackbar: false,
    error: "",
    openEditModal: false,
    display: "none",
    department: "",
    role: "",
  });

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Supervisor Email is required")
      .email("Invalid email"),
    name: Yup.string().required("Name is required"),
    role: Yup.string().required("Role is required"),
    department_name: Yup.string().required("Department is required"),
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleDelete = async () => {
    setstate({ ...state, loading: true });
    try {
      const { rowId } = state;
      const response = await dispatch(deleteUser(rowId)).unwrap();
      if (response.status === 200) {
        console.log("DELETE::", response);
        setstate({ ...state, loading: false, openAlert: false });
        dispatch(getAllUsers());
      }
    } catch (error) {
      console.log("DELETE-ERR::", error);
      setstate({
        ...state,
        loading: false,
        openSnackbar: true,
        error: error.data.message,
      });
    }
  };

  const handleAlertOpen = (row) => {
    setstate({ ...state, openAlert: true, rowId: row._id });
  };

  const handleAlertClose = () => {
    setstate({ ...state, openAlert: false, openSnackbar: false, error: "" });
  };

  const handleOpenEditModal = (row) => {
    console.log("row::", row);
    setValue("name", row.name);
    setValue("email", row.email);
    setValue("role", state.role);
    setValue("department_name", state.department);
    setstate({
      ...state,
      openEditModal: true,
      department: row.department.name,
      role: row.role,
    });
  };

  const handleCloseEditModal = () => {
    setstate({ ...state, openEditModal: false });
  };

  const handleEdit = async (data) => {
    setstate({ ...state, loading: true });
    console.log("DATA::", data);
  };

  const displayData = (rows) => {
    const search = watch("search");
    let filteredData = rows;
    if (search) {
      filteredData = rows.filter((row) => {
        return (
          row.name.toLowerCase().includes(search.toLowerCase()) ||
          row.email.toLowerCase().includes(search.toLowerCase()) ||
          row.department.name.toLowerCase().includes(search.toLowerCase())
        );
      });
    }
    return (
      <TableContainer component={Paper} elevation={0}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              {["Name", "Email", "Role", "Department", ""].map(
                (cell, index) => (
                  <StyledTableCell key={index}>{cell}</StyledTableCell>
                )
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredData.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell>{row.email}</StyledTableCell>
                <StyledTableCell>{row.role}</StyledTableCell>
                <StyledTableCell>{row.department.name}</StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton
                    color="error"
                    onClick={() => handleAlertOpen(row)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenEditModal(row)}
                  >
                    <EditIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllDepartments());
  }, [dispatch]);

  const users = useSelector((state) => state.getAllUsers);
  const departments = useSelector((state) => state.getAllDepartments);
  const { loading, error, usersData } = users;
  const {
    loading: loadingDepartments,
    error: errorDepartments,
    data: departmentsData,
  } = departments;

  let content, departmentOptions;
  if (loading) {
    content = (
      <Box sx={{ position: "absolute", left: "47.3%", top: "45%" }}>
        <CircularProgress size={60} />
      </Box>
    );
  } else if (error) {
    content = (
      <Alert severity="error">
        Error occured while fetching data. Please try again later.
      </Alert>
    );
  } else if (usersData && usersData.data) {
    content = displayData(usersData.data.users);
  }

  // Loading Departments
  if (loadingDepartments) {
    departmentOptions = "";
  } else if (errorDepartments) {
    departmentOptions = "";
  } else if (departmentsData && departmentsData.data) {
    departmentOptions = departmentsData.data.departments;
    console.log("DEPARTMENTS::", departmentOptions);
  }

  return (
    <Container sx={{ mt: 3 }}>
      <TopHeader>
        <Typography variant="h5" component="div">
          Users
        </Typography>
        <Paper
          variant="outlined"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 230,
            height: "35px",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
            {...register("search")}
          />
          <IconButton sx={{ p: "10px" }} aria-label="search" disabled>
            <SearchIcon />
          </IconButton>
        </Paper>
      </TopHeader>
      <Divider sx={{ my: 2 }} />
      {content}
      <Dialog open={state.openAlert} onClose={handleAlertClose}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Confirm to delete the department
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleAlertClose}>
            Cancel
          </Button>
          <Button onClick={handleDelete} autoFocus disabled={state.loading}>
            {state.loading ? "Loading..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={state.openSnackbar} autoHideDuration={6000}>
        <Alert severity="error" sx={{ width: "100%" }}>
          {state.error}
        </Alert>
      </Snackbar>
      <Dialog
        fullScreen={fullScreen}
        open={state.openEditModal}
        onClose={handleCloseEditModal}
      >
        <DialogTitle
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "white",
          }}
        >
          Edit User
          <IconButton
            aria-label="close"
            onClick={handleCloseEditModal}
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

        <Alert severity="error" sx={{ display: state.display }}>
          {state.error}
        </Alert>

        <DialogContent>
          <TextField
            sx={{ height: "55px" }}
            margin="dense"
            label="Name"
            fullWidth
            variant="standard"
            {...register("name")}
            error={errors.name ? true : false}
            helperText={errors.name ? errors.name.message : null}
          />
          <TextField
            sx={{ height: "55px" }}
            margin="dense"
            label="Email"
            fullWidth
            variant="standard"
            {...register("email")}
            error={errors.email ? true : false}
            helperText={errors.email ? errors.email.message : null}
          />

          <Autocomplete
            options={["employee", "manager", "admin"]}
            value={state.role}
            renderInput={(params) => (
              <TextField
                {...params}
                {...register("role")}
                sx={{ height: "55px" }}
                margin="dense"
                label="Role"
                variant="standard"
                error={errors.role ? true : false}
                helperText={errors.role ? errors.role.message : null}
              />
            )}
          />

          <Autocomplete
            options={
              departmentOptions
                ? departmentOptions.map((option) => option.name)
                : []
            }
            value={state.department}
            renderInput={(params) => (
              <TextField
                {...params}
                {...register("department_name")}
                sx={{ height: "55px" }}
                variant="standard"
                margin="dense"
                label="Department"
                error={errors.department_name ? true : false}
                helperText={
                  errors.department_name ? errors.department_name.message : null
                }
              />
            )}
          />
        </DialogContent>
        <DialogActions sx={{ mb: 3 }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleCloseEditModal}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: "100px" }}
            onClick={handleSubmit(handleEdit)}
          >
            {state.loading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              "Update"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Users;
