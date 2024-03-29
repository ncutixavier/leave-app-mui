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
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectGetLeaves, getLeaves } from "../../features/leave/getLeaves";
import LeavesTableSkeleton from "../../skeletons/LeavesTableSkeleton";
import { convertDateRange } from "../../utils/date";
import VerifiedIcon from "@mui/icons-material/Verified";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { toast } from "react-toastify";
import { deleteLeave } from "../../features/leave/deleteLeave";
import ConfirmDialog from "../../components/ConfirmDialog";
import RequestLeave from "./RequestLeave";

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
  const dispatch = useDispatch();
  const { leaves, loading } = useSelector(selectGetLeaves);
  const [open, setOpen] = React.useState(false);
  const [selectedLeave, setSelectedLeave] = React.useState(null);
  const [openEditLeave, setOpenEditLeave] = React.useState(false);
  const [currentLeave, setCurrentLeave] = React.useState(null);

  React.useEffect(() => {
    dispatch(getLeaves());
  }, [dispatch]);

  const handleOpen = (leave) => { 
    setSelectedLeave(leave);
    setOpen(true);
  }

  const handleOpenEditeave = (leave) => { 
    setCurrentLeave(leave);
    setOpenEditLeave(true);
  }

  const handleDeleteLeave = async () => {
    setOpen(false);
    toast.promise(dispatch(deleteLeave(selectedLeave._id)).unwrap(), {
      pending: "Deleting leave...",
      success: {
        render({ data }) {
          dispatch(getLeaves());
          return `Deleted successfully`;
        },
      },
      error: {
        render({ data }) {
          console.log("error", data);
          return `${data.data.message}`;
        },
      },
    });
  };

  if (loading) return <LeavesTableSkeleton />;

  return (
    <div>
      <ConfirmDialog
        open={open}
        close={() => setOpen(false)}
        confirm={() => handleDeleteLeave()}
        title="Confirm Delete"
        message="Are you sure you want to delete this leave?"
      />
      <RequestLeave
        open={openEditLeave}
        close={() => setOpenEditLeave(false)}
        leave={currentLeave}
      />
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
            {leaves?.data?.requests?.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell>
                  {convertDateRange(row?.startDate, row?.returnDate)}
                </StyledTableCell>
                <StyledTableCell>{row?.numberOfDays}</StyledTableCell>
                <StyledTableCell>{row?.type}</StyledTableCell>
                <StyledTableCell>
                  {row?.status?.charAt(0).toUpperCase() + row?.status?.slice(1)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row?.status === "pending" ? (
                    <>
                      <IconButton color="info" onClick={() => handleOpenEditeave(row)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleOpen(row)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  ) : row?.status === "approved" ? (
                    <IconButton color="success">
                      <VerifiedIcon />
                    </IconButton>
                  ) : (
                    <IconButton color="warning">
                      <DoNotDisturbIcon />
                    </IconButton>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Leaves;
