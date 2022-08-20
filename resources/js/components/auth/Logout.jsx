import React from 'react'
import { useNavigate } from 'react-router-dom'
import http from '../http'
import { usePageStore } from '../stateman'

export async function Logout() {
    await http.get('sanctum/csrf-cookie').then(async () => {
        await http.post('/api/logout').then(() => {
            usePageStore.setState({
                isLoggedIn: false,
            })
        })
    })
}