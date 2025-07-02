import { Box, Paper, Typography } from "@mui/material";
import MyAppBar from "./MyAppBar";
import { SectionType } from "./SectionCreator";
import { useLocation } from "react-router-dom";
import { GradeType } from "./SectionCalculator";

export default function FinalResults() {
  const location = useLocation();
  const { sections, grades, selectedId } = location.state || {};
  const selectedSection =
    selectedId && sections
      ? sections.find((s: SectionType) => s.id === selectedId)?.name
      : null;

  const gradeLetters = ["A", "A-", "B+", "B", "B-", "C+", "C", "D"];
  const gradeNumbers = [85, 80, 75, 70, 65, 60, 55, 50];

  const results = calculateResults();

  const determineResultTypography = (result: number, index: number) => {
    if (result > 100) {
      return `Over 100% on ${selectedSection} needed to get a ${gradeLetters[index]} (${gradeNumbers[index]})`;
    }

    if (result <= 0) {
      return `Good job! ${gradeLetters[index]} (${gradeNumbers[index]}) is guaranteed!`;
    }

    return `You need a ${result}% on ${selectedSection} to get a ${gradeLetters[index]} (${gradeNumbers[index]})`;
  };

  const resultTypography = results.map((result, index) => (
    <Typography
      key={index}
      fontFamily="initial"
      fontSize={{ xs: "0.875rem", sm: "1rem" }}
      textAlign="center"
    >
      {determineResultTypography(result, index)}
    </Typography>
  ));

  function findMinGrade(desired: number): number {
    let knownTotal = 0;
    let unknownWeight = 0;

    for (let section of sections) {
      let weight = parseFloat(section.weight.trim());
      if (weight > 1) weight /= 100;

      if (section.id === selectedId) {
        unknownWeight = weight;
      } else {
        const grade = parseFloat(
          grades.find((g: GradeType) => g.sectionId === section.id)?.grade.trim() || "0"
        );
        knownTotal += weight * grade;
      }
    }

    const needed = (desired - knownTotal) / unknownWeight;
    return Math.round(needed * 100) / 100;
  }

  function calculateResults(): number[] {
    if (!grades || !sections || !selectedId) return [];
    return gradeNumbers.map((desired) => findMinGrade(desired));
  }

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
          pt: { xs: 2, sm: 4 },
          pb: { xs: 2, sm: 6 },
          px: { xs: 1, sm: 4 },
          gap: { xs: 2, sm: 4 },
          overflow: "auto",
          boxSizing: "border-box",
        }}
      >
        <Typography
          variant="h5"
          fontFamily="initial"
          fontWeight={700}
          textAlign="center"
          sx={{
            fontSize: { xs: "1.3rem", sm: "2rem" },
            color: "darkred",
          }}
        >
          Your Grade Requirements
        </Typography>

        <Paper
          elevation={4}
          sx={{
            width: { xs: "calc(100% - 8px)", sm: "70%", md: "60%" },
            maxWidth: 600,
            bgcolor: "#fffdfd",
            borderRadius: 3,
            p: { xs: 2, sm: 4 },
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            gap: { xs: 1.5, sm: 2 },
            alignItems: "center",
            boxSizing: "border-box",
          }}
        >
          {resultTypography}
        </Paper>
      </Box>
    </Box>
  );
}