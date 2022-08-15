import { Typography, Divider } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './auth/Login';
import Signup from './auth/Signup';
// import Logout from './auth/Logout';
import Receivables from './Receivables';
import Loan from './Loan/Loan';
import Loans from './Loan/Loans';
import Amortization from './Amortization';
import Companies from './Companies';
import Payrolls from './Payrolls';
import Admins from './Admins';
import Employees from './Employees';
import CreateLoan from './Loan/CreateLoan';

export default function(props){
  return <React.Fragment>
    <Typography component="h1"></Typography>
    <Divider />
      <Routes>
          <Route path="/" element={<div>kwa 1</div>} />
          <Route path="receivables" element={< Receivables /> } />
          <Route path="companies" element={< Companies /> } />
          <Route path="payroll-officers" element={< Payrolls /> } />
          <Route path="admins" element={< Admins /> } />
          <Route path="employees" element={< Employees /> } />
          {/* <Route path="loan" element={<Loan />} />  */}
          <Route path="loans" element={<Loans />} /> 
          {/* <Route path="amortization" element={<Amortization />} /> // change to something like "/loans/id/amortization" */} //no route needed pala
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          {/* <Route path="logout" element={<Logout />} /> */}
          {/* <Route path="loantest" element={<CreateLoan />} /> */}
      </Routes>
  </React.Fragment>
}