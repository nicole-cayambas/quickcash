import React, {useState, useEffect} from 'react'
import http from '../http'
import { usePageStore } from '../stateman'
import { NavLink } from 'react-router-dom'


import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import moment from 'moment'
import { Alert, Button, IconButton, MenuItem, Select } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'



const Accounts = () => {
    const {role} = usePageStore()
    const [accounts, setAccounts] = useState([])
    const [message, setMessage] = useState("")
    
    const getAccounts = async () => {
        const accountsRes = await http.get('/api/accounts')
        if(accountsRes.status===200){
            setAccounts(accountsRes.data)
        }
    }
    var columns = [
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'company_name', headerName: 'Company', width: 250 },
        {
            field: 'balance',
            headerName: 'Balance',
            width: 180
        },
        {
            field: 'created_at',
            headerName: 'Created At',
            width: 180,
            renderCell: params => moment(params.row.created_at).format("MMM Do YYYY")
        },
        {
            field: 'updated_at',
            headerName: 'Updated At',
            width: 180,
            renderCell: params => moment(params.row.updated_at).format("MMM Do YYYY")
        },
        {
            field: 'delete',
            headerName: 'Delete',
            hide: role==="Owner" || role==="Administrator" ? false : true,
            width: 40,
            renderCell: (params) => {
                return(
                    <IconButton aria-label="delete" size="small" onClick={()=>deleteRecord(params.row.id)}><DeleteIcon /></IconButton>
                )
            }
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 180,
            renderCell: (params) => {
                return(
                    <Select size="small" label="Status" onChange={(e, id) => changeStatus(e.target.value, params.row.id)} value={params.row.status || "Active"}>
                        <MenuItem value={'New'}>New</MenuItem>
                        <MenuItem value={"Active"}>Active</MenuItem>
                        <MenuItem value={"Deactivated"}>Deactivated</MenuItem>
                    </Select>
                )
            }
        }
    ]

    const deleteRecord = (id) => {
        deleteRequest(id)
    }

    const deleteRequest = async(id) => {
        const res = await http.delete(`api/accounts/${id}`)
        if(res.status===200||res.status===202){
            setMessage(res.data)
        }
    }
    
    useEffect(() => {
        usePageStore.setState({
            page: 'Accounts'
        })
        getAccounts()
    }, [])
    useEffect(() => {
        getAccounts()
    }, [message])

    return (
        <Box sx={{ height: '80vh', width: '100%' }}>
            <Button component={NavLink} to="/accounts/create" variant="contained" color="primary"> Create Account </Button>
            {message ? <Alert severity="info">{message}</Alert> : null}
            <DataGrid
                rows={accounts}
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