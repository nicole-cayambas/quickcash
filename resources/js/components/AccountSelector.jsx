import { Autocomplete } from '@mui/material'
import React from 'react'


const AccountSelector = (props) => {
    const { onSelectFn, options } = props
    return (
        <Autocomplete
            onSelect={onSelectFn}
            required
            options={options}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Accounts" />}
        />
    )
}

export default AccountSelector