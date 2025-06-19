import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import MyAppBar from "./MyAppBar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CourseCreator(){
    const navigate = useNavigate();
    const[data,setData] = useState({id:"", name:""});
    const[status,setStatus] = useState("");
    const[submittedId,setSubmittedId] = useState("");
    
    const handleCourseIdChange = (newCourseId:string) =>{
        setData({...data, id:newCourseId})
    }

    const handleCourseNameChange = (newCourseName:string) =>{
        setData({...data, name:newCourseName})
    }

    const postData = async () => {
        if(data.id.trim() === "" || data.name.trim() === ""){return;}

         try {
            const checkRes = await fetch(`http://localhost:8080/api/course/${data.id}`);

            if (!checkRes.ok) {
                throw new Error("Failed to fetch data");
            }

            const inDatabase = await checkRes.json();

            if (inDatabase) {
                setStatus("Course already in database");
                setTimeout(() => setStatus(""), 2000);
                return;
            }

            const response = await fetch("http://localhost:8080/api/course", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({id:data.id.trim(), name:data.name.trim()}),
            });

            if (!response.ok) {
                throw new Error("Failed to submit");
            }

            const result = await response.json();
            console.log("Success:", result);
            setSubmittedId(data.id.trim())
            setData({id:"",name:""})
            setStatus("Successffully posted data!")
            setTimeout(() => {
                    setStatus("");
                },2000)
        } 
        catch (error) {
            setStatus("Failed to post data.")
            setTimeout(() => {
                    setStatus("");
                },2000)
        }
    }

    return(
        <Box>
            <MyAppBar></MyAppBar>
            <Box sx={{
                width:'100%',
                minHeight:'95vh',
                backgroundColor:'whitesmoke',
                display:'flex',
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center',
                gap:5
            }}>
                <Paper elevation={10} sx={{minHeight:'60vh', width:'50%', backgroundColor:''}}>
                    <Box sx={{
                        display:'flex',
                        flexDirection:'column',
                        justifyContent:'center',
                        alignItems:'center',
                        gap:6,
                        padding:5
                    }}>
                        <Box 
                        sx={{
                            display:'flex',
                            flexDirection:'column',
                            justifyContent:'center',
                            alignItems:'center',
                            gap:2
                        }}>
                            <Typography>
                                Course Code (Ex. MATH133)
                            </Typography>
                            <TextField onChange={(e) => handleCourseIdChange(e.target.value.toUpperCase())} autoComplete="off" value={data.id} size='small'></TextField>
                        </Box>
                        <Box 
                        sx={{
                            display:'flex',
                            flexDirection:'column',
                            justifyContent:'center',
                            alignItems:'center',
                            gap:2
                        }}>
                            <Typography>
                                Course Name (Ex. Linear Algebra)
                            </Typography>
                            <TextField onChange={(e) => handleCourseNameChange(e.target.value)} autoComplete="off" value={data.name} size='small'></TextField>
                        </Box>
                        <Box 
                        sx={{
                            display:'flex',
                            flexDirection:'column',
                            justifyContent:'center',
                            alignItems:'center',
                            gap:2
                        }}>
                            <Typography>{status}</Typography>
                            <Button onClick={() => postData()} sx={{backgroundColor:'#9c0507'}}>
                                <Typography color='whitesmoke'>Confirm Course</Typography>
                            </Button>
                            <Button onClick={() => navigate("/post")} sx={{backgroundColor:'#9c0507'}}>
                                <Typography color='whitesmoke'>Back to Post Options</Typography>
                            </Button>
                            <Button onClick={() => navigate("/post/scheme", {state:{courseId:submittedId}})} sx={{backgroundColor:'#9c0507'}}>
                                <Typography color='whitesmoke'>Create Grading Scheme for This Course</Typography>
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
}