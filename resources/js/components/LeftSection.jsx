import React, { useEffect } from 'react';
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";
import http from './http';
import { usePageStore } from './stateman';

// MATERIAL
import { Divider, ListItemIcon, Box } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LogoutIcon from '@mui/icons-material/Logout';


const LeftSection = () => {

    const { isLoggedIn, user, role } = usePageStore()
    const email_verified_at = user ? user.email_verified_at : null


    if(!isLoggedIn) {
        return <CustomDrawer child={<LoggedOutList />} />
    } else if(!email_verified_at) {
        return <CustomDrawer child={<UnconfirmedList />} />
    } else if(role === 'Administrator') {
        return <CustomDrawer child={<AdminList />} />
    } else if(role === 'Owner') {
        return <CustomDrawer child={<OwnerList />} />
    } else if(role === 'Payroll_Officer') {
        return <CustomDrawer child={<PayrollList />} />
    } else if(role === 'Employee') {
        return <CustomDrawer child={<EmployeeList />} />
    }
}

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

function LogoutButton() {
    return (
        <ListItem disablePadding component='a'>
            <ListItemButton onClick={logout}>
                <ListItemIcon><LogoutIcon/></ListItemIcon>
                <ListItemText>Logout</ListItemText>
            </ListItemButton>
        </ListItem>
    )
}

function CustomDrawer(props) {
    return (
        <Drawer sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                    },
                }} variant="permanent" anchor="left"
            >
            {props.child}
        </Drawer>
    )
}

function OwnerList() {
    return (
        <List>
            <CustomLinkButton to="/">Home</CustomLinkButton>
            <CustomLinkButton to="/receivables">Receivables</CustomLinkButton>
            <CustomLinkButton to="/companies">Companies</CustomLinkButton>
            <CustomLinkButton to="/payroll_officers">Payroll Officers</CustomLinkButton>
            <CustomLinkButton to="/administrators">Administrators</CustomLinkButton>
            <CustomLinkButton to="/employees">Employees</CustomLinkButton>
            <CustomLinkButton to="/loans">Loans</CustomLinkButton>
            <Divider />
            <LogoutButton />
        </List>
    )
}

function AdminList() {
    return (
        <List>
            <CustomLinkButton to="/">Home</CustomLinkButton>
            <CustomLinkButton to="/receivables">Receivables</CustomLinkButton>
            <CustomLinkButton to="/companies">Companies</CustomLinkButton>
            <CustomLinkButton to="/payroll_officers">Payroll Officers</CustomLinkButton>
            <CustomLinkButton to="/employees">Employees</CustomLinkButton>
            <CustomLinkButton to="/loans">Loans</CustomLinkButton>  
            <Divider />
            <LogoutButton />
        </List>
    )
}

function PayrollList () {
    return (
        <List>
            <CustomLinkButton to="/">Home</CustomLinkButton>
            <CustomLinkButton to="/receivables">Receivables</CustomLinkButton>
            <CustomLinkButton to="/employees">Employees</CustomLinkButton>
            <CustomLinkButton to="/loans">Loans</CustomLinkButton>
            <Divider />
            <LogoutButton />
        </List>
    )
}

function EmployeeList(){
    return (
        <List>
            <CustomLinkButton to="/">Home</CustomLinkButton>
            <CustomLinkButton to="/loans">Loans</CustomLinkButton>
            <Divider />
            <LogoutButton />
        </List>
    )
}

function UnconfirmedList() {
    return (
        <List>
            <CustomLinkButton to="/">Home</CustomLinkButton>
            <CustomLinkButton to="/confirm">Confirm</CustomLinkButton>
            <Divider />
            <LogoutButton />
        </List>
    )
}

function LoggedOutList() {
    return (
        <List>
            <CustomLinkButton to="/">Home</CustomLinkButton>
            <CustomLinkButton to="/login">Login</CustomLinkButton>
            <CustomLinkButton to="/signup">Signup</CustomLinkButton>
        </List>
    )
}


async function logout() {
    await http.get('sanctum/csrf-cookie').then(async () => {
        await http.post('/api/logout').then(() => {
            usePageStore.setState({
                role: null,
                isLoggedIn: false,
                user: null
            })
        })
    })
}

export default LeftSection;