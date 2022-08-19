import React, { useEffect } from 'react'
import axios from 'axios'
import { isLoggedIn, logOut } from './auth'

export const Logout = () => {
    if(isLoggedIn()) {
        axios.post('/api/logout').then(res => {
            logOut()
        }).catch(err => {
            console.log(err)
        })
    }
}