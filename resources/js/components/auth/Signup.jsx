import React,{useState} from 'react'
import { Stack, Button, TextField } from '@mui/material';
import axios from 'axios';

export default function() {
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get('/sanctum/csrf-cookie').then(() => {
            axios.post('/api/register',{
                first_name: firstName,
                last_name: lastName,
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
                <TextField type="text" id="outlined-basic" label="First Name" variant="outlined" name="first_name" onChange={(e) => setFirstName(e.target.value)} required />
                <TextField type="text" id="outlined-basic" label="Last Name" variant="outlined" name="last_name" onChange={(e) => setLastName(e.target.value)} required />
                <TextField type="text" id="outlined-basic" label="Email" variant="outlined" name="email" onChange={(e) => setEmail(e.target.value)} required />
                <TextField type="password" id="outlined-basic" label="Password" variant="outlined" name="password" onChange={(e) => setPassword(e.target.value)} required />
                <Button type="submit">Sign Up</Button>
            </Stack>
        </form>
    </div>
    )
}