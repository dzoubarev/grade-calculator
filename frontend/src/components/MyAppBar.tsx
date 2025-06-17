import {AppBar, Toolbar, IconButton, Typography, Box, Button} from '@mui/material'
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
                    <Button onClick={() => navigate('/about')} sx={{textTransform:'none'}}>
                        <Typography variant='h5' color='whitesmoke'>About</Typography>
                    </Button>
                    <Button onClick={() => navigate('/post')} sx={{textTransform:'none'}}>
                        <Typography variant='h5' color='whitesmoke'>Post</Typography>
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default MyAppBar;