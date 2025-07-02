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
      sx={{
        mt: { xs: 1, sm: 2 },
        fontWeight: 500,
        textAlign: "center",
        fontSize: { xs: "0.7rem", sm: "0.875rem" },
      }}
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
    <Box sx={{ overflow: "hidden", width: "100vw" }}>
      <MyAppBar />
      <Box
        sx={{
          width: "100%",
          minHeight: "calc(100vh - 64px)",
          bgcolor: "#f5f5f5",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 2, sm: 4 },
          pt: { xs: 2, sm: 4 },
          pb: { xs: 2, sm: 6 },
          px: { xs: 1, sm: 4 },
          overflow: "auto",
          boxSizing: "border-box",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          fontFamily={"initial"}
          textAlign="center"
          color="text.primary"
          sx={{
            fontSize: { xs: "1.4rem", sm: "2.125rem" },
            flexShrink: 0,
          }}
        >
          Calculate Your Minimum Needed Grade
        </Typography>

        <Typography
          variant="body1"
          fontFamily={"initial"}
          color="text.secondary"
          textAlign="center"
          sx={{
            fontSize: { xs: "0.85rem", sm: "1rem" },
            maxWidth: { xs: "90%", sm: 600 },
            flexShrink: 0,
          }}
        >
          Select the section you want to calculate for by clicking the circle
          next to it, then enter your grades in the other sections.
        </Typography>

        <Paper
          elevation={6}
          sx={{
            width: { xs: "calc(100% - 8px)", sm: "70%", md: "60%" },
            maxWidth: { sm: "900px" },
            bgcolor: "background.paper",
            borderRadius: 2,
            p: { xs: 1, sm: 4 },
            flexShrink: 0,
            boxSizing: "border-box",
          }}
        >
          {/* Headers (shown on all screen sizes now) */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: 1,
              mb: { xs: 1.5, sm: 2 },
              fontWeight: 600,
              fontSize: { xs: 13, sm: 18 },
              color: "text.secondary",
              fontFamily: "initial"
            }}
          >
            <Box sx={{ flexBasis: "60%" }}>Section Name and Weight</Box>
            <Box
              sx={{
                flexBasis: "30%",
                textAlign: { xs: "right", sm: "center" },
                transform: "translateX(-36px)"
              }}
            >
              Grade for Section
            </Box>
          </Box>

          {sectionElements}

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "center",
              gap: { xs: 1, sm: 2 },
              mt: { xs: 2, sm: 4 },
            }}
          >
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                bgcolor: "#9c0507",
                px: { xs: 2, sm: 5 },
                py: { xs: 0.5, sm: 1.3 },
                fontWeight: 600,
                textTransform: "none",
                fontSize: { xs: "0.75rem", sm: "1rem" },
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