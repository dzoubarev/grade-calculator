import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import MyAppBar from "./MyAppBar";

export default function Post(){
    const navigate = useNavigate();

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
                <Paper elevation={10} sx={{minHeight:'50vh', width:'40%', backgroundColor:''}}>
                    <Box sx={{
                        display:'flex',
                        flexDirection:'column',
                        justifyContent:'center',
                        alignItems:'center',
                        gap:10,
                        padding:5
                    }}>
                        <Typography>This is where changes to the database can be made</Typography>
                        <Button sx={{backgroundColor:'#9c0507'}} onClick={() => {navigate("/post/course")}}>
                            <Typography fontFamily={'initial'} color='whitesmoke'>Add New Course</Typography>
                        </Button>
                        <Button sx={{backgroundColor:'#9c0507'}} onClick={() => {navigate("/post/scheme")}}>
                            <Typography color='whitesmoke'>Add new grading scheme to existing course</Typography>
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
}