// import './bootstrap.js';
import React, { useEffect } from 'react';
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
    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        await http.get('sanctum/csrf-cookie')
        await http.get('/api/user').then(res => {
            usePageStore.setState({
                isLoggedIn: true,
                user: res.data
            })
        })
        await http.get('/api/user/role').then(res => {
            usePageStore.setState({
                role: res.data
            })
        })
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