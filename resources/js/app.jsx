import React from 'react';
import ReactDOM from 'react-dom/client';
import PrimaryLayout from './layouts/PrimaryLayout.jsx';
import '../css/app.css'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { BrowserRouter } from "react-router-dom";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});


ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
    <ThemeProvider 
    theme={darkTheme}
    >
        <CssBaseline />
        <BrowserRouter>
            <PrimaryLayout />
        </BrowserRouter>
    </ThemeProvider>
</React.StrictMode>
)