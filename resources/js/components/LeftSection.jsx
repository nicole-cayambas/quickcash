import React, { useEffect } from 'react';
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";

import { isLoggedIn, logOut } from './auth/auth';
import axios from 'axios';

// MATERIAL
import { ListItemIcon } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Button from '@mui/material/Button';

function CustomLinkButton({ children, to, ...props }) {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });
  
    return (
        <ListItem disablePadding>
            <ListItemButton component={NavLink} to={to} {...props} selected={match !== null}>
                <ListItemIcon>{match ? <ArrowForwardIosIcon /> : undefined}</ListItemIcon>
                <ListItemText>{children}</ListItemText>
            </ListItemButton>
        </ListItem>
    );
  }




const drawerWidth = 240;
const LeftSection = () => {

    if(isLoggedIn()) {

        const logout = () => {
            axios.post('/api/logout').then(res => {
                logOut()
                window.location.href = '/login'
            }).catch(err => {
                console.log(err)
            })
        }
    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left"
        >
        <List>
            <CustomLinkButton to="/">Home</CustomLinkButton>
            <CustomLinkButton to="/receivables">Receivables</CustomLinkButton>
            <CustomLinkButton to="/companies">Companies</CustomLinkButton>
            <CustomLinkButton to="/payroll_officers">Payroll Officers</CustomLinkButton>
            <CustomLinkButton to="/administrators">Administrators</CustomLinkButton>
            <CustomLinkButton to="/employees">Employees</CustomLinkButton>
            <CustomLinkButton to="/loans">Loans</CustomLinkButton>
            <Button onClick={logout}> Logout </Button>
        </List>
        </Drawer>
    )} else {
        return (
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
            <List>
                <CustomLinkButton to="/">Home</CustomLinkButton>
                <CustomLinkButton to="/login">Login</CustomLinkButton>
                <CustomLinkButton to="/signup">Signup</CustomLinkButton>
            </List>
            </Drawer>
        )
    }
}
export default LeftSection;











// OLD CODE
// import { Stack, Button } from '@mui/material';
// import React from 'react';
// import { Link } from 'react-router-dom';

// const LeftSection = () => {
//   return <Stack spacing={1}>
//     <Button component={Link} to="/">Home</Button>
//     <Button component={Link} to="/about">About</Button>
//     <Button component={Link} to="/wow">Temp</Button>
//   </Stack>
  
// }
// export default LeftSection;

