import { Box } from "@mui/material";
import MyAppBar from "./MyAppBar";
import { useNavigate } from "react-router-dom";

export default function CourseCreator(){
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
            
            </Box>
        </Box>
    );
}