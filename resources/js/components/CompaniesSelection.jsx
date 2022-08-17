import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const CompaniesSelection = (props) => {
    const [companies, setCompanies] = useState([]);
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const getCompanies = () => {
        axios.get('/api/companies', {
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
                setCompanies(res.data)
        }).catch(err => console.log(err))
    }
    

    useEffect(() => {
        getCompanies();   
    }, []);

    const companySelection = companies.map(company => {
        return {
            label: company.name,
            id: company.id
        }
    })

    const sendCompanyId = (event, value) => {
        setSelectedCompanies(value)
    }
            
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={companySelection}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Company" />}
            onChange={sendCompanyId}
        />
    );
}

export default CompaniesSelection;