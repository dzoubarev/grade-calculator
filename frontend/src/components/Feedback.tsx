import { Box, Button, TextField, Typography, useMediaQuery } from "@mui/material";
import MyAppBar from "./MyAppBar";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";

export default function Feedback() {
  const [category, setCategory] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = async () => {
    if (feedback.trim() === "") return;

    if (category === "") {
      setStatus("Please select a category for the feedback.");
      setTimeout(() => setStatus(""), 2000);
      return;
    }

    setStatus("Sending feedback...");
    const result = await fetch("http://localhost:8080/api/sendFeedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: category, feedback: feedback }),
    });

    if (!result.ok) {
      setStatus("Failed to send feedback.");
    } else {
      setStatus("Sent feedback successfully!");
      setFeedback("");
    }

    setTimeout(() => setStatus(""), 2000);
  };

  return (
    <Box>
      <MyAppBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          p: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <Typography variant="h4" sx={{ fontFamily: "Rubik", textAlign: "center" }}>
          <strong>Feedback</strong>
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "center",
            width: isMobile ? "90%" : "60%"
          }}
        >
          <Typography sx={{ fontFamily: "Mulish" }}>
            - Request new features or improvements
          </Typography>
          <Typography sx={{ fontFamily: "Mulish" }}>
            - Provide new courses or help update grading schemes
          </Typography>
          <Typography sx={{ fontFamily: "Mulish" }}>
            - Submit general feedback
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            alignItems: "center",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <Typography fontWeight={500}>Category:</Typography>

          {["Feature", "Course", "Other"].map((cat) => (
            <Button
              key={cat}
              onClick={() => setCategory(cat)}
              variant={category === cat ? "contained" : "outlined"}
              sx={{
                backgroundColor: category === cat ? "#9c0507" : "transparent",
                color: category === cat ? "white" : "#9c0507",
                borderColor: "#9c0507",
                "&:hover": {
                  backgroundColor: category === cat ? "#7a0405" : "#f5f5f5",
                },
              }}
            >
              {cat}
            </Button>
          ))}
        </Box>

        <TextField
          onChange={(e) => setFeedback(e.target.value)}
          multiline
          minRows={9}
          sx={{ width: isMobile ? "90%" : "60%" }}
          value={feedback}
          placeholder="Write your feedback here..."
        />

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#9c0507",
            "&:hover": { backgroundColor: "#7a0405" },
            px: 4,
            py: 1.2,
            textTransform: "none",
            fontWeight: 600,
          }}
          onClick={handleSubmit}
        >
          Send Feedback!
        </Button>

        <Typography sx={{ height: 24, fontWeight: 500 }}>{status}</Typography>
      </Box>
    </Box>
  );
}