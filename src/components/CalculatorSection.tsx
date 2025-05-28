import { Box, Checkbox, IconButton, TextField, Typography } from "@mui/material"
import { SectionType } from "./SectionCreator";
import { FC } from "react";
import { Block, RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";

type CalculatorSectionProps = {
    section:SectionType
    changeGrade:(arg0:string,arg1:string) => void
}

const CalculatorSection:FC<CalculatorSectionProps> = (props) =>{
    return(
    <Box sx={{flexDirection:'row', display:'flex', justifyContent:'center', alignItems:'center', gap:20}}>
            <Box sx={{flexDirection:'row', display:'flex', justifyContent:'center', alignItems:'center', gap:3}}>
                <Typography>{props.section.name}</Typography>
                <Typography>{"("+props.section.weight+")"}</Typography>
            </Box>

            <Box sx={{flexDirection:'row', display:'flex', justifyContent:'center', alignItems:'center', gap:3}}>
                <TextField placeholder={"Enter grade for "+props.section.name} size="small" autoComplete="off"></TextField>
                <Checkbox icon={<RadioButtonUnchecked/>} checkedIcon={<RadioButtonChecked/>}></Checkbox>
            </Box>
    </Box>
    );
}

export default CalculatorSection;