import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import MyAppBar from "./MyAppBar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CourseCreator() {
  const navigate = useNavigate();
  const [data, setData] = useState({ id: "", name: "" });
  const [status, setStatus] = useState("");
  const [submittedId, setSubmittedId] = useState("");

  const handleCourseIdChange = (newCourseId: string) => {
    setData({ ...data, id: newCourseId });
  };

  const handleCourseNameChange = (newCourseName: string) => {
    setData({ ...data, name: newCourseName });
  };

  const postData = async () => {
    if (data.id.trim() === "" || data.name.trim() === "") return;

    try {
      
      const checkRes = await fetch(`http://localhost:8080/api/course/${data.id}`);

      if (!checkRes.ok) {
        throw new Error("Failed to fetch data");
      }

      const inDatabase = await checkRes.json();

      if (inDatabase) {
        setStatus("Course already in database");
        setTimeout(() => setStatus(""), 2000);
        return;
      }
      const token = sessionStorage.getItem("token")

      const response = await fetch("http://localhost:8080/api/course", {
        method: "POST",
        headers: { "Content-Type": "application/json",  "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ id: data.id.trim(), name: data.name.trim() }),
        
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      const result = await response.json();
      console.log("Success:", result);
      setSubmittedId(data.id.trim());
      setData({ id: "", name: "" });
      setStatus("Successfully posted data!");
      setTimeout(() => setStatus(""), 2000);
    } catch (error) {
      setStatus("Failed to post data.");
      setTimeout(() => setStatus(""), 2000);
    }
  };

  return (
    <Box sx={{ minHeight: "95vh", backgroundColor: "whitesmoke" }}>
      <MyAppBar />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pt: 6,
          px: 2,
        }}
      >
        <Paper
          elevation={10}
          sx={{
            width: { xs: "90%", sm: "60%", md: "50%" },
            p: 5,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              Course Code (Ex. MATH133)
            </Typography>
            <TextField
              value={data.id}
              onChange={(e) => handleCourseIdChange(e.target.value.toUpperCase())}
              autoComplete="off"
              size="small"
              fullWidth
              placeholder="Enter course code"
            />
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              Course Name (Ex. Linear Algebra)
            </Typography>
            <TextField
              value={data.name}
              onChange={(e) => handleCourseNameChange(e.target.value)}
              autoComplete="off"
              size="small"
              fullWidth
              placeholder="Enter course name"
            />
          </Box>

          {status && (
            <Typography
              variant="subtitle1"
              color={status.includes("Failed") ? "error" : "success.main"}
              textAlign="center"
              sx={{ minHeight: 24 }}
            >
              {status}
            </Typography>
          )}

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 2,
              mt: 2,
            }}
          >
            <Button
              onClick={postData}
              variant="contained"
              sx={{ backgroundColor: "#9c0507", textTransform: "none", minWidth: 180 }}
            >
              Confirm Course
            </Button>

            <Button
              onClick={() => navigate("/post")}
              variant="outlined"
              sx={{ textTransform: "none", minWidth: 180 }}
            >
              Back to Post Options
            </Button>

            <Button
              onClick={() => navigate("/post/scheme", { state: { courseId: submittedId } })}
              variant="contained"
              disabled={!submittedId}
              sx={{
                backgroundColor: "#9c0507",
                textTransform: "none",
                minWidth: 180,
                opacity: submittedId ? 1 : 0.5,
                cursor: submittedId ? "pointer" : "not-allowed",
              }}
            >
              Create Grading Scheme for This Course
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}