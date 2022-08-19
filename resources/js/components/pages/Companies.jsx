import axios from 'axios'
import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import { usePageStore } from '../stateman'

const Companies = () => {
    const [companies, setCompanies] = useState([])


    const columns = [
        {   field: 'id', headerName: 'ID', width: 40    },
        {
            field: 'name',
            headerName: 'Name',
            width: 150
        },
        {
            field: 'address',
            headerName: 'Address',
            width: 150
        },
        {
            field: 'phone',
            headerName: 'Phone',
            width: 150
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 150
        },
        {
            field: 'website',
            headerName: 'Website',
            width: 150
        }
    ]
      
    const rows = []

    useEffect(() => {
        usePageStore.setState({
            page: 'Companies'
        })

        axios.get('/api/companies/test').then(res => { 
            setCompanies(res.data)
        }).catch(err => {
            console.log(err.message)
        })
    }, [])

    companies.map((company) => {
        rows.push({
            id: company.id,
            name: company.name,
            address: company.address,
            phone: company.phone,
            email: company.email,
            website: company.website,
        })
    })
    return <div>
        <Box sx={{ height: '80vh', width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                disableSelectionOnClick
            />
        </Box>
    </div>
}

export default Companies