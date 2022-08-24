// import './bootstrap.js';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useNavigate } from "react-router-dom";
import PrimaryLayout from './layouts/PrimaryLayout';
import { usePageStore } from './components/stateman';
import http from './components/http';
import '../css/app.css'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const theme = createTheme({
    palette: {
        mode: 'light',
    },
});


const App = () => {
    const { user, role } = usePageStore()

    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        const user = await http.get('/api/user')
        if (user.status === 200) {
            usePageStore.setState({
                isLoggedIn: true,
                user: user.data,
                role: user.data.role
            })
        } else if(user.status===401){
            console.log('Unauthorized')
        }
    }

    return (
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <PrimaryLayout />
                </BrowserRouter>
            </ThemeProvider>
        </React.StrictMode>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);