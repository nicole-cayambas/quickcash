import React, {useState, useEffect} from 'react'
import http from '../http'
import { usePageStore } from '../stateman'

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment'



const Accounts = () => {
    const [accounts, setAccounts] = useState([])
    const {role} = usePageStore()
    
    const getAccounts = async () => {
        const accountsRes = await http.get('/api/accounts')
        if(accountsRes.status===200){
            setAccounts(accountsRes.data)
        }
    }
    var columns = [
        {   field: 'id', headerName: 'ID', width: 40    },
        {
            field: 'balance',
            headerName: 'Balance',
            width: 200
        },
        {
            field: 'created_at',
            headerName: 'Created At',
            width: 200
        },
        {
            field: 'updated_at',
            headerName: 'Updated At',
            width: 200
        },
        {field: 'company', headerName: 'Company', width: 200}
    ]
    var rows = []
    rows = accounts?.map((account) => {
        return {
            id: account.id,
            balance: account.balance,
            company: account.company_name,
            created_at: moment(account.created_at).format("MMM Do YYYY"),
            updated_at: moment(account.udpdated_at).format("MMM Do YYYY"),
        }
    })
    
    useEffect(() => {
        usePageStore.setState({
            page: 'Accounts'
        })
        getAccounts()
    }, [])

    return (
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
    )
}

export default Accounts