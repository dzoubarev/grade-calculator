import { Box,Paper,Typography,Button, IconButton } from "@mui/material";
import MyAppBar from "./MyAppBar";
import { useState } from "react";
import { Section } from "./Section";
import { v4 as uuidv4} from 'uuid';
import { useLocation, useNavigate } from "react-router-dom";
import { GradingSchemeType } from "./Home";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

export type SectionType = {
    name:string,
    weight:string,
    id:string
}


function SectionCreator(){
    const location = useLocation();
    const schemes:GradingSchemeType[] = location.state?.schemes || [];
    const navigate = useNavigate();
    const exampleScheme:SectionType[] = [{name:"Homework",weight:"0.1",id:uuidv4()},{name:"Midterm",weight:"0.3",id:uuidv4()},{name:"Final",weight:"0.6",id:uuidv4()}]

    const [index,setIndex] = useState<number>(0);
    const [sections,setSections] = useState<SectionType[]>( schemes.length === 0 ?  exampleScheme : schemes[index].sections);
    const [badSubmit,setBadSubmit] = useState<boolean>(false);
    
    const errorTypography = <Typography fontFamily={'initial'}>Make sure all sections have a name and weights are valid decimals between 0.0 and 1.0</Typography>

    const addSection = () =>{
        const newSections = [...sections, {name:"",weight:"0.0",id:uuidv4()}];
        setSections(newSections);
    }

    const deleteSection = (idToDelete:string) => {
        const newSections = sections.filter((section) => section.id !== idToDelete);
        setSections(newSections);
    }

    const changeSection = (idToChange:string, newSection:string) => {
        const updated = sections.map( (section) => { return section.id === idToChange ? {...section, name:newSection} : section})
        setSections(updated)
    }

    const changeWeight = (idToChange:string, newWeight:string) => {
        const updated = sections.map( (section) => { return section.id === idToChange ? {...section, weight: newWeight} : section})
        setSections(updated)
    }

    const changeScheme = (increasing:boolean) =>{
        const newIndex = increasing
        ? (index + 1) % schemes.length
        : (index === 0 ? schemes.length - 1 : index - 1);

        setIndex(newIndex)
        setSections(schemes[newIndex].sections)

    }

    const changeSchemeButtons = (
        <Box sx={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            gap:10
        }}>
            <IconButton onClick={() => changeScheme(false)}>
                <ArrowBackIos></ArrowBackIos>
            </IconButton>
            <Typography>
                Scheme {index+1}/{schemes.length}
            </Typography>
            <IconButton onClick={() => changeScheme(false)}>
                <ArrowForwardIos></ArrowForwardIos>
            </IconButton>
        </Box>
    );

    function isValidFloat(str: string): boolean {
        return /^-?\d+(\.\d+)?$/.test(str.trim());
    }

    const handleSubmit = () =>{
        const hasInvalid = sections.some(section => 
        section.name.trim() === '' || !isValidFloat(section.weight.toString())
        );

        if(hasInvalid){
            setBadSubmit(true);
            setTimeout(()=>setBadSubmit(false), 2000);
            return;
        }

        navigate("/calculator", {state: {sections}})
        
    }

    const sectionElements = sections.map(
                    (section) => {
                        return <Section 
                                name={section.name} 
                                weight={section.weight} 
                                key={section.id} 
                                id={section.id} 
                                handleDelete={deleteSection}
                                handleSectionChange={changeSection}
                                handleWeightChange={changeWeight}
                                />
                    }
    );

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
                    <Box sx={{flexDirection:'row', display:'flex', justifyContent:'center', alignItems:'center', gap:13, pr:5}}>
                        <Typography fontFamily={'initial'} fontSize={20}>Section Name</Typography>
                        <Typography fontFamily={'initial'} fontSize={20}>Section Weight</Typography>
                    </Box>
                    {sectionElements}
                    {schemes.length !== 0 && changeSchemeButtons}
                    <Button autoCapitalize='off' onClick={() => addSection()} sx={{backgroundColor:'#e6e3e3'}}><Typography color='black' fontFamily={'initial'}>Add new section!</Typography></Button>
                    <Button autoCapitalize='off' onClick={() => handleSubmit()} sx={{backgroundColor:'#9c0507'}}><Typography color='whitesmoke' fontFamily={'initial'}>Confirm Sections!</Typography></Button>
                    {badSubmit ? errorTypography : null}
                </Box>
                
            </Paper>
        </Box>
    </Box>
    );
}

export default SectionCreator;