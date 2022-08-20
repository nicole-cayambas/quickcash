import React, { useEffect, useState } from 'react'
import http from '../http';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';

import { usePageStore } from '../stateman'

const Loans = () => {
    const [loans, setLoans] = useState([])
    const { isLoggedIn } = usePageStore()


    if(isLoggedIn) {

        const columns = [
            {   field: 'id', headerName: 'ID', width: 40    },
            {
                field: 'amount',
                headerName: 'Amount',
                width: 150
            },
            {
                field: 'loan_date',
                headerName: 'Loan Date',
                width: 150
            },
            {
                field: 'amortizations',
                headerName: 'Amortizations',
                width: 120,
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
            }
        ]
        
        const rows = []

        useEffect(() => {
            usePageStore.setState({
                page: 'Loans'
            })
            getLoans()
        }, [])

        async function getLoans() {
            await http.get('/api/loans').then(res => {
                setLoans(res.data)
            }).catch(err => {
                console.log(err.message)
            })
        }
        loans.map((loan) => {
            const total_interest_rate = (loan.percentage) * loan.amortizations
            const total_interest = Number((total_interest_rate/100) * loan.amount)
            const total_amount = total_interest + Number(loan.amount)
            const monthly = total_amount / loan.amortizations
            rows.push({
                id: loan.id,
                amount: loan.amount,
                loan_date: moment(loan.loan_date).format("MMM Do YYYY"),
                amortizations: loan.amortizations,
                percentage: loan.percentage + "%",
                total_interest_rate: total_interest_rate.toFixed(2) + "%",
                total_interest: "Php " + total_interest.toFixed(2),
                total_amount: "Php " + total_amount.toFixed(2),
                monthly: "Php " + monthly.toFixed(2)
            })
        })
        return (
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
        )
    } else {
        return <div>
            <h1>You are not logged in</h1>
        </div>
    }
}

export default Loans