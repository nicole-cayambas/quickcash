import React from 'react';
import LeftSection from '../components/LeftSection';
import RightSection from '../components/RightSection';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';

const drawerWidth = 240;

const PrimaryLayout = () => {

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
            position="fixed"
            sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
            
            </AppBar>
            <LeftSection />
            <RightSection />
        </Box>
    )
}

export default PrimaryLayout;