import React, { useEffect, useState } from "react"
import http from "../http"
import { usePageStore } from "../stateman"

import { Typography, Stack, Card, CardContent, TextField, Button, Box, Alert, FormControl, Select, InputLabel, MenuItem } from '@mui/material'

import moment from "moment"

const CreateLoan = () => {
    const { role } = usePageStore()
    const [accountID, setAccountID] = useState(0)
    const [amount, setAmount] = useState(null)
    const [loanDate, setLoanDate] = useState(null)
    const [monthly, setMonthly] = useState(0)
    const [interestRate, setInterestRate] = useState(0)
    const [interest, setInterest] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)
    const [amortizations, setAmortizations] = useState(6)
    const [percentage, setPercentage] = useState(5)
    const [message, setMessage] = useState("")
    const [status, setStatus] = useState("Pending")
    

    useEffect(() => {
        usePageStore.setState({
            page: 'Create Loan'
        })
        getAccountID()
    }, [])

    const getAccountID = async() => {
        const account = await http.get('/api/user/account')
        if(account.status == 200){
            setAccountID(account.data.id)
        }
    }

    useEffect(() => {
        setInterestRate(Number(amortizations * percentage))
        setInterest(Number(interestRate/100 * amount))
    }, [amount])
    
    useEffect(() => {
        setTotalAmount(Number(amount) + Number(interest))
    }, [interest])

    useEffect(() => {
        setMonthly(Number(totalAmount/amortizations).toFixed(2))
    }, [totalAmount])

    useEffect(() => {
        if (loanDate===null) document.getElementById('loan_date').value = ""
    }, [loanDate])

    const changeAmount = (e) => {
        const re = /^\d+(,\d{3})*(\.\d*)?$/
        if(e.target.value === '' || re.test(e.target.value)){
            setAmount(e.target.value)
        } else e.target.value = ''
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const request = {
            amount: amount,
            interest_rate: interestRate,
            loan_date: moment(loanDate).format("YYYY-MM-DD"),
            amortizations: amortizations,
            percentage: percentage,
            account_id: accountID,
            status: status
        }

        if (role === 'Employee') http.post('/api/employee/loans', request).then((res) => {
            setMessage(res.data)
        }).catch((err) => {setMessage(err.response.data.message)})
        else if(role === 'Payroll_Officer') http.post('/api/payroll/loans', request).then((res) => {
            setMessage(res.data)
        }).catch((err) => {setMessage(err.response.data.message)})
        else if(role==='Owner' || role==='Administrator') http.post('/api/loans', request).then((res) => {
            setMessage(res.data)
        }).catch((err) => {setMessage(err.response.data.message)})

        setAmount(0)
        setLoanDate(null)
    }

    return (
        <Box component={"form"} onSubmit={handleSubmit} display="flex" justifyContent="space-evenly" alignItems="flex-start" flexDirection="row" flexWrap={'wrap'} height="100%">
            <Card sx={{ minWidth: 400 }} raised={true} >
                <CardContent>
                <Stack spacing="20px">
                    <ShowCreateLoan role={role}/>
                    {message ? <Alert severity="info">{message}</Alert> : null}
                    <TextField required id="amount" label="Amount" name="amount" onChange={changeAmount}/>
                    <TextField type={'date'} required helperText="Loan Date" id="loan_date" name="loan_date" onChange={(e)=>{setLoanDate(e.target.value)}}/>
                    <StatusSelector role={role} onChangeFn={(e) => {setStatus(e.target.value)}} status={status}/>
                    <Button fullWidth variant={"contained"} size="large" type={"submit"} > Submit </Button>
                </Stack>
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 400 }} raised={true} >
                <CardContent>
                    <CustomTypography text="Loan Breakdown" font={18} gutterBottom />
                    <CustomTypography text="Loan Amount" h="h5" data={amount} />
                    <Typography sx={{ mb:1.5 }}>
                        Loan Date: {loanDate ? moment(loanDate).format("MMM Do YYYY") : null}
                    </Typography>
                    <CustomTypography id="amortizations" text="Amortizations" data={amortizations} />
                    <CustomTypography id="percentage" text="Percentage" data={percentage + "%"} />
                    <CustomTypography text="Total Interest Rate" data={interestRate + "%"} />
                    <CustomTypography text="Amount to Pay" h="h6" data={"Php " + totalAmount} />
                    <CustomTypography text="Monthly Payment" h="h5" data={"Php " + monthly} />
                </CardContent>
            </Card>
        </Box>
    )
}

export default CreateLoan

const CustomTypography = (props) => {
    const {text, font, h, data} = props
    return (
        <Typography sx={{ fontSize: {font}, mb:1.5 }} variant={h}>
            {text}: {data ? data : null}
        </Typography>
    )
}

const ShowCreateLoan = (props) => {
    const role = props.role
    let cta
    if(role==="Employee"){
        cta = "Apply for a Loan"
    } else cta = "Create Loan"
    return <Typography variant="h5">{cta}</Typography>
}

const StatusSelector = (props) => {
    const {role, onChangeFn, status} = props
    if(role!=="Employee"){
        return (
            <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                    value={status}
                    label="Status"
                    onChange={onChangeFn}
                >
                    <MenuItem value={"Pending"}>Pending</MenuItem>
                    <MenuItem value={"Approved"}>Approved</MenuItem>
                    <MenuItem value={"Rejected"}>Rejected</MenuItem>
                    <MenuItem value={"Cancelled"}>Cancelled</MenuItem>
                    <MenuItem value={"Completed"}>Completed</MenuItem>
                </Select>
            </FormControl>
        )
    } return null
}