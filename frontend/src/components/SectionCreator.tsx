import {
  Box,
  Button,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import MyAppBar from "./MyAppBar";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Section } from "./Section";
import { GradingSchemeType } from "./Home";

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
    setSections([...sections, { name: "", weight: "", id: uuidv4() }]);
  };

  const deleteSection = (idToDelete: string) => {
    setSections(sections.filter((s) => s.id !== idToDelete));
  };

  const changeSection = (id: string, newName: string) => {
    setSections(sections.map((s) => (s.id === id ? { ...s, name: newName } : s)));
  };

  const changeWeight = (id: string, newWeight: string) => {
    setSections(sections.map((s) => (s.id === id ? { ...s, weight: newWeight } : s)));
  };

  const changeScheme = (increasing: boolean) => {
    if (schemes.length === 0) return;

    const newIndex = increasing
      ? (index + 1) % schemes.length
      : index === 0
      ? schemes.length - 1
      : index - 1;

    setIndex(newIndex);
    setSections(schemes[newIndex].sections);
  };

  const isValidFloat = (str: string): boolean => /^-?\d+(\.\d+)?$/.test(str.trim());

  const handleSubmit = () => {
    const hasInvalid = sections.some(
      (s) => s.name.trim() === "" || !isValidFloat(s.weight.toString())
    );
    if (hasInvalid) {
      setBadSubmit(true);
      setTimeout(() => setBadSubmit(false), 2000);
      return;
    }
    navigate("/calculator", { state: { sections } });
  };

  return (
    <Box sx={{ overflow: "hidden", width: "100vw" }}>
      <MyAppBar />
      <Box
        sx={{
          width: "100%",
          minHeight: "calc(100vh - 64px)",
          bgcolor: "#f9f9f9",
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
          variant="h5"
          fontFamily="initial"
          fontWeight={600}
          textAlign="center"
          sx={{
            fontSize: { xs: "1.2rem", sm: "1.8rem" },
            flexShrink: 0,
          }}
        >
          {schemes.length === 0 ? "Create Your Own Sections" : schemes[0].courseName}
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
          If weight {"<"} 1 it's treated as a decimal, if weight {">"} 1 it's treated as a percentage.
        </Typography>

        <Paper
          elevation={3}
          sx={{
            width: { xs: "calc(100% - 8px)", sm: "70%", md: "60%" },
            maxWidth: { sm: "850px" },
            bgcolor: "#f7f7f7",
            borderRadius: 2,
            p: { xs: 1, sm: 4 },
            flexShrink: 0,
            boxSizing: "border-box",
          }}
        >
          {/* Section Header Labels (shown on all screen sizes now) */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 0,
              mb: { xs: 1.5, sm: 2 },
              px: 0.5,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                fontFamily="initial"
                fontSize={{ xs: 12, sm: 18 }}
                color="text.secondary"
                fontWeight={500}
              >
                Section Name
              </Typography>
            </Box>
            <Box sx={{ width: { xs: "65px", sm: "110px" }}}>
              <Typography
                fontFamily="initial"
                fontSize={{ xs: 12, sm: 18 }}
                color="text.secondary"
                fontWeight={500}
              >
                Weight
              </Typography>
            </Box>
            <Box sx={{ width: { xs: "32px", sm: "44px" } }} />
          </Box>

          {/* Section Inputs */}
          <Box sx={{ mb: { xs: 1, sm: 2 } }}>
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

          {/* Scheme Navigation */}
          {schemes.length > 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: { xs: 1, sm: 2 },
                my: { xs: 1, sm: 2 },
              }}
            >
              <IconButton
                onClick={() => changeScheme(false)}
                size="small"
                sx={{ color: "#9c0507" }}
              >
                <ArrowBackIos fontSize="small" />
              </IconButton>
              <Typography fontSize={{ xs: 12, sm: 16 }} fontWeight={500}>
                Scheme {index + 1} / {schemes.length}
              </Typography>
              <IconButton
                onClick={() => changeScheme(true)}
                size="small"
                sx={{ color: "#9c0507" }}
              >
                <ArrowForwardIos fontSize="small" />
              </IconButton>
            </Box>
          )}

          {/* Buttons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "center",
              gap: { xs: 1, sm: 2 },
              mt: { xs: 2, sm: 3 },
            }}
          >
            <Button
              onClick={addSection}
              variant="outlined"
              sx={{
                textTransform: "none",
                px: { xs: 2, sm: 3 },
                py: { xs: 0.5, sm: 1 },
                fontWeight: 600,
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                borderColor: "#ccc",
                color: "#444",
                "&:hover": { borderColor: "#aaa", bgcolor: "#eee" },
              }}
            >
              Add New Section
            </Button>

            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                textTransform: "none",
                px: { xs: 2, sm: 3 },
                py: { xs: 0.5, sm: 1 },
                fontWeight: 600,
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                bgcolor: "#b63636",
                color: "whitesmoke",
                "&:hover": { bgcolor: "#8a2929" },
              }}
            >
              Confirm Sections
            </Button>
          </Box>

          {/* Validation Error */}
          {badSubmit && (
            <Typography
              color="error"
              mt={{ xs: 1, sm: 2 }}
              fontFamily="initial"
              textAlign="center"
              sx={{ fontSize: { xs: "0.7rem", sm: "0.875rem" } }}
            >
              Make sure all sections have a name and valid weight between 0.0 and 100
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
}

export default SectionCreator;
