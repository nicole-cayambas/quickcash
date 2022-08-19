import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { usePageStore } from './stateman'
import { isLoggedIn } from './auth/auth'

import { Box, Toolbar, Typography } from '@mui/material';

import Home from './pages/Home';
import Receivables from './pages/Receivables';
import Companies from './pages/Companies';
import PayrollOfficers from './pages/PayrollOfficers';
import Administrators from './pages/Administrators';
import Employees from './pages/Employees';
import Loans from './pages/Loans';
import CreateLoan from './pages/CreateLoan';
import Login from './auth/Login';
import Signup from './auth/Signup';

const LoggedInRoutes = () => {
    return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/receivables" element={<Receivables />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/payroll_officers" element={<PayrollOfficers />} />
        <Route path="/administrators" element={<Administrators />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/loans" element={<Loans />} />
        <Route path="/loans/create" element={<CreateLoan />} />
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

const RightSection = () => {
    const { page } = usePageStore();

    if(isLoggedIn()) {
    return ( 
        <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    {page}
                </Typography>
            </Toolbar>
            <LoggedInRoutes />
        </Box>
    )
    } else {
        return (
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        {page}
                    </Typography>
                </Toolbar>
                <LoggedOutRoutes />
            </Box>
        )
    }
}
export default RightSection












// // OLD CODE
// import { Typography, Divider } from '@mui/material';
// import React from 'react';
// import { Route, Routes } from 'react-router-dom';
// import TempComponent from './TempComponent';

// const RightSection = () => {
//   return <React.Fragment>
//     <Typography component="h1">you are viewing the Kwa page</Typography>
//     <Divider />
//       <Routes>
//           <Route path="/" element={<div>home</div>} />
//           <Route path="about" element={<div>about</div>} />
//           <Route path="wow" element={<TempComponent />} />
//       </Routes>
//   </React.Fragment>
// }
// export default RightSection