import React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import { Paper, Grid, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { useDispatch, useSelector } from "react-redux";
import { selectGetReport, getReport } from "../../features/leave/getReports";
import LeavesCardSkeleton from "../../skeletons/LeavesCardSkeleton";

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "#1A2027" : theme.palette.secondary.main,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const Balance = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { loading, report } = useSelector(selectGetReport);

  React.useEffect(() => {
    dispatch(getReport());
  }, [dispatch]);

  if (loading) return <LeavesCardSkeleton />;

  const statsData = [
    {
      title: "Used Days",
      value: report?.data?.report?.usedDays,
      color: "primary",
    },
    {
      title: "Remaining Days",
      value: report?.data?.report?.remainingDays,
      color: "primary",
    },
  ];

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 12 }}
      columns={{ xs: 12, sm: 8, md: 12 }}
      justifyContent="space-between"
    >
      {statsData.map((data, index) => (
        <Grid item xs={12} sm={4} md={4} key={index}>
          <Item elevation={0} variant="outlined">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5">{data.value}</Typography>
              <RotateLeftIcon fontSize="medium" color="primary" />
            </Box>
            <Typography variant="p" sx={{ color: theme.palette.primary.main }}>
              {data.title}
            </Typography>
          </Item>
        </Grid>
      ))}
    </Grid>
  );
};

export default Balance;
