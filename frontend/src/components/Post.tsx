import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import MyAppBar from "./MyAppBar";

export default function Post() {
  const navigate = useNavigate();

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <MyAppBar />
      <Box
        sx={{
          height: 'calc(95vh)',
          backgroundColor: 'whitesmoke',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
        }}
      >
        <Paper
          elevation={12}
          sx={{
            width: '100%',
            maxWidth: 500,
            bgcolor: 'white',
            borderRadius: 4,
            p: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" fontWeight={600} fontFamily="initial" mb={3}>
            Database Management
          </Typography>
          <Typography variant="body1" fontFamily="initial" mb={5}>
            Make changes to the database using the options below.
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#9c0507', '&:hover': { backgroundColor: '#7a0405' } }}
              onClick={() => navigate("/post/course")}
            >
              <Typography fontFamily="initial" color="whitesmoke">
                Add New Course
              </Typography>
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#9c0507', '&:hover': { backgroundColor: '#7a0405' } }}
              onClick={() => navigate("/post/scheme")}
            >
              <Typography fontFamily="initial" color="whitesmoke">
                Add Grading Scheme to Course
              </Typography>
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}