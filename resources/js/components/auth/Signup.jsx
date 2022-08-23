import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Stack, Card, CardContent, TextField, Button, Box } from '@mui/material'
import http from '../http'
import { usePageStore } from '../stateman'

const Signup = () => {
    const navigate = useNavigate()
    const { page } = usePageStore();
    useEffect(() => {
        usePageStore.setState({
            page: 'Signup'
        })
    }, [])

    const attemptSignup = async (creds) => {
        const register = await http.post('/api/register', creds)
        if(register.status===200){
            const userRes = await http.get('/api/user');
                if (userRes.status === 200) {
                    usePageStore.setState({
                        isLoggedIn: true,
                        user: userRes.data
                    })
                } else console.log(userRes.data)
                const roleRes = await http.get('/api/user/role');
                if (roleRes.status === 200) {
                    usePageStore.setState({
                        role: roleRes.data
                    })
                } else console.log(userRes.data)
                navigate('/')
        } else console.log(register)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);

        const signupCredentials = {
            first_name: formData.get('first_name'),
            last_name: formData.get('last_name'),
            email: formData.get('email'),
            password: formData.get('password')
        }

        attemptSignup(signupCredentials)
        
    }
    return (
        <Box component={"form"} onSubmit={handleSubmit} display="flex" justifyContent="center" alignItems="center" flexDirection="column" height="80vh">
            <Card sx={{ minWidth: 500, maxWidth: 800 }} raised={true} >
                <CardContent>
                <Stack spacing="20px">
                    <Typography variant="h3">{page}</Typography>
                    <TextField required id="first_name" label="First Name" name="first_name" autoFocus/>
                    <TextField required id="last_name" label="Last Name" name="last_name"/>
                    <TextField required id="email" label="E-mail" name="email" autoComplete="email"/>
                    <TextField required name="password" label="Password" type="password" id="password" autoComplete="current-password"/>
                    <Button fullWidth variant={"contained"} size="large" type={"submit"} > Signup </Button>
                    <Button component={Link} to="/login" variant="outlined" size="large">Login</Button>
                </Stack>
                </CardContent>
            </Card>
        </Box>
    )
}

export default Signup