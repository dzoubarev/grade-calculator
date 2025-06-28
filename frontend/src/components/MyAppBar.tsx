import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { Home, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function MyAppBar() {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ backgroundColor: "#9c0507" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 3,
        }}
      >
        {/* Left side: Home icon + Title (if desired) */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="home"
            onClick={() => navigate("/")}
          >
            <Home />
          </IconButton>
          <Typography variant="h6" color="whitesmoke" sx={{ fontWeight: 600 }}>
            GradeCalc
          </Typography>
        </Box>

        {/* Right side: Navigation buttons */}
        <Box sx={{ display: "flex", gap: 3 }}>
          <Button
            onClick={() => navigate("/about")}
            sx={{ textTransform: "none", color: "whitesmoke" }}
          >
            <Typography variant="h6">About</Typography>
          </Button>
          <Button
            onClick={() => navigate("/feedback")}
            sx={{ textTransform: "none", color: "whitesmoke" }}
          >
            <Typography variant="h6">Feedback</Typography>
          </Button>
          <IconButton
            onClick={() => navigate("/login")}
            sx={{ textTransform: "none", color: "whitesmoke" }}
          >
            <Person/>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default MyAppBar;