import { Autocomplete, Box, Button, IconButton, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import MyAppBar from "./MyAppBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SectionType } from "./SectionCreator";
import { Close, GitHub, Search} from "@mui/icons-material";
import { Analytics } from "@vercel/analytics/react"

export type GradingSchemeType = {
  name: string;
  sections: SectionType[];
  id:string;
};

type Course = {
  name:string;
  id:string;
}

function Home() {
  const navigate = useNavigate();
  const [courseCode, setCourseCode] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [courses, setCourses] = useState<Course[]>([]);

  const handleChange = (newCode: string) => {
    setCourseCode(newCode);
  };

  useEffect(() => {
    const fetchCourses = async() => {
      const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/course/all`);
      if(!data.ok){
        setCourses([]); 
        throw new Error("Failed to Fetch Courses");
      }
      const courses:Course[] = await data.json();
      setCourses(courses);
    };
    fetchCourses();
  },[]);

  const findCourseCode = ():string => {
    let code:string = ""
    courses.forEach((course) => {
      if(courseCode.includes(course.id) && courseCode.includes(course.name)){
        code = course.id;
      }
    })
    return code;

  }

  const handleSubmit = async () => {
    if (courseCode.trim() === "") return;

    setLoading(true);
    const codeFromOptions = findCourseCode();
    const cleanedId = codeFromOptions === "" ? courseCode.trim().replace(/\s+/g, "") : codeFromOptions;
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
          <Typography sx={{ mb: 3, fontStyle: "italic" }}>Ex: PHYS142</Typography>

          <Autocomplete
          autoComplete={true}
          autoSelect={true}
          autoHighlight={true}
          options={courses ? courses?.map((course) => {
            return course.id + " - " + course.name;
          }) : []}
          onInputChange={(event,value) => handleChange(value) }
          renderInput={(params) =>
          <TextField
            {...params}
            size="small"
            placeholder="Search courses..." 
            value={courseCode}
            fullWidth
            sx={{ 
              mb: 3, 
              width: 400, 
              mx: "auto",
              '& .MuiOutlinedInput-root': {
                borderRadius: '50px', 
                paddingLeft: '10px'
              }
            }}
            onChange={(e) => {setCourseCode(e.target.value)}}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setTimeout( () => {handleSubmit()}, 0);
              }
            }}
            
            slotProps={{
              input:{
              ...params.InputProps,
              startAdornment: (
              <>
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
                {params.InputProps.startAdornment}
              </>
              )
              }
            }}
          />}
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
      <Typography fontFamily='initial' textAlign={"center"}>If your course isn't here, contact gradecalc.dev@gmail.com or go to the feedback page to help add more grading schemes!</Typography>
      <Typography fontFamily={'initial'} textAlign={"center"}>Note: if your course isn't there try the start creating option! </Typography>
      <IconButton href="http://github.com/dzoubarev/grade-calculator" sx={{pb:5}}>
          <GitHub></GitHub>
      </IconButton>
    </Box>
  );
}

export default Home;
