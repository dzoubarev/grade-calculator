import {Box, Typography,Paper,Button,TextField} from '@mui/material'
import React from 'react';
import MyAppBar from './MyAppBar';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { SectionType } from './SectionCreator';


export type GradingSchemeType = {
      name:string,
      sections:SectionType[]  
}


function Home() {

    const navigate = useNavigate();
    const[courseCode,setCourseCode] = useState("")
    const[loading,setLoading] = useState<boolean>(false);
    const[error,setError] = useState<string>("")

    const handleChange = (newCode:string) => {
        setCourseCode(newCode.trim())
    }

    const handleSubmit = async() => {
        
        setCourseCode(courseCode.trim());
        if(courseCode===''){return;}

        setLoading(true);

        await fetch(`http://localhost:8080/api/scheme/${courseCode}`)
        .then((res) => {
            if(!res.ok){throw new Error("Failed to fetch data")};

            return res.json();
        })
        .then((data:GradingSchemeType[]) => {
            setLoading(false);
            if(data.length === 0){
                setError("Course code is not yet in the database or is incorrect");
                setTimeout(() => {
                    setError("");
                },2000)
                return;
            }
            console.log(data)
            navigate("/sections",{state: {schemes: data}})
        })
        .catch((error) =>{
            setError(error.message)
            setLoading(false);
        }
        ) 
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
            <Paper elevation={10}
            sx={{minHeight:'50vh', width:'40%', backgroundColor:''}}>
                <Box 
                sx={{
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'center',
                    alignItems:'center',
                    gap:5,
                    padding:5
                }}>
                    <Typography variant='h6'>Option 1</Typography>
                    <Typography textAlign={'center'} >
                        Create your own sections and weights to represent your course's grading scheme.
                    </Typography>
                    <Button sx={{backgroundColor:'#9c0507'}} onClick={() => navigate("/sections")}>
                        <Typography fontFamily={'initial'} color='whitesmoke'>Create Your Own Course!</Typography>
                    </Button>
                </Box>
            </Paper>
            <Paper elevation={10}
            sx={{minHeight:'50vh', width:'40%', backgroundColor:''}}>
                <Box 
                sx={{
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'center',
                    alignItems:'center',
                    gap:5,
                    padding:5
                }}>
                    <Typography variant='h6'>Option 1</Typography>
                    <Typography textAlign={'center'}>
                        Enter a course code to load the grading scheme.
                    </Typography>
                    <Typography>Ex: PHYS142</Typography>
                    <TextField size='small' onChange={(e) => handleChange(e.target.value.toUpperCase())} value={courseCode} autoComplete='off'></TextField>
                    <Button sx={{backgroundColor:'#9c0507'}} onClick={() => handleSubmit()}>
                        <Typography fontFamily={'initial'} color='whitesmoke'>Use Inputted Course Code</Typography>
                    </Button>
                    {loading && <Typography>Loading...</Typography>}
                    <Typography>{error}</Typography>
                </Box>
            </Paper>
        </Box>
        </Box>
    );
}

export default Home;

