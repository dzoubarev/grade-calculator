import { Box, Button, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { SectionType } from "./SectionCreator";
import MyAppBar from "./MyAppBar";
import { useState } from "react";
import CalculatorSection from "./CalculatorSection";

type GradeType = {
    sectionId:string,
    grade:string,
    isKnown:true
}

export default function SectionCalculator() {

    const location = useLocation();
    const sections: SectionType[] = location.state?.sections || [];

    const[badSubmit,setBadSubmit] = useState<boolean>(false);
    const[grades,setGrades] = useState<GradeType[]>(sections.map((section) => { return {sectionId:section.id, grade:"",isKnown:true} }))

    const errorTypography = <Typography fontFamily={'initial'}>Make sure all grades are valid numbers between 0.0 and 100.0</Typography>

    const changeGrade = (idToChange:string, newGrade:string) => {
        const updated = grades.map( (singleGrade) => { return singleGrade.sectionId === idToChange ? {...singleGrade, grade:newGrade} : singleGrade})
        setGrades(updated);
    }

    const sectionElements = sections.map((section) => <CalculatorSection section={section} changeGrade={changeGrade}/>)

    function isValidFloat(str: string): boolean {
        return /^-?\d+(\.\d+)?$/.test(str.trim());
    }

    const handleSubmit = () =>{
        const hasInvalid = grades.some(grade => 
        grade.isKnown && !isValidFloat(grade.grade.toString())
        );

        if(hasInvalid){
            setBadSubmit(true);
            setTimeout(()=>setBadSubmit(false), 2000);
            return;
        }
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
            gap:3,
        }}>
            <Box sx={{
            display:'flex',
            flexDirection:'column',
            alignItems:'center'
            }}>
                <Typography variant='h5' padding={3} fontFamily={'initial'}>
                    Calculate your minimum needed grade for a section!
                </Typography>
                <Typography>Click on the cancel icon to indicate which section needs the calculation</Typography>
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
                    <Box sx={{flexDirection:'row', display:'flex', justifyContent:'center', alignItems:'center', gap:20, pr:7}}>
                        <Typography fontFamily={'initial'} fontSize={20}>Section Name and Weight</Typography>
                        <Typography fontFamily={'initial'} fontSize={20}>Grade for Section</Typography>
                    </Box>
                    
                    {sectionElements}
                    <Button autoCapitalize='off' onClick={() => console.log("hi")} sx={{backgroundColor:'#9c0507'}}><Typography color='whitesmoke' fontFamily={'initial'}>Calculate</Typography></Button>
                    {badSubmit ? errorTypography : null}
                </Box>
                
            </Paper>
        </Box>
    </Box>
    );
}

