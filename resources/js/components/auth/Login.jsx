import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

import { usePageStore } from '../stateman'
import { logIn } from '../auth/auth'

import { Typography, Stack, Card, CardContent, TextField, Button, Box } from '@mui/material'

const Login = () => {
    useEffect(() => {
        usePageStore.setState({
            page: 'Login'
        })
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);

        const loginCredentials = {
            headers: {
                'Content-Type': 'application/json'
            },
            email: formData.get('email'),
            password: formData.get('password')
        }

        axios.get('sanctum/csrf-cookie').then(() => {
            axios.post('/api/login', loginCredentials).then((res) => {
                logIn()                
            }).catch(err => {
                console.log(err.message)
            })
        })
    }

    return (
        <Box component={"form"} onSubmit={handleSubmit} display="flex" justifyContent="center" alignItems="center" flexDirection="column" height="80vh">
            <Card sx={{ minWidth: 500, maxWidth: 800 }} raised={true} >
                <CardContent>
                <Stack spacing="20px">
                    <Typography variant="h3">Login</Typography>
                    <TextField required id="email" label="E-mail" name="email" autoComplete="email" autoFocus/>
                    <TextField required name="password" label="Password" type="password" id="password" autoComplete="current-password"/>
                    <Button fullWidth variant={"contained"} size="large" type={"submit"} > Login </Button>
                    <Button component={Link} to="/signup" variant="outlined" size="large">Signup</Button>
                </Stack>
                </CardContent>
            </Card>
        </Box>
    )
}

export default Login