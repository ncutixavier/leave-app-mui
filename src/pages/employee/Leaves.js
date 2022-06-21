import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
function createData(date, days, leave, status) {
  return { date, days, leave, status };
}

const rows = Array.from({ length: 50 }).map((_, index) => {
  return createData("From 12 May - 25 May", "5", "Vacation", "Pending");
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    textTransform: "uppercase",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: theme.palette.secondary.text,
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
  height: "45px",
}));

const StyledTableHeader = styled(TableHead)(({ theme }) => ({
  height: "45px",
}));

const Leaves = () => {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        maxHeight: "65vh",
      }}
    >
      <Table
        stickyHeader
        sx={{ minWidth: 650 }}
        size="small"
        aria-label="simple table"
      >
        <StyledTableHeader>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Days</StyledTableCell>
            <StyledTableCell>Leave</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </StyledTableHeader>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell>{row.date}</StyledTableCell>
              <StyledTableCell>{row.days}</StyledTableCell>
              <StyledTableCell>{row.leave}</StyledTableCell>
              <StyledTableCell>{row.status}</StyledTableCell>
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
};

export default Leaves;
