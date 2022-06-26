import * as React from "react";
import Paper from "@mui/material/Paper";
import { Box, Grid } from "@mui/material";
import Leaves from "../../components/Leaves/Leaves";
import Balance from "../../components/Leaves/Balance";

export default function Home() {

  return (
    <Box>
      <Balance/>
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
