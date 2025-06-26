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

  const determineResultTypography = (result:number, index:number) => {
    if(result > 100){
        return `Over 100% on ${selectedSection} needed to get a ${gradeLetters[index]} (${gradeNumbers[index]})`;
    }  

    if(result <= 0){
        return `Good job! ${gradeLetters[index]} (${gradeNumbers[index]}) is guaranteed!`;
    }  

    return `You need a ${result}% on ${selectedSection} to get a ${gradeLetters[index]} (${gradeNumbers[index]})`
  }

    
  const resultTypography = results.map((result, index) => {
    return (
      <Typography key={index} fontFamily="initial" fontSize={16}>
        {determineResultTypography(result,index)}
      </Typography>
    );
  });

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
    <Box sx={{ backgroundColor: "whitesmoke", minHeight: "100vh" }}>
      <MyAppBar />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 3,
          gap: 3,
        }}
      >
        <Typography
          variant="h5"
          fontFamily="initial"
          sx={{ color: "darkred", fontWeight: "bold" }}
        >
          Your Grade Requirements
        </Typography>

        <Paper
          elevation={4}
          sx={{
            width: "70%",
            padding: 4,
            backgroundColor: "#fffdfd",
            borderRadius: 3,
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems:'center'
          }}
        >
          {resultTypography}
        </Paper>
      </Box>
    </Box>
  );
}