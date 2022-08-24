import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import http from '../http'
import { usePageStore } from '../stateman'
import {Box, Card, CardContent, Stack, Typography, TextField, Autocomplete, Button, Alert} from '@mui/material'

const CreateAccount = () => {
    const [company, setCompany] = useState('')
    const [companies, setCompanies] = useState([])
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')
    const {role, user} = usePageStore()
    const navigate = useNavigate()
    var companyNames = []

    useEffect(() => {
        usePageStore.setState({
            page: 'Create Account'
        })
        getCompanies()
    }, [])

    companies.forEach((company)=>{companyNames.push(company.name)})
    
    const getCompanies = async() => {
        const res = await http.get('api/companies')
        if(res.status===200){
            setCompanies(res.data)
        } else console.log(res)
    }

    const selectCompany = (e) => {
        const i = companyNames.indexOf(e.target.value)
        setCompany(companies[i])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const request = {
            company_id: company.id,
            name: user.first_name + ' ' + user.last_name,
            address: address,
            phone: phone
        }
        
        if(role==="Employee"){
            http.post('api/account/apply', request).then((res)=> {
                setMessage(res.data)
                navigate('/loans')
            }).catch(err => console.log(err))
        }

    }
    return (
        <Box component={"form"} onSubmit={handleSubmit} display="flex" justifyContent="center" alignItems="center" height="100%">
            <Card sx={{ minWidth: 600 }} raised={true} >
                <CardContent>
                <Stack spacing="20px">
                    <Typography variant="h5">{role==="Employee" ? "Apply for an Account" : "Create Account" }</Typography>
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
                    <TextField label="Phone" name="phone" required onChange={(e)=> {setPhone(e.target.value)}}/>
                    <Button fullWidth variant={"contained"} size="large" type={"submit"} > Submit </Button>
                </Stack>
                </CardContent>
            </Card>
        </Box>
    )
}

export default CreateAccount