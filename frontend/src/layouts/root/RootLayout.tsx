import { Box, Grid, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";

const CommonLayout = () => {
  return (
    <Stack
      sx={{
        height: "100vh",
      }}
    >
      <Topbar />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ p: 2 }}>
            <Outlet />
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default CommonLayout;
