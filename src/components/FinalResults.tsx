import { Box, Paper, Typography } from "@mui/material";
import MyAppBar from "./MyAppBar";
import { SectionType } from "./SectionCreator";
import { useLocation } from "react-router-dom";

export default function FinalResults(){
    const location = useLocation();
    const {sections, grades, selectedId} = location.state || {}
    function calculateResults(){

    }

    return(
        <Box>
            <MyAppBar/>
            <Box sx={{
                width:'100%',
                minHeight:'95vh',
                backgroundColor:'whitesmoke',
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                gap:5,
            }}>
                <Typography variant='h5' padding={3} fontFamily={'initial'}>
                    Create your own sections!
                </Typography>
                <Paper elevation={10} sx={{width:'75%'}}>
                    <Box sx={{
                        backgroundColor:'whitesmoke',
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'center',
                        gap:5,
                        padding:3
                    }}>
                        
                    </Box>
                    
                </Paper>
            </Box>
        </Box>
        );
}