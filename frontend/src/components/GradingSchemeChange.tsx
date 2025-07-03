import { Box, Button, IconButton, Paper, TextField, Typography } from "@mui/material";
import MyAppBar from "./MyAppBar";
import {useNavigate } from "react-router-dom";
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

function GradingSchemeChange() {
  const [schemes,setSchemes] = useState<GradingSchemeType[]>([])
  const navigate = useNavigate();

  const [index, setIndex] = useState<number>(0);
  const [sections, setSections] = useState<SectionType[]>([]);
  const [badSubmit, setBadSubmit] = useState<boolean>(false);
  const[courseCode,setCourseCode] = useState("");
  const[status,setStatus] = useState("");

  const addSection = () => {
    const newSections = [...sections, { name: "", weight: "", id: uuidv4() }];
    setSections(newSections);
    setSchemes((schemes.map((scheme, schemeIndex) => {
        return index === schemeIndex ? {...scheme, sections: newSections} : schemes[schemeIndex]
    })
    ));
  };

  const deleteSection = (idToDelete: string) => {
    const newSections = sections.filter((section) => section.id !== idToDelete);
    setSections(newSections);
    setSchemes((schemes.map((scheme, schemeIndex) => {
        return index === schemeIndex ? {...scheme, sections: newSections} : schemes[schemeIndex]
    })
    ));
  };

  const changeSection = (idToChange: string, newSection: string) => {
    const updated = sections.map((section) =>
      section.id === idToChange ? { ...section, name: newSection } : section
    );
    setSections(updated);
    setSchemes((schemes.map((scheme, schemeIndex) => {
        return index === schemeIndex ? {...scheme, sections: updated} : schemes[schemeIndex]
    })
    ));
  };

  const changeWeight = (idToChange: string, newWeight: string) => {
    const updated = sections.map((section) =>
      section.id === idToChange ? { ...section, weight: newWeight } : section
    );
    setSections(updated);
    setSchemes((schemes.map((scheme, schemeIndex) => {
        return index === schemeIndex ? {...scheme, sections: updated} : schemes[schemeIndex]
    })
    ));
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


  const handleCourseSubmit = async () => {
    const cleanedId = courseCode.trim().replace(/\s+/g, "");
    if (cleanedId === "") return;

    try {
      const BASE_URL = process.env.REACT_APP_BACKEND_URL;
      const res = await fetch(`${BASE_URL}/api/scheme/${cleanedId}`);
      if (!res.ok) throw new Error("Failed to fetch data");
      const data: GradingSchemeType[] = await res.json();

      if (data.length === 0) {
        setStatus("Course code is not yet in the database or is incorrect");
        setTimeout(() => setStatus(""), 2000);
        return;
      }
      setSchemes(data);
      setSections(data[index].sections)
    } 
    catch (error: any) {
      setStatus(error.message);
    }
  };

  const handleSchemeSubmit = async() => {
    const hasInvalid = sections.some(
      (section) =>
        section.name.trim() === "" || !isValidFloat(section.weight.trim().toString())
    );

    if (hasInvalid) {
      setBadSubmit(true);
      setTimeout(() => setBadSubmit(false), 2000);
      return;
    }
    const token = sessionStorage.getItem("token");

    const BASE_URL = process.env.REACT_APP_BACKEND_URL;
    const res = await fetch(`${BASE_URL}/api/change/scheme`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json", "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(schemes),
    });

    if(res.ok){
        setStatus("Successfully changed sections.")
    }
    else{
        setStatus("Failed to change sections.")
    }

    setTimeout(() => {setStatus("")},2000)
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
    (schemes.length === 0) ?  
    
    <Box sx={{ height: "100vh", overflow: "hidden", backgroundColor: "#f9f9f9" }}>
  <MyAppBar />
  <Box
    sx={{
      flex: 1,
      backgroundColor: "#f9f9f9",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
      py: 4,
    }}
  >
    <Paper
      elevation={3}
      sx={{
        width: "75%",
        maxWidth: 600,
        bgcolor: "#f7f7f7",
        borderRadius: 2,
        p: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h5"
          padding={2}
          fontFamily={"initial"}
          color="text.primary"
          fontWeight={600}
        >
          Enter course code
        </Typography>
        <TextField
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value.toUpperCase())}
          autoComplete="off"
          size="small"
          placeholder="Enter course code"
        />
        <Button
          onClick={handleCourseSubmit}
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
          Confirm Course Code
        </Button>
        <Button
          onClick={() => navigate("/post")}
          variant="outlined"
          sx={{ textTransform: "none", minWidth: 180 }}
        >
          Back to Post Options
        </Button>
      </Box>
    </Paper>
  </Box>
</Box>
    
    :
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
          Change an existing course's grading scheme
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
                onClick={() => handleSchemeSubmit()}
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
                Confirm Changes to Scheme(s)
            </Button>
            <Button
              onClick={() => navigate("/post")}
              variant="outlined"
              sx={{ textTransform: "none", minWidth: 180 }}
            >
              Back to Post Options
            </Button>
        </Box>

          {badSubmit && (
            <Typography color="error" mt={1} fontFamily={"initial"}>
              Make sure all sections have a name and weights are valid numbers between 0.0 and 100
            </Typography>
          )}
          <Typography>{status}</Typography>
        </Paper>
      </Box>
    </Box>
  );
}


export default GradingSchemeChange;