import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'

import { usePageStore } from '../stateman'
import http from '../http'
import moment from 'moment'

const PayrollOfficers = () => {
    const[payrolls, setPayrolls] = useState([])
    useEffect(() => {
        usePageStore.setState({
            page: 'Payroll Officers'
        })
        getPayrolls()
    }, [])

    const getPayrolls = async() => {
        const res = await http.get('api/payrolls')
        if(res.status === 200){
            setPayrolls(res.data)
        }
    }

    const columns = [
        {   field: 'id', headerName: 'ID', width: 40    },
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            renderCell: (params) => {
                return `${params.row.first_name} ${params.row.first_name}`
            }
        },
        {
            field: 'company_name',
            headerName: 'Company',
            width: 150,
        },
        {
            field: 'created_at',
            headerName: 'Created At',
            width: 150
        },
        {
            field: 'updated_at',
            headerName: 'Updated At',
            width: 150,
            renderCell: (params)=> {
                return moment(params.row.created_at).format("MMM Do YYYY")
            }
        }
    ]
    return (
        <Box sx={{ height: '80vh', width: '100%' }}>
            <DataGrid
                rows={payrolls}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                disableSelectionOnClick
            />
        </Box>
    )
}

export default PayrollOfficers