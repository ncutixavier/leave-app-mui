import * as React from "react";
import Paper from "@mui/material/Paper";
import { Box, Grid, Button } from "@mui/material";
import Leaves from "../../components/Leaves/Leaves";
import Balance from "../../components/Leaves/Balance";
import AddIcon from "@mui/icons-material/Add";
import RequestLeave from "../../components/Leaves/RequestLeave";

export default function Home() {
  const [openRequestLeave, setOpenRequestLeave] = React.useState(false);

  const handleCloseRequestLeave = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    setOpenRequestLeave(false);
  };

  return (
    <Box>
      <Balance />
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12} sm={12} md={12}>
          <Paper elevation={0} variant="outlined" sx={{ padding: 2, mb: 2 }}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => setOpenRequestLeave(true)}
            >
              Request Leave
            </Button>
            <RequestLeave
              open={openRequestLeave}
              close={handleCloseRequestLeave}
            />
          </Paper>
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
