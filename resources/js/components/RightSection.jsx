import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { usePageStore } from './stateman'

import { Box, Toolbar, Typography } from '@mui/material';

import Home from './pages/Home';
import Receivables from './pages/Receivables';
import Companies from './pages/Companies';
import PayrollOfficers from './pages/PayrollOfficers';
import Administrators from './pages/Administrators';
import Employees from './pages/Employees';
import Accounts from './pages/Accounts';
import Loans from './pages/Loans';
import CreateLoan from './pages/CreateLoan';
import CreateAccount from './pages/CreateAccount';
import Login from './auth/Login';
import Signup from './auth/Signup';

const RightSection = () => {
    const { isLoggedIn, user, role } = usePageStore()


    if(!isLoggedIn) {
        return <BoxComponent child={<LoggedOutRoutes />} />
    } else if(user.email_verified_at === null || user.email_verified_at === undefined) {
        return <BoxComponent child={<UnconfirmedRoutes />} />
    } else if(role === 'Administrator') {
        return <BoxComponent child={<AdminRoutes />} />
    } else if(role === 'Owner') {
        return <BoxComponent child={<OwnerRoutes />} />
    } else if(role === 'Payroll_Officer') {
        return <BoxComponent child={<PayrollRoutes />} />
    } else if(role === 'Employee') {
        return <BoxComponent child={<EmployeeRoutes />} />
    }
}

export default RightSection

const BoxComponent = (props) => {
    const { page } = usePageStore();

    return (
        <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    {page}
                </Typography>
            </Toolbar>
            {props.child}
        </Box>
    )
}

const OwnerRoutes = () => {
    return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/receivables" element={<Receivables />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/payroll_officers" element={<PayrollOfficers />} />
        <Route path="/administrators" element={<Administrators />} />
        <Route path="/Accounts" element={<Accounts />} />
        <Route path="/loans" element={<Loans />} />
        <Route path="/loans/create" element={<CreateLoan />} />
    </Routes>
    )
}

const AdminRoutes = () => {
    return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/receivables" element={<Receivables />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/payroll_officers" element={<PayrollOfficers />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/loans" element={<Loans />} />
        <Route path="/loans/create" element={<CreateLoan />} />
        <Route path="/accounts/create" element={<CreateAccount />} />
    </Routes>
    )
}

const PayrollRoutes = () => {
    return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/receivables" element={<Receivables />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/loans" element={<Loans />} />
        <Route path="/loans/create" element={<CreateLoan />} />
        <Route path="/accounts/create" element={<CreateAccount />} />
    </Routes>
    )
}

const EmployeeRoutes = () => {
    return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loans" element={<Loans />} />
        <Route path="/loans/create" element={<CreateLoan />} />
        <Route path="/accounts/create" element={<CreateAccount />} />
    </Routes>
    )
}

const LoggedOutRoutes = () => {
    return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
    </Routes>
    )
}

const UnconfirmedRoutes = () => {
    return (
    <Routes>
        <Route path="/" element={<Home />} />
    </Routes>
    )
}