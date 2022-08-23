import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'


const StatusSelector = (props) => {
    const {role, onChangeFn, status, cta} = props
    if(role!=="Employee"){
        return (
            <FormControl fullWidth>
                <InputLabel>{cta}</InputLabel>
                <Select
                    value={status ? status : ''}
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

export default StatusSelector