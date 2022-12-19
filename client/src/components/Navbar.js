import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Container, Typography, Box, Toolbar, Button } from '@mui/material';

export default function NavBar() {
    const navigate = useNavigate();

    const navLinkStyles = { my: 2, color: 'white', display: 'block', outline: 'none !important' };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ backgroundColor: '#000', padding: '0 20px' }}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'Avenir',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            '&:hover': {
                                color: '#fff',
                                textDecoration: 'none',
                            }
                        }}
                    >
                        MACA
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            onClick={() => navigate('/')}
                            sx={navLinkStyles}
                        >
                            Dashboard
                        </Button>
                        <Button
                            onClick={() => navigate('/upload')}
                            sx={navLinkStyles}
                        >
                            Upload
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
