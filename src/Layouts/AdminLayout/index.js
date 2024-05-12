import Grid from "@mui/material/Grid";
import { useState } from "react";
import HeaderAdmin from "./components/HeaderAdmin";
import SidebarAdmin from "./components/SidebarAdmin";
import { Box } from "@mui/material";
// import Item from "@mui/material/Item";

function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Box sx={{ display: "flex", width: "100%" }}>
        <HeaderAdmin handleDrawerOpen={handleDrawerOpen} open={open} />
        <SidebarAdmin
          open={open}
          handleDrawerClose={handleDrawerClose}
          handleDrawerOpen={handleDrawerOpen}
        />
        <Grid container sx={{ flexGrow: 1, marginTop: 10, marginLeft: 4 }}>
          {children}
        </Grid>
      </Box>
    </Grid>
  );
}

export default AdminLayout;
