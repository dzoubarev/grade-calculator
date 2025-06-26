import { Box, Button, Paper, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import CalculatorSection from "./CalculatorSection";
import MyAppBar from "./MyAppBar";
import { SectionType } from "./SectionCreator";

export type GradeType = {
  sectionId: string;
  grade: string;
};

export default function SectionCalculator() {
  const location = useLocation();
  const navigate = useNavigate();

  const sections: SectionType[] = location.state?.sections || [];

  const [badSubmit, setBadSubmit] = useState<boolean>(false);
  const [grades, setGrades] = useState<GradeType[]>(
    sections.map((section) => ({ sectionId: section.id, grade: "" }))
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const errorTypography = (
    <Typography
      fontFamily={"initial"}
      color="error.main"
      sx={{ mt: 1, fontWeight: 500 }}
    >
      Make sure all grades are valid numbers between 0.0 and 100.0
    </Typography>
  );

  const changeGrade = (idToChange: string, newGrade: string) => {
    const updated = grades.map((singleGrade) =>
      singleGrade.sectionId === idToChange
        ? { ...singleGrade, grade: newGrade }
        : singleGrade
    );
    setGrades(updated);
  };

  const sectionElements = sections.map((section) => (
    <CalculatorSection
      key={section.id}
      section={section}
      changeGrade={changeGrade}
      isSelected={selectedId === section.id}
      setSelected={setSelectedId}
    />
  ));

  function isValidFloat(str: string): boolean {
    return /^-?\d+(\.\d+)?$/.test(str.trim());
  }

  const handleSubmit = () => {
    if (!selectedId) {
      alert("Please select a section first.");
      return;
    }

    const hasInvalid = grades.some((grade) => {
      if (grade.sectionId === selectedId) return false;

      if (!isValidFloat(grade.grade.trim())) return true;

      const float = parseFloat(grade.grade.trim());
      return float < 0 || float > 100;
    });

    if (hasInvalid) {
      setBadSubmit(true);
      setTimeout(() => setBadSubmit(false), 2500);
      return;
    }

    navigate("/results", { state: { sections, grades, selectedId } });
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <MyAppBar />
      <Box
        sx={{
          width: "100%",
          maxWidth: 900,
          mx: "auto",
          mt: 4,
          mb: 6,
          px: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          fontFamily={"initial"}
          textAlign="center"
          gutterBottom
          color="text.primary"
        >
          Calculate Your Minimum Needed Grade
        </Typography>

        <Typography
          variant="body1"
          fontFamily={"initial"}
          color="text.secondary"
          textAlign="center"
          maxWidth={600}
        >
          Select the section you want to calculate for by clicking the circle
          next to it, then enter your grades in the other sections.
        </Typography>

        <Paper
          elevation={6}
          sx={{
            width: "100%",
            p: 4,
            bgcolor: "background.paper",
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: 1,
              mb: 2,
              fontWeight: 600,
              fontSize: 18,
              color: "text.secondary",
              fontFamily: "initial",
            }}
          >
            <Box sx={{ flexBasis: "60%" }}>Section Name and Weight</Box>
            <Box sx={{ flexBasis: "30%", textAlign: "center" }}>Grade for Section</Box>
          </Box>

          {sectionElements}

          <Box
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "center",
              gap: 3,
            }}
          >
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                bgcolor: "#9c0507",
                px: 5,
                py: 1.3,
                fontWeight: 600,
                textTransform: "none",
                "&:hover": { bgcolor: "#7a0404" },
              }}
            >
              Calculate
            </Button>
          </Box>

          {badSubmit && errorTypography}
        </Paper>
      </Box>
    </Box>
  );
}

