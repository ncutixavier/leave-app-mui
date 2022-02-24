import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Box, Grid, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Charts from "../components/Charts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const statsData = [
  {
    title: "Total Users",
    value: "1,000",
    color: "primary",
  },
  {
    title: "Total Departments",
    value: "500",
    color: "secondary",
  },
  {
    title: "Total Leave Requests",
    value: "1,000",
    color: "primary",
  },
];

export default function Admin() {
  const theme = useTheme();
 
  return (
    <Container sx={{ flexGrow: 1, mt: 3 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 10 }}
        columns={{ xs: 12, sm: 8, md: 12 }}
      >
        {statsData.map((data, index) => (
          <Grid item xs={12} sm={4} md={4} key={index}>
            <Item elevation={0} variant="outlined">
              <Typography
                variant="h6"
                sx={{ color: theme.palette.primary.main }}
              >
                {data.title}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h4">{data.value}</Typography>
                <ArrowCircleUpIcon sx={{ fontSize: "2.3rem" }} />
              </Box>
            </Item>
          </Grid>
        ))}
      </Grid>
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12} sm={12} md={12}>
          <Paper elevation={0} variant="outlined" sx={{ padding: 1 }}>
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Total Leaves per month
            </Typography>
            <Charts />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
