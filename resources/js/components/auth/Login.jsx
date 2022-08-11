import React,{useState} from 'react'
import { Stack, Button, TextField } from '@mui/material';

export default function() {
    /* LOOK THIS UP */
    // const [email,setEmail] = useState('');
    // const [password,setPassword] = useState('');
    // const handleLogin = async() =>{
    //     //fetch, axios , apisause
    //     const res = await apiSauce.post('/api/login', firstName);
    //     console.log(res)
        
    // };
    return (
    <div>
        <form action="" method="post" > //action={handleLogin}
            <Stack spacing="10px">
                <TextField id="outlined-basic" label="Email" variant="outlined" name="email" required />
                <TextField type="password" id="outlined-basic" label="Password" variant="outlined" name="email" required />
                <Button type="submit">Login</Button>
            </Stack>
        </form>
    </div>
    )
}