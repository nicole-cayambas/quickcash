import React, {useState, useEffect} from 'react'
import http from '../http'
import { usePageStore } from '../stateman'
import {Box, Card, CardContent, Stack, Typography, TextField, Autocomplete, Button} from '@mui/material'
import { indexOf } from 'lodash'

const CreateAccount = () => {
    const [company, setCompany] = useState('')
    const [companies, setCompanies] = useState([])
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')
    const {role, user} = usePageStore()
    var companyNames = []

    useEffect(() => {
        usePageStore.setState({
            page: 'Create Account'
        })
        getCompanies()
    }, [])

    useEffect(()=> {
        console.log(company)
    }, [company])

    useEffect(()=> {
        console.log(phone)
    }, [phone])

    companies.forEach((company)=>{companyNames.push(company.name)})
    
    const getCompanies = async() => {
        const res = await http.get('api/companies')
        if(res.status===200){
            setCompanies(res.data)
        } else console.log(res)
    }

    const changePhone = (e) => { //BOOKMARK
    }

    const selectCompany = (e) => {
        const i = companyNames.indexOf(e.target.value)
        setCompany(companies[i])
    }

    const handleSubmit = (e) => {
        
    }
    return (
        <Box component={"form"} onSubmit={handleSubmit} display="flex" justifyContent="center" alignItems="center" height="100%">
            <Card sx={{ minWidth: 600 }} raised={true} >
                <CardContent>
                <Stack spacing="20px">
                    <Typography variant="h5">{user.is_verified ? null : "Apply for an Account" }</Typography>
                    <Typography variant="h5">{role==="Employee" ? "Apply for an Account" : null }</Typography>
                    {message ? <Alert severity="info">{message}</Alert> : null}
                    <Autocomplete
                        onSelect={selectCompany}
                        required
                        options={companyNames}
                        fullWidth
                        renderInput={(params) => <TextField {...params} label="Available Companies" />}
                    />
                    <TextField label="Account Name" name="account_name" value={user.first_name + ' ' + user.last_name} disabled/>
                    <TextField label="Address" name="address" required onChange={(e) => {setAddress(e.target.value)}}/>
                    <TextField label="Phone" name="phone" required onChange={changePhone}/>
                    <Button fullWidth variant={"contained"} size="large" type={"submit"} > Submit </Button>
                </Stack>
                </CardContent>
            </Card>
        </Box>
    )
}

export default CreateAccount