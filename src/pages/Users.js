import React, { useEffect } from "react";
// import { useTheme } from "@mui/material/styles";
import {
  Container,
  Box,
  Typography,
  // Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import Divider from "@mui/material/Divider";
// import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import TextField from "@mui/material/TextField";
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
// import DialogContentText from "@mui/material/DialogContentText";
import { getAllUsers } from "../features/user/getAllUsers";

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

const Users = () => {
  // const theme = useTheme();
  const dispatch = useDispatch();
  // const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const users = useSelector((state) => state.getAllUsers);
  const { loading, error, data } = users;

  let content, rowsData;
  if (loading) {
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
  } else if (data && data.data) {
    rowsData = data.data.users;
    content = (
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
            {rowsData.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell>{row.email}</StyledTableCell>
                <StyledTableCell>{row.role}</StyledTableCell>
                <StyledTableCell>{row.department.name}</StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Supervisor Email is required")
      .email("Invalid email"),
    name: Yup.string().required("Name is required"),
    supervisor: Yup.string().required("Supervisor Name is required"),
  });

  const {
    register,
    // handleSubmit,
    watch,
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
    </Container>
  );
};

export default Users;
