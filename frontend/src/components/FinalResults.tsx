import { Box, Button, Paper, Switch, Typography } from "@mui/material";
import MyAppBar from "./MyAppBar";
import { SectionType } from "./SectionCreator";
import { useLocation } from "react-router-dom";
import { GradeType } from "./SectionCalculator";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FinalResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { sections, grades, selectedId } = location.state || {};
  const selectedSection =
    selectedId && sections
      ? sections.find((s: SectionType) => s.id === selectedId)?.name
      : null;

  const[rounding,setRounding] = useState(false);

  const gradeLetters = ["A", "A-", "B+", "B", "B-", "C+", "C", "D"];
  const gradeNumbers = rounding ? [84.5, 79.5, 74.5, 69.5, 64.5, 59.5, 54.5, 49.5] 
                                  : 
                                  [85, 80, 75, 70, 65, 60, 55, 50] ;

  const results = calculateResults();

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRounding(event.target.checked);
  }

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
      if (weight >= 1) weight /= 100;

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

        <Box
         sx={{
          display:'flex',
          flexDirection:'row',
          justifyContent:'center',
          alignItems:'center'
         }}
         >
          <Typography
          fontFamily="initial"
          textAlign="center"
          >
            {"Rounding (Ex. 84.5 \u2192 85 )"}
          </Typography>
          <Switch onChange={(e) => handleSwitchChange(e)}
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "#8B0000", 
                "&:hover": {
                  backgroundColor: "rgba(139,0,0,0.1)",
                },
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "#8B0000",
              },
            }}
          />
        </Box>

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
        <Button
            variant="contained"
            sx={{ backgroundColor: "#9c0507", py: 1.5, textTransform:'none' }}
            size="small"
            onClick={() => navigate("/")}
          >
            <Typography fontFamily={"initial"} color="whitesmoke">
              Calculate For Another Course
            </Typography>
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}