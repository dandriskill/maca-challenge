import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';

export default function PageNotFound() {
  return (
    <Container maxWidth="xl">
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: purple[300],
                minHeight: '100vh',
            }}
        >
            <Typography variant="h1" style={{ color: 'white' }}>
                Page Not Found
            </Typography>
        </Box>
    </Container>
  );
}
