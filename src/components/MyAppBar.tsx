import {AppBar, Toolbar, IconButton, Typography, Box} from '@mui/material'
import {Home} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';

function MyAppBar(){
    const navigate = useNavigate();

    return(
        <Box sx={{flexGrow:1}}>
            <AppBar position='static' sx={{backgroundColor:'#9c0507'}}>
                <Toolbar sx={{gap:10}}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => navigate('/')}
                    >
                        <Home/>
                    </IconButton>
                    <Typography variant='h5'>About</Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default MyAppBar;