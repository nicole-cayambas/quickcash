import React, { useEffect, useState } from 'react'
import http from '../http'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { NavLink } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import moment from 'moment'

import { usePageStore } from '../stateman'
import { Alert, MenuItem, Select } from '@mui/material'

const Loans = () => {
    const [loans, setLoans] = useState([])
    const [message, setMessage] = useState("")
    const { isLoggedIn, role, user } = usePageStore()
    useEffect(()=>{
        usePageStore.setState({
            page: 'Loans'
        })
    }, [])
    
    if (isLoggedIn) {
        useEffect(() => {
            getLoans()
        }, [message])
        
        const columns = [
            {   field: 'account_name', 
                headerName:'Account',
                width: 200,
                renderCell: params => params.row.account.name
            },
            {
                field: 'company_name',
                headerName: 'Company',
                width: 200,
                hide: role!=="Owner" || role!=="Administrator" ? true : false,
                renderCell: role==="Owner" || role==="Administrator" ? params => params.row.company.name : null
            },
            {
                field: 'amount',
                headerName: 'Amount',
                width: 120
            },
            {
                field: 'loan_date',
                headerName: 'Loan Date',
                width: 120,
                renderCell: (params) => {
                    return moment(params.row.loan_date).format("MMM Do YYYY")
                }
            },
            {
                field: 'amortizations',
                headerName: 'Amortizations',
                width: 80,
                editable: true,
            },
            {
                field: 'percentage',
                headerName: 'Percentage',
                width: 120,
                renderCell: (params) => `${params.row.percentage} %`
            },
            {
                field: 'total_interest_rate',
                headerName: 'Total Interest Rate',
                width: 150,
                renderCell: params => `${(params.row.amortizations * parseInt(params.row.percentage)).toFixed(2)} %`
            },
            {
                field: 'total_interest',
                headerName: 'Total Interest',
                renderCell: (params) => {
                    const total_interest_rate = params.row.amortizations * parseInt(params.row.percentage)
                    return(
                        `${((total_interest_rate/100)* parseInt(params.row.amount)).toFixed(2)}`
                    )
                }
            },
            {
                field: 'total_amount',
                headerName: 'Total Amount',
                width: 150,
                renderCell: (params) => {
                    const total_interest_rate = params.row.amortizations * parseInt(params.row.percentage)
                    const total_interest = (total_interest_rate/100) * parseInt(params.row.amount)
                    return (total_interest + parseInt(params.row.amount)).toFixed(2)
                }
            },
            {
                field: 'monthly',
                headerName: 'Monthly',
                width: 150,
                renderCell: (params) => {
                    const total_amount = (((parseInt(params.row.amortizations) * parseInt(params.row.percentage))/100) * parseInt(params.row.amount))+parseInt(params.row.amount)
                    return (total_amount/params.row.amortizations).toFixed(2)
                }
            },
            {
                field: 'status',
                headerName: 'Status',
                width: 150,
                hide: role==="Employee" ? false : true 
            },
            {
                field: 'edit_status',
                headerName: 'Edit Status',
                hide: role === "Employee" ? true : false,
                width: 180,
                valueGetter: params => params.row.edit_status,
                valueSetter: params => {
                    params.row.edit_status = params.newValue
                },
                renderCell: (params) => {
                    return(
                        <Select size="small" label="Status" onChange={(e, id) => changeStatus(e.target.value, params.row.id)} value={params.row.status || "Pending"}>
                            <MenuItem value={"Pending"}>Pending</MenuItem>
                            <MenuItem value={"Approved"}>Approved</MenuItem>
                            <MenuItem value={"Rejected"}>Rejected</MenuItem>
                            <MenuItem value={"Cancelled"}>Cancelled</MenuItem>
                            <MenuItem value={"Completed"}>Completed</MenuItem>
                        </Select>
                    )
                }
            },
        ]

        const changeStatus = (value, loan_id) => {
            const request = {
                status: value
            }
            if(role!=="Employee"){
                http.put(`api/loans/${loan_id}`, request).then((res)=>{
                    setMessage(res.status===204 ? `Loan with ID of ${loan_id} is updated.` : null)
                })
            } else {
                http.put(`api/payroll/loans/${loan_id}`, request).then((res)=> {
                    setMessage(res.status===204 ? `Loan with ID of ${loan_id} is updated.` : null)
                })
            }
        }

        const getLoans = async () => {
            let loansData
            if(user.account_id !== null){
                if (role === 'Employee') loansData = await http.get('/api/employee/loans')
                else if (role === 'Administrator' || role === "Owner") loansData = await http.get('/api/loans')
                else if (role === 'Payroll_Officer') {
                    loansData = await http.get('/api/payroll/loans')
                }
                setLoans(loansData.data)
            }
        }

        return (
            <Box sx={{ height: '80vh', width: '100%' }}>
                <CreateLoanButton role={role} has_account={user.account_id !== null} />
                {message ? <Alert severity="info">{message}</Alert> : null}
                <DataGrid
                    rows={loans}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                />
            </Box>
        )
    } else {
        return (
            <div>
                <h1>You are not logged in</h1>
            </div>
        )
    }
}

export default Loans

const CreateLoanButton = (props) => {
    const { role, has_account } = props
    if (role !== "Employee") {
        return <Button component={NavLink} to="/loans/create" variant="contained" color="primary"> Create Loan </Button>
    } else if (!has_account) {
        return <Button component={NavLink} to="/accounts/create" variant="contained" color="primary"> Apply For an Account </Button>
    } else {
        return <Button component={NavLink} to="/loans/create" variant="contained" color="primary"> Apply For a Loan </Button>
    }
}
