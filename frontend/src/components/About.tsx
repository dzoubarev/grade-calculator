import { Box, Paper, Typography, Divider, IconButton } from "@mui/material";
import MyAppBar from "./MyAppBar";
import { GitHub } from "@mui/icons-material";

export default function About() {
  return (
    <Box
      sx={{
        minHeight: "95vh",         
        backgroundColor: "#fff5f5",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <MyAppBar />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",   
          px: 2,
          py: 3,
        }}
      >
        <Paper
          elevation={12}
          sx={{
            width: { xs: "95%", md: "70%", lg: "60%" },
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            backgroundColor: "white",
            boxShadow: "0 8px 20px rgba(156, 5, 7, 0.3)",
            maxHeight: "80vh",     
            overflowY: "auto",    
          }}
        >
          <Typography
            variant="h4"
            fontWeight="700"
            fontFamily={"'Roboto Slab', serif"}
            textAlign="center"
            mb={2}
            color="#9c0507"
          >
            About This Site
          </Typography>

          <Divider sx={{ mb: 3, borderColor: "#9c0507" }} />

          <Typography
            variant="body1"
            fontSize={18}
            lineHeight={1.7}
            mb={3}
            sx={{ color: "#6b0000" }}
          >
            Welcome to your personal <strong>Exam Grade Calculator</strong> — a
            tool designed to help McGill students understand their grading
            schemes and find out what they need on exams to get the grade they
            want.
          </Typography>

          <Typography
            variant="body1"
            fontSize={16}
            mb={3}
            sx={{ color: "#8b0000" }}
          >
            <strong>Key Features Include:</strong>
          </Typography>

          <Box component="ul" sx={{ pl: 4, mb: 3, color: "#a30000" }}>
            <li>Custom grading scheme creation with flexible weights</li>
            <li>Load grading schemes by course code</li>
            <li>Real-time grade calculation</li>
            <li>Easy-to-use responsive interface</li>
            <li>Helpful input validation and error messages</li>
          </Box>

          <Typography
            variant="body2"
            fontStyle="italic"
            color="#7a0000"
            textAlign="center"
          >
            Contact gradecalc.dev@gmail.com or go to feedback page for questions and concerns
          </Typography>
          <IconButton href="http://github.com/dzoubarev/grade-calculator">
            <GitHub></GitHub>
          </IconButton>
        </Paper>
      </Box>
    </Box>
  );
}