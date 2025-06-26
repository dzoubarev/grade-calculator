import { Box, Button, TextField, Typography } from "@mui/material";
import MyAppBar from "./MyAppBar";
import { useState } from "react";

export default function Feedback(){
    const[category,setCategory] = useState<string>("");
    const[feedback,setFeedback] = useState<string>("");
    const[status,setStatus] = useState<string>("");

    const handleSubmit = async() => {
        if(feedback.trim() === " "){return;}

        if(category === ""){
            setStatus("Please select a category for the feedback.")
            setTimeout(() => {setStatus("")} , 2000);
            return;
        }

        const result = await fetch('http://localhost:8080/api/sendFeedback', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ category:category, feedback:feedback }),
        })

        if(!result.ok){
            setStatus("Failed to send feedback.")
        }
        else{
            setStatus("Sent feedback successfully!")
        }

        setTimeout(() => {setStatus("")} , 2000);

    }


    return(
        <Box>
            <MyAppBar/>
            <Box
            sx={{
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                justifyContent:'center',
                gap:3,
                padding:5
            }}
            >
                <Typography variant='h4'><strong>Feedback</strong></Typography>
                <Box
                sx={{
                    display:'flex',
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'center',
                    gap:3
                }}>
                    <Typography>Category: </Typography>
                    <Button 
                        onClick={() => setCategory("Feature")}
                        variant={category === "Feature" ? "contained" : "outlined"}
                        sx={{
                            backgroundColor: category === "Feature" ? "#9c0507" : "transparent",
                            color: category === "Feature" ? "white" : "#9c0507",
                            borderColor: "#9c0507",
                            "&:hover": {
                            backgroundColor: category === "Feature" ? "#7a0405" : "#f5f5f5",
                            }
                        }}
                    >
                        Feature
                    </Button>

                    <Button 
                        onClick={() => setCategory("Course")}
                        variant={category === "Course" ? "contained" : "outlined"}
                        sx={{
                            backgroundColor: category === "Course" ? "#9c0507" : "transparent",
                            color: category === "Course" ? "white" : "#9c0507",
                            borderColor: "#9c0507",
                            "&:hover": {
                            backgroundColor: category === "Course" ? "#7a0405" : "#f5f5f5",
                            }
                        }}
                    >
                        Course
                    </Button>

                    <Button 
                        onClick={() => setCategory("Other")}
                        variant={category === "Other" ? "contained" : "outlined"}
                        sx={{
                            backgroundColor: category === "Other" ? "#9c0507" : "transparent",
                            color: category === "Other" ? "white" : "#9c0507",
                            borderColor: "#9c0507",
                            "&:hover": {
                            backgroundColor: category === "Other" ? "#7a0405" : "#f5f5f5",
                            }
                        }}
                    >
                        Other
                    </Button>
                </Box>
                <TextField
                    onChange={(e) => setFeedback(e.target.value)}
                    multiline
                    minRows={9}
                    sx={{width:'50%'}}
                    value={feedback}
                />
                <Button
                    variant="contained"
                    sx={{ backgroundColor: "#9c0507", "&:hover": { backgroundColor: "#7a0405" } }}
                    onClick = {() => handleSubmit()}
                >
                    Send feedback!
                </Button>
                <Typography>{status}</Typography>
            </Box>
        </Box>
    );
}