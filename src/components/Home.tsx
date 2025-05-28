import {Box, Typography,Paper,Button,TextField} from '@mui/material'
import React from 'react';
import MyAppBar from './MyAppBar';
import { useNavigate } from 'react-router-dom';

function Home() {
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
                    <TextField size='small'></TextField>
                    <Button sx={{backgroundColor:'#9c0507'}}>
                        <Typography fontFamily={'initial'} color='whitesmoke'>Use Inputted Course Code</Typography>
                    </Button>
                </Box>
            </Paper>
        </Box>
        </Box>
    );
}

export default Home;

