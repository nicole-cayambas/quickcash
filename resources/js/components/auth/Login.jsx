import React,{useState} from 'react'
import { Stack, Button, TextField } from '@mui/material';
import axios from 'axios';

export default function() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get('/sanctum/csrf-cookie').then(() => {
            axios.post('/api/login',{
                email: email,
                password: password
            }).then(res => {
                localStorage.setItem('user', JSON.stringify(res.data))
                console.log(res.data.token)
            }).catch(err => {
                console.log(err);
            })
        }).catch(err => {
            console.log(err);
        })

    };
    return (
    <div>
        <form onSubmit={handleSubmit}> 
            <Stack spacing="10px">
                <TextField type="text" id="outlined-basic" label="Email" variant="outlined" name="email" onChange={(e) => setEmail(e.target.value)} required />
                <TextField type="password" id="outlined-basic" label="Password" variant="outlined" name="password" onChange={(e) => setPassword(e.target.value)} required />
                <Button type="submit">Login</Button>
            </Stack>
        </form>
    </div>
    )
}