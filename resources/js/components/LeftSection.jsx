import { Stack, Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export default function(){
  return <Stack spacing={1}>
    <Button component={Link} to="/">Home</Button>

    {/* for owner, admin, payroll(for their company only) */}
    <Button component={Link} to="/receivables">Receivables</Button> 

    {/* for owner, admin,  */}
    <Button component={Link} to="/companies">Companies</Button> 

    {/* for owner, admin,  */}
    <Button component={Link} to="/payroll-officers">Payroll Officers</Button> 
    
    {/* only owner */}
    <Button component={Link} to="/admins">Admins</Button> 

    {/* for owner, admin, payrolls,  */}
    <Button component={Link} to="/employees">Employees</Button> 

    {/* for owner, admin, payrolls, employee(for themselves only) */}
    <Button component={Link} to="/loans">Loans</Button> 
    
    <Button component={Link} to="/login">Login</Button>
  </Stack>
}