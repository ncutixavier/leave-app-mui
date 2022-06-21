import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import Leaves from "./Leaves";

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
    title: "Used Days",
    value: "3",
    color: "primary",
  },
  {
    title: "Remaining Days",
    value: "15",
    color: "primary",
  },
];

export default function Home() {
  const theme = useTheme();

  return (
    <Box>
      <Grid
        container
        spacing={{ xs: 2, md: 12 }}
        columns={{ xs: 12, sm: 8, md: 12 }}
        justifyContent="space-between"
      >
        {statsData.map((data, index) => (
          <Grid item xs={12} sm={4} md={4} key={index}>
            <Item
              elevation={0}
              variant="outlined"
              sx={{
                backgroundColor: theme.palette.secondary.main,
              }}
            >
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
              <Typography
                variant="p"
                sx={{ color: theme.palette.primary.main }}
              >
                {data.title}
              </Typography>
            </Item>
          </Grid>
        ))}
      </Grid>
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12} sm={12} md={12}>
          <Paper
            elevation={0}
            variant="outlined"
            sx={{ padding: 2, mb: 2 }}
          ></Paper>
          <Box
            sx={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              width: { xs: "90vw", md: "100%" },
            }}
          >
            <Leaves />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
