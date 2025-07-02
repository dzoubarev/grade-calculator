import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Home, Person, Menu as MenuIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function MyAppBar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const handleNavigate = (path: string) => {
    navigate(path);
    handleClose();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#9c0507" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: 3 }}>
        {/* Left: Home + Title */}
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
          <Typography
            variant="h6"
            color="whitesmoke"
            sx={{ fontWeight: 600 }}
          >
            GradeCalc
          </Typography>
        </Box>

        {/* Right: Navigation */}
        {!isMobile ? (
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
              sx={{ color: "whitesmoke" }}
            >
              <Person />
            </IconButton>
          </Box>
        ) : (
          <>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleMenuClick}
              aria-controls={open ? "mobile-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="mobile-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={() => handleNavigate("/about")}>
                About
              </MenuItem>
              <MenuItem onClick={() => handleNavigate("/feedback")}>
                Feedback
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default MyAppBar;