import React, { useEffect, useState } from "react"
import http from "../http"
import { usePageStore } from "../stateman"

import { Typography, Stack, Card, CardContent, TextField, Button, Box, Alert, FormControl, Select, InputLabel, MenuItem } from '@mui/material'
import StatusSelector from "../StatusSelector"

import moment from "moment"

const CreateLoan = () => {
    const { role, user } = usePageStore()
    const [account, setAccount] = useState(0)
    const [accounts, setAccounts] = useState([])
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
        getAccount()
    }, [])

    const getAccount = async() => {
        if(role==="Employee"){
            const accountres = await http.get('/api/user/account')
            if(account.status == 200){
                setAccount(accountres.data.id)
            }
        } else {
            const accountsres = await http.get('api/accounts')
            if(accountsres.status == 200){
                setAccount(accountsres.data)
            }
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

    const changeAccount = (e) => {
        setAccountName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const account_id = account !== 0 ? account : user.account_id
        const request = {
            amount: amount,
            interest_rate: interestRate,
            loan_date: moment(loanDate).format("YYYY-MM-DD"),
            amortizations: amortizations,
            percentage: percentage,
            account_id: account_id,
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
    }

    return (
        <Box component={"form"} onSubmit={handleSubmit} display="flex" justifyContent="space-evenly" alignItems="flex-start" flexDirection="row" flexWrap={'wrap'} height="100%">
            <Card sx={{ minWidth: 400 }} raised={true} >
                <CardContent>
                <Stack spacing="20px">
                    <Typography variant="h5">{ role==="Employee" ? "Apply For a Loan" : "Create Loan" }</Typography>
                    {message ? <Alert severity="info">{message}</Alert> : null}
                    { role!=="Employee" ? <TextField required id="account" label="Account Name" name="account" onChange={changeAccount}/> : null }
                    <TextField required id="amount" label="Amount" name="amount" onChange={changeAmount}/>
                    <TextField type={'date'} required helperText="Loan Date" id="loan_date" name="loan_date" onChange={(e)=>{setLoanDate(e.target.value)}}/>
                    <StatusSelector role={role} onChangeFn={(e) => {setStatus(e.target.value)}} status={status} cta="Status"/>
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