import { Box, Button, Paper, TextField, Typography, Divider } from "@mui/material";
import MyAppBar from "./MyAppBar";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { SectionType } from "./SectionCreator";
import { useState } from "react";
import { Section } from "./Section";

export default function GradingSchemeCreator() {
  const location = useLocation();
  const currId = location.state?.courseId || "";

  const navigate = useNavigate();
  const exampleScheme: SectionType[] = [
    { name: "", weight: "", id: uuidv4() },
    { name: "", weight: "", id: uuidv4() },
    { name: "", weight: "", id: uuidv4() },
  ];

  const [sections, setSections] = useState<SectionType[]>(exampleScheme);
  const [badSubmit, setBadSubmit] = useState<boolean>(false);
  const [courseId, setCourseId] = useState(currId);
  const [status, setStatus] = useState("");

  const errorTypography = (
    <Typography color="error" fontFamily={"initial"}>
      Make sure all sections have a name and weights are valid decimals between 0.0 and 1.0
    </Typography>
  );

  const addSection = () => {
    setSections((prev) => [...prev, { name: "", weight: "", id: uuidv4() }]);
  };

  const deleteSection = (idToDelete: string) => {
    setSections((prev) => prev.filter((section) => section.id !== idToDelete));
  };

  const changeSection = (idToChange: string, newSection: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === idToChange ? { ...section, name: newSection } : section
      )
    );
  };

  const changeWeight = (idToChange: string, newWeight: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === idToChange ? { ...section, weight: newWeight } : section
      )
    );
  };

  function isValidFloat(str: string): boolean {
    return /^-?\d+(\.\d+)?$/.test(str.trim());
  }

  const handleSubmit = async () => {
    const hasInvalid = sections.some(
      (section) => section.name.trim() === "" || !isValidFloat(section.weight)
    );

    if (hasInvalid) {
      setBadSubmit(true);
      setTimeout(() => setBadSubmit(false), 2500);
      return;
    }
    const cleanedId = courseId.trim().replace(/\s+/g, "");
    if(cleanedId === ""){return;}

    try {
      const BASE_URL = process.env.REACT_APP_BACKEND_URL;
      const checkRes = await fetch(`${BASE_URL}http://localhost:8080/api/course/${cleanedId}`);

      if (!checkRes.ok) throw new Error("Failed to fetch course");

      const inDatabase = await checkRes.json();

      if (!inDatabase) {
        setStatus("Course not in database yet. Add it first.");
        setTimeout(() => setStatus(""), 2500);
        return;
      }
      
      const token = sessionStorage.getItem("token")
      
      const response = await fetch(`${BASE_URL}http://localhost:8080/api/add-scheme`, {
        method: "POST",
        headers: { "Content-Type": "application/json",  "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ courseId:cleanedId, sections, name: "Scheme" }),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setStatus("Data successfully posted to database");
      setTimeout(() => setStatus(""), 2500);
    } catch (error) {
      setStatus("Failed to post data to database.");
      setTimeout(() => setStatus(""), 2500);
    }
  };

  return (
    <Box>
      <MyAppBar />
      <Box
        sx={{
          width: "100%",
          minHeight: "95vh",
          backgroundColor: "whitesmoke",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          py: 4,
          px: 2,
        }}
      >
        <Paper
          elevation={8}
          sx={{
            width: "100%",
            maxWidth: 760,
            p: 4,
            borderRadius: 3,
          }}
        >
          <Typography variant="h5" mb={3} fontFamily={"initial"} textAlign="center">
            Create Grading Scheme
          </Typography>

          {/* Course ID input */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 4,
              gap: 1,
            }}
          >
            <Typography fontFamily={"initial"}>Course Id (Course to add to)</Typography>
            <TextField
              size="small"
              autoComplete="off"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value.toUpperCase())}
              sx={{ width: "250px" }}
            />
          </Box>

          {/* Header row */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: 1,
              mb: 1,
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            <Typography sx={{ flex: 2 }}>Section Name</Typography>
            <Typography sx={{ width: 120, textAlign: "center" }}>Section Weight</Typography>
            <Box sx={{ width: 48 }}></Box> {/* for delete button space */}
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Sections */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {sections.map((section) => (
              <Section
                key={section.id}
                id={section.id}
                name={section.name}
                weight={section.weight}
                handleDelete={deleteSection}
                handleSectionChange={changeSection}
                handleWeightChange={changeWeight}
              />
            ))}
          </Box>

          {/* Buttons */}
          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Button
              variant="outlined"
              onClick={addSection}
              sx={{ color: "text.primary", borderColor: "grey.400" }}
            >
              Add New Section
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ backgroundColor: "#9c0507", "&:hover": { backgroundColor: "#7a0405" } }}
            >
              Add Scheme to Database
            </Button>
            <Button
              onClick={() => navigate("/post")}
              variant="outlined"
              sx={{ textTransform: "none", minWidth: 180 }}
            >
              Back to Post Options
            </Button>
          </Box>

          {/* Status messages */}
          <Box mt={2} textAlign="center">
            {badSubmit && errorTypography}
            {status && (
              <Typography fontFamily={"initial"} color={status.includes("Failed") ? "error" : "success.main"}>
                {status}
              </Typography>
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}