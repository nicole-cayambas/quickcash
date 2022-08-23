import React, { useEffect, useState } from 'react'
import StatusSelector from "../StatusSelector"
import http from '../http'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import {NavLink} from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import moment from 'moment'

import { usePageStore } from '../stateman'

const Loans = () => {
    const [loans, setLoans] = useState([])
    const [status, setStatus] = useState("")
    const { isLoggedIn, role, user } = usePageStore()
    if (isLoggedIn) {
        var columns = [
            { field: 'id', headerName: 'ID', width: 40 },
            {
                field: 'amount',
                headerName: 'Amount',
                width: 120
            },
            {
                field: 'loan_date',
                headerName: 'Loan Date',
                width: 120
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
                width: 120
            },
            {
                field: 'total_interest_rate',
                headerName: 'Total Interest Rate',
                width: 150
            },
            {
                field: 'total_interest',
                headerName: 'Total Interest',
                width: 150
            },
            {
                field: 'total_amount',
                headerName: 'Total Amount',
                width: 150
            },
            {
                field: 'monthly',
                headerName: 'Monthly',
                width: 150
            },
            {
                field: 'status',
                headerName: 'Status',
                width: 100,
            },
            {
                field:'action', 
                headerName:'Action', 
                width: 150,
                renderCell: (props) => {
                    const changeStatus = (e) => {
                        console.log(e.target.value) //BOOKMARK
                    }
                    return <StatusSelector role={props.role} onChangeFn={changeStatus} cta="Edit Status"/>
                }
            }
        ]

        let rows = [];

        useEffect(() => {
            usePageStore.setState({
                page: 'Loans'
            })
            getLoans()
        }, [])

        const getLoans = async () => {
            let loansData
            if (role === 'Employee') loansData = await http.get('/api/employee/loans')
            else if (role === 'Administrator' || role === "Owner") loansData = await http.get('/api/loans')
            else if (role === 'Payroll_Officer') {
                loansData = await http.get('/api/payroll/loans')
            }
            setLoans(loansData.data)
        }

        rows = loans?.map((loan) => {
            const total_interest_rate = loan.percentage * loan.amortizations
            const total_interest = Number((total_interest_rate / 100) * loan.amount)
            const total_amount = total_interest + Number(loan.amount)
            const monthly = total_amount / loan.amortizations
            console.log(loan.status)
            return {
                id: loan.id,
                amount: loan.amount,
                loan_date: moment(loan.loan_date).format("MMM Do YYYY"),
                amortizations: loan.amortizations,
                percentage: loan.percentage + "%",
                total_interest_rate: total_interest_rate.toFixed(2) + "%",
                total_interest: "Php " + total_interest.toFixed(2),
                total_amount: "Php " + total_amount.toFixed(2),
                monthly: "Php " + monthly.toFixed(2),
                status: loan.status,
            }
        })
        
        return (
            <Box sx={{ height: '80vh', width: '100%' }}>
                <CreateLoanButton role={role} is_verified={user.is_verified}/>
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
    const { role, is_verified } = props
    if(role!=="Employee"){
        return <Button component={NavLink} to="/loans/create" variant="contained" color="primary"> Create Loan </Button>
    } else if(!is_verified){
        return <Button component={NavLink} to="/accounts/create" variant="contained" color="primary"> Apply For an Account </Button>
    } else {
        return <Button component={NavLink} to="/loans/create" variant="contained" color="primary"> Apply For a Loan </Button>
    }
}
