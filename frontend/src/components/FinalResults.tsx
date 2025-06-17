import { Box, Paper, Typography } from "@mui/material";
import MyAppBar from "./MyAppBar";
import { SectionType } from "./SectionCreator";
import { useLocation } from "react-router-dom";
import {GradeType} from "./SectionCalculator"

export default function FinalResults(){
    const location = useLocation();
    const {sections, grades, selectedId} = location.state || {}
    const selectedSection = (selectedId && sections) ? sections.find((s: SectionType) => s.id === selectedId)?.name : null;
    const gradeLetters = ["A","A-","B+","B","B-","C+","C","D"]
    const gradeNumbers = [85,80,75,70,65,60,55,50];
    const results = calculateResults();
    const resultTypography = results.map((result,index) => {
        if(result>100){
            return(
            <Typography>
                {"Over 100% on "+selectedSection+" needed to get a "+gradeLetters[index]+" / "+gradeNumbers[index]}
            </Typography>
        );
        }
        
        return(
            <Typography>
                {"You need a "+result+"% on "+selectedSection+" to get a "+gradeLetters[index]+" / "+gradeNumbers[index]}
            </Typography>
        );
    })

    function findMinGrade(desired: number): number {
        let knownTotal = 0;
        let unknownWeight = 0;

        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            let weight = parseFloat(section.weight.trim());
            if(weight > 1){weight /=100;}

            if (section.id === selectedId) {
                unknownWeight = weight;
            } else {
                const grade = parseFloat(grades.find((g: GradeType) => g.sectionId === section.id)?.grade.trim() || "0");
                knownTotal += weight * grade;
            }
    }

    const needed = (desired - knownTotal) / unknownWeight;
    return Math.round(needed * 100) / 100;
}

   function calculateResults(): number[] {
    
    if (!grades || !sections || !selectedId) return [];

    return gradeNumbers.map(desired => findMinGrade(desired));
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
                    Results
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
                        {resultTypography}
                    </Box>
                    
                </Paper>
            </Box>
        </Box>
        );
}