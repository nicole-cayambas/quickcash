import axios from 'axios'
import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import { usePageStore } from '../stateman'

const Employees = () => {
    const [employees, setEmployees] = useState([])


    const columns = [
        {   field: 'id', headerName: 'ID', width: 40    },
        {
            field: 'name',
            headerName: 'Name',
            width: 150
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 150
        },
        {
            field: 'verified',
            headerName: 'Verified',
            width: 150
        },
        {
            field: 'company',
            headerName: 'Company',
            width: 150
        },
        {
            field: 'account',
            headerName: 'Account',
            width: 150
        }
    ]
      
    const rows = []

    useEffect(() => {
        usePageStore.setState({
            page: 'Employees'
        })

        axios.get('/api/employees/test').then(res => { 
            setEmployees(res.data)
        }).catch(err => {
            console.log(err.message)
        })
    }, [])

    employees.map((employee) => {
        const name = employee.first_name + ' ' + employee.last_name
        rows.push({
            id: employee.id,
            name: name,
            email: employee.email,
            verified: employee.is_verified,
            company: employee.company_id,
            account: employee.account_id,
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
                experimentalFeatures={{ newEditingApi: true }}
            />
        </Box>
    </div>
}

export default Employees