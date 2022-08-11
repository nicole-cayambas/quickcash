import { Typography, Divider } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './auth/Login';
import Receivables from './Receivables';
import Loan from './Loan';
import Amortization from './Amortization';
import Companies from './Companies';
import Payrolls from './Payrolls';
import Admins from './Admins';
import Employees from './Employees';

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
          <Route path="loan" element={<Loan />} /> // change to something like "/loans/id"
          {/* <Route path="amortization" element={<Amortization />} /> // change to something like "/loans/id/amortization" */} //no route needed pala
          <Route path="login" element={<Login />} />
      </Routes>
  </React.Fragment>
}