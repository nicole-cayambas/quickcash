import axios from 'axios'
import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import { usePageStore } from '../stateman'
import http from '../http';

const Companies = () => {
    const [companies, setCompanies] = useState([])
    
    useEffect(() => {
        usePageStore.setState({
            page: 'Companies'
        })
        getCompanies()
    }, [])

    const getCompanies = async()=> {
        const res = await http.get('api/companies')
        if(res.status===200){
            setCompanies(res.data)
        }
    }

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

    return <div>
        <Box sx={{ height: '80vh', width: '100%' }}>
            <DataGrid
                rows={companies}
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