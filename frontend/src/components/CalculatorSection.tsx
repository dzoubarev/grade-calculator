import { Box, Checkbox, TextField, Typography } from "@mui/material"
import { SectionType } from "./SectionCreator";
import { FC } from "react";
import { RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";

type CalculatorSectionProps = {
    section:SectionType
    changeGrade:(arg0:string,arg1:string) => void
    isSelected:boolean,
    setSelected:(arg0:string) => void
}

const CalculatorSection:FC<CalculatorSectionProps> = (props) =>{
    return(
    <Box sx={{flexDirection:'row', display:'flex', justifyContent:'center', alignItems:'center', gap:20}}>
            <Box sx={{flexDirection:'row', display:'flex', justifyContent:'center', alignItems:'center', gap:3}}>
                <Typography>{props.section.name}</Typography>
                <Typography>{"("+props.section.weight+")"}</Typography>
            </Box>

            <Box sx={{flexDirection:'row', display:'flex', justifyContent:'center', alignItems:'center', gap:3}}>
                { !props.isSelected ? 
                <TextField placeholder={"Enter grade for "+props.section.name} size="small" autoComplete="off" onChange={(e)=>props.changeGrade(props.section.id,e.target.value)}></TextField> 
                :
                <Typography color="darkred">This section will be the calculated section</Typography>
                }
                <Checkbox 
                icon={<RadioButtonUnchecked/>} checkedIcon={<RadioButtonChecked/>} 
                onChange={() => props.setSelected(props.section.id)}
                checked={props.isSelected}
                sx={{
                '&.Mui-checked': {
                 color: "darkred"
                }
                }}
                ></Checkbox>
            </Box>
    </Box>
    );
}

export default CalculatorSection;