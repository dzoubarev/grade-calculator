import { Box, Paper, Typography } from "@mui/material";
import MyAppBar from "./MyAppBar";

export default function About(){
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
            gap:3,
        }}>
            <Box sx={{
            display:'flex',
            flexDirection:'column',
            alignItems:'center'
            }}>
                <Typography variant='h5' padding={3} fontFamily={'initial'}>
                    About the Site
                </Typography>
            </Box>
            <Paper elevation={10} sx={{width:'75%'}}>
                <Box sx={{
                    backgroundColor:'whitesmoke',
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center',
                    gap:5,
                    padding:3
                }}>
                    <Typography>This site was created to help McGill students find out how they need to do on exams.</Typography>
                </Box>
                
            </Paper>
        </Box>
    </Box>
    );
}