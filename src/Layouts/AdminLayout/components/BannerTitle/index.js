import { Fab, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function BannerTilte({ titlePage, btnCreate, onClick }) {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#87CEFA",
        color: "#fffff",

        height: { xs: "120px", md: "160px" },
        marginTop: "-20px",
        paddingTop: "20px",
        marginLeft: "-20px",
        paddingLeft: "20px",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: "#ffffff",
          display: { xs: "none", sm: "none", md: "block" },
        }}
      >
        {titlePage}
      </Typography>
      {btnCreate && (
        <Fab
          color="primary"
          sx={{
            top: { sm: "20px", md: "40px" },
            right: { sm: "10px", md: "20px" },
            marginLeft: { xs: "60%", sm: "80%", md: "0" },
          }}
          onClick={onClick}
        >
          <AddIcon />
        </Fab>
      )}
    </Grid>
  );
}

export default BannerTilte;
