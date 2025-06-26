import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import MyAppBar from "./MyAppBar";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { Section } from "./Section";
import { GradingSchemeType } from "./Home";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

export type SectionType = {
  name: string;
  weight: string;
  id: string;
};

function SectionCreator() {
  const location = useLocation();
  const schemes: GradingSchemeType[] = location.state?.schemes || [];
  const navigate = useNavigate();
  const exampleScheme: SectionType[] = [
    { name: "Homework", weight: "0.1", id: uuidv4() },
    { name: "Midterm", weight: "0.3", id: uuidv4() },
    { name: "Final", weight: "0.6", id: uuidv4() },
  ];

  const [index, setIndex] = useState<number>(0);
  const [sections, setSections] = useState<SectionType[]>(
    schemes.length === 0 ? exampleScheme : schemes[index].sections
  );
  const [badSubmit, setBadSubmit] = useState<boolean>(false);

  const addSection = () => {
    const newSections = [...sections, { name: "", weight: "0.0", id: uuidv4() }];
    setSections(newSections);
  };

  const deleteSection = (idToDelete: string) => {
    const newSections = sections.filter((section) => section.id !== idToDelete);
    setSections(newSections);
  };

  const changeSection = (idToChange: string, newSection: string) => {
    const updated = sections.map((section) =>
      section.id === idToChange ? { ...section, name: newSection } : section
    );
    setSections(updated);
  };

  const changeWeight = (idToChange: string, newWeight: string) => {
    const updated = sections.map((section) =>
      section.id === idToChange ? { ...section, weight: newWeight } : section
    );
    setSections(updated);
  };

  const changeScheme = (increasing: boolean) => {
    const newIndex = increasing
      ? (index + 1) % schemes.length
      : index === 0
      ? schemes.length - 1
      : index - 1;

    setIndex(newIndex);
    setSections(schemes[newIndex].sections);
  };

  const isValidFloat = (str: string): boolean => {
    return /^-?\d+(\.\d+)?$/.test(str.trim());
  };

  const handleSubmit = () => {
    const hasInvalid = sections.some(
      (section) =>
        section.name.trim() === "" || !isValidFloat(section.weight.toString())
    );

    if (hasInvalid) {
      setBadSubmit(true);
      setTimeout(() => setBadSubmit(false), 2000);
      return;
    }

    navigate("/calculator", { state: { sections } });
  };

  const sectionElements = sections.map((section) => (
    <Section
      key={section.id}
      id={section.id}
      name={section.name}
      weight={section.weight}
      handleDelete={deleteSection}
      handleSectionChange={changeSection}
      handleWeightChange={changeWeight}
    />
  ));

  return (
    <Box>
      <MyAppBar />
      <Box
        sx={{
          width: "100%",
          minHeight: "95vh",
          backgroundColor: "#f9f9f9",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          pt: 4,
          pb: 6,
        }}
      >
        <Typography
          variant="h5"
          padding={2}
          fontFamily={"initial"}
          color="text.primary"
          fontWeight={600}
        >
          Create Your Own Sections
        </Typography>
        <Paper
          elevation={3}
          sx={{
            width: "75%",
            bgcolor: "#f7f7f7",
            borderRadius: 2,
            p: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 6,
              mb: 1,
              px: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "65%",
              }}
            >
              <Typography
                fontFamily={"initial"}
                fontSize={18}
                color="text.secondary"
                fontWeight={500}
                mb={0.5}
                textAlign="left"
              >
                Section Name
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "25%",
              }}
            >
              <Typography
                fontFamily={"initial"}
                fontSize={18}
                color="text.secondary"
                fontWeight={500}
                mb={0.5}
                textAlign="left"
              >
                Section Weight
              </Typography>
            </Box>
          </Box>

          {sectionElements}

          {schemes.length > 0 && (
            <Box
                sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                mt: 1,
                }}
            >
                <IconButton onClick={() => changeScheme(false)} size="small" sx={{ color: "#9c0507" }}>
                <ArrowBackIos fontSize="small" />
                </IconButton>

                <Typography fontSize={16} fontWeight={500}>
                Scheme {index + 1} / {schemes.length}
                </Typography>

                <IconButton onClick={() => changeScheme(true)} size="small" sx={{ color: "#9c0507" }}>
                <ArrowForwardIos fontSize="small" />
                </IconButton>
            </Box>
           )}

          <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                gap: 3,
                mt: 3,
            }}
            >
            <Button
                onClick={() => addSection()}
                variant="outlined"
                sx={{
                textTransform: "none",
                px: 4,
                py: 1.2,
                fontWeight: 600,
                borderColor: "#ccc",
                color: "#444",
                "&:hover": { borderColor: "#aaa", bgcolor: "#eee" },
                }}
            >
                Add New Section
            </Button>

            <Button
                onClick={() => handleSubmit()}
                variant="contained"
                sx={{
                textTransform: "none",
                px: 4,
                py: 1.2,
                fontWeight: 600,
                bgcolor: "#b63636",
                color: "whitesmoke",
                "&:hover": { bgcolor: "#8a2929" },
                }}
            >
                Confirm Sections
            </Button>
        </Box>

          {badSubmit && (
            <Typography color="error" mt={1} fontFamily={"initial"}>
              Make sure all sections have a name and weights are valid numbers between 0.0 and 100
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
}

export default SectionCreator;
