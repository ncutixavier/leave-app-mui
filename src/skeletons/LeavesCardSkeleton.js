import * as React from "react";
import { Grid, Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { Item } from "../components/Leaves/Balance";

export default function LeavesCardSkeleton() {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 12 }}
      columns={{ xs: 12, sm: 8, md: 12 }}
      justifyContent="space-between"
    >
      {Array.from({ length: 2 }).map((_, index) => (
        <Grid item xs={12} sm={4} md={4} key={index}>
          <Item>
            <Box sx={{ width: 100 }}>
              <Skeleton animation="wave" />
            </Box>
            <Skeleton animation="wave" />
          </Item>
        </Grid>
      ))}
    </Grid>
  );
}
