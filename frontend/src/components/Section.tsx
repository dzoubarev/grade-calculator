import { Delete } from "@mui/icons-material"
import { Box, IconButton, TextField } from "@mui/material"
import { FC } from "react"

type SectionProps = {
    name:string
    weight:string
    id:string,
    handleDelete: (arg0:string) => void,
    handleSectionChange: (arg0:string, arg1:string) => void
    handleWeightChange: (arg0:string, arg1:string) => void
}

export const Section:FC<SectionProps> = (props) =>{
    return(
        <Box sx={{flexDirection:'row', display:'flex', justifyContent:'center', alignItems:'center', gap:3}}>
            <TextField onChange={(e)=> props.handleSectionChange(props.id, e.target.value) }value={props.name} placeholder='Enter Section Name' size="small" autoComplete="off"></TextField>
            <TextField onChange={(e)=> props.handleWeightChange(props.id, e.target.value)} value={props.weight} placeholder='Enter Section Weight' size="small" autoComplete="off"></TextField>
            <IconButton onClick={() => props.handleDelete(props.id)}><Delete></Delete></IconButton>
        </Box>
    )
}