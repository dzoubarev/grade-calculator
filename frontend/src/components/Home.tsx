import { Box, Button, IconButton, Paper, TextField, Typography } from "@mui/material";
import MyAppBar from "./MyAppBar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SectionType } from "./SectionCreator";
import { GitHub } from "@mui/icons-material";
import { Analytics } from "@vercel/analytics/react"

export type GradingSchemeType = {
  name: string;
  sections: SectionType[];
  id:string;
};

function Home() {
  const navigate = useNavigate();
  const [courseCode, setCourseCode] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleChange = (newCode: string) => {
    setCourseCode(newCode);
  };

  const handleSubmit = async () => {
    if (courseCode.trim() === "") return;

    setLoading(true);

    const cleanedId = courseCode.trim().replace(/\s+/g, "");
    try {
      const BASE_URL = process.env.REACT_APP_BACKEND_URL;
      const res = await fetch(`${BASE_URL}/api/scheme/${cleanedId}`);
      if (!res.ok) throw new Error("Failed to fetch data");
      const data: GradingSchemeType[] = await res.json();
      setLoading(false);

      if (data.length === 0) {
        setError("Course code is not yet in the database or is incorrect");
        setTimeout(() => setError(""), 2000);
        return;
      }

      navigate("/sections", { state: { schemes: data } });
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "whitesmoke",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Analytics></Analytics>
      <Box sx={{ flexShrink: 0 }}>
        <MyAppBar />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-evenly",
          alignItems: "center",
          gap: 5,
          p: 3,
          overflow: "hidden", 
        }}
      >
        {/* Option 1 - Create Own Course */}
        <Paper
          elevation={8}
          sx={{
            flex: "1 1 40%",
            maxHeight: "calc(100vh - 64px - 48px)",
            backgroundColor: "#f9f9f9",
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
            textAlign: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            overflowY: "auto",
            minWidth: 300,
          }}
        >
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Create Your Own Course
          </Typography>
          <Typography sx={{ mb: 3 }}>
            Create your own sections and weights to represent your course&apos;s grading scheme.
          </Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{ backgroundColor: "#9c0507", py: 1.5 }}
            onClick={() => navigate("/sections")}
          >
            <Typography fontFamily={"initial"} color="whitesmoke">
              Start Creating
            </Typography>
          </Button>
        </Paper>

        {/* Option 2 - Enter Course Code */}
        <Paper
          elevation={8}
          sx={{
            flex: "1 1 40%",
            maxHeight: "calc(100vh - 64px - 48px)",
            backgroundColor: "#f9f9f9",
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
            textAlign: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            overflowY: "auto",
            minWidth: 300,
          }}
        >
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Use Existing Course
          </Typography>
          <Typography sx={{ mb: 1 }}>
            Enter a course code to load the grading scheme.
          </Typography>
          <Typography sx={{ mb: 3, fontStyle: "italic" }}>Ex: PHYS 142</Typography>

          <TextField
            size="small"
            onChange={(e) => handleChange(e.target.value.toUpperCase())}
            value={courseCode}
            autoComplete="off"
            fullWidth
            sx={{ mb: 3, maxWidth: 300, mx: "auto" }}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ backgroundColor: "#9c0507", py: 1.5 }}
            onClick={handleSubmit}
            disabled={loading}
          >
            <Typography fontFamily={"initial"} color="whitesmoke">
              Load Course
            </Typography>
          </Button>

          {loading && (
            <Typography sx={{ mt: 2, color: "text.secondary" }}>Loading...</Typography>
          )}

          {error && (
            <Typography sx={{ mt: 2, color: "error.main", fontWeight: "bold" }}>
              {error}
            </Typography>
          )}
        </Paper>
      </Box>
      <IconButton href="http://github.com/dzoubarev/grade-calculator" sx={{pb:5}}>
          <GitHub></GitHub>
      </IconButton>
    </Box>
  );
}

export default Home;
