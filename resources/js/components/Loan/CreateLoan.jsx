import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


const CreateLoan = (props) => {
    return (
        <div>
            <h1>Create Loan</h1>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            <CompaniesSelection />
        </div>
    )
}

export default CreateLoan;