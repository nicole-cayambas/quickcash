import React, { useEffect, useState } from "react"
import { usePageStore } from "../stateman"

import { Typography, Stack, Card, CardContent, TextField, Button, Box } from '@mui/material'
import moment from "moment";

const CreateLoan = () => {
    const { role } = usePageStore();
    const [amount, setAmount] = useState(0)
    const [monthly, setMonthly] = useState(0)
    const [interestRate, setInterestRate] = useState(0)
    const [interest, setInterest] = useState(0)
    const raw = {
        amortizations: 3,
        percentage: 5
    }
    

    useEffect(() => {
        usePageStore.setState({
            page: 'Create Loan',
            role: 'Employee' // test
        })
    }, [])

    const handleOnChange = (e) => {
        setAmount(e.target.value)

        let data = {
            total_interest_rate: Number(raw.amortizations * raw.percentage),
            total_interest: (Number(raw.amortizations * raw.percentage)/100) * amount,
        }

        console.log(data)
        setMonthly((Number(data.total_interest) + Number(amount))/raw.amortizations)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('submit')

        const formData = new FormData(e.currentTarget);

        const request = {
            amount: formData.get('amount'),
            amortizations: formData.get('amortizations')
        }
    }
    return (
        <Box component={"form"} onSubmit={handleSubmit} display="flex" justifyContent="center" alignItems="center" flexDirection="column" height="100%">
            <Card sx={{ minWidth: 700 }} raised={true} >
                <CardContent>
                <Stack spacing="20px">
                    <Typography variant="h5">Apply for a Loan</Typography>
                    <TextField required id="amount" label="Amount" name="amount" onChange={handleOnChange} autoFocus/>
                    <TextField type={'date'} helperText="Loan Date" id="loan_date" name="loan_date" />
                    <TextField type={'number'} value={'3'} disabled id="amortizations" label="Amortizations" name="amortizations" />
                    <TextField type={'number'} value={interestRate} disabled id="interest_rate" label="Interest_rate" name="interest_rate" />
                    <TextField type={'number'} value={interest} disabled id="interest" label="Interest" name="interest" />
                    <TextField type={'number'} value={'5'} disabled id="percentage" label="Percentage" name="percentage" />
                    <TextField type={'number'} value={monthly} disabled id="monthly" label="Monthly" name="monthly" />
                    <Button fullWidth variant={"contained"} size="large" type={"submit"} > Submit </Button>
                </Stack>
                </CardContent>
            </Card>
        </Box>
    )
}

export default CreateLoan