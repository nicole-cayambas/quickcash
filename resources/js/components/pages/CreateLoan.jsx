import React, { useEffect, useState } from "react"
import http from "../http";
import { usePageStore } from "../stateman"

import { Typography, Stack, Card, CardContent, TextField, Button, Box } from '@mui/material'
import moment from "moment";

const CreateLoan = () => {
    const { role } = usePageStore();
    const [accountID, setAccountID] = useState(0);
    const [amount, setAmount] = useState(0)
    const [monthly, setMonthly] = useState(0)
    const [interestRate, setInterestRate] = useState(0)
    const [interest, setInterest] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)
    const fixed = {
        amortizations: 6,
        percentage: 5
    }
    

    useEffect(() => {
        usePageStore.setState({
            page: 'Create Loan'
        })
        http.get('sanctum/csrf-cookie').then(async () => {
            await http.get('/api/user/account').then((res) => {
                setAccountID(res.data.id)
            }).catch((err) => {
                console.log(err)
            })
        })
    }, [])

    useEffect(() => {
        setInterestRate(Number(fixed.amortizations * fixed.percentage))
        setInterest(Number(interestRate/100 * amount))
    }, [amount])
    
    useEffect(() => {
        setTotalAmount(Number(amount) + Number(interest))
    }, [interest])

    useEffect(() => {
        setMonthly(Number(totalAmount/fixed.amortizations).toFixed(2))
    }, [totalAmount])

    const changeAmount = (e) => {
        const re = /^[0-9\b]+$/
        if(e.target.value === '' || re.test(e.target.value)){
            setAmount(e.target.value)
        } else {
            e.target.value = ''
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget);

        const request = {
            amount: formData.get('amount'),
            loan_date: formData.get('loan_date'),
            amortizations: formData.get('amortizations'),
            percentage: formData.get('percentage'),
            account_id: accountID
        }

        http.get('sanctum/csrf-cookie').then(async () => {
            await http.post('/api/loans', request).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        })
    }
    return (
        <Box component={"form"} onSubmit={handleSubmit} display="flex" justifyContent="center" alignItems="center" flexDirection="column" height="100%">
            <Card sx={{ minWidth: 700 }} raised={true} >
                <CardContent>
                <Stack spacing="20px">
                    <Typography variant="h5">Apply for a Loan</Typography>
                    <TextField required id="amount" label="Amount" name="amount" onChange={changeAmount}/>
                    <TextField type={'date'} helperText="Loan Date" id="loan_date" name="loan_date" />
                    <TextField type={'number'} value={fixed.amortizations} disabled id="amortizations" label="Amortizations" name="amortizations" />
                    <TextField type={'number'} value={interestRate} disabled id="interest_rate" label="Interest Rate" name="interest_rate" />
                    <TextField type={'number'} value={fixed.percentage} disabled id="percentage" label="Percentage" name="percentage" />
                    <TextField type={'number'} value={interest} disabled id="interest" label="Interest" name="interest" />
                    <TextField type={'number'} value={totalAmount} disabled id="total_amount" label="Total Amount" name="total_amount" />
                    <TextField type={'number'} value={monthly} disabled id="monthly" label="Monthly" name="monthly" />
                    <Button fullWidth variant={"contained"} size="large" type={"submit"} > Submit </Button>
                </Stack>
                </CardContent>
            </Card>
        </Box>
    )
}

export default CreateLoan