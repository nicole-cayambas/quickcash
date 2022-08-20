import React, { useEffect } from 'react'

import { usePageStore } from '../stateman'


const Home = () => {
    const { isLoggedIn, user } = usePageStore()
    const email_verified_at = user ? user.email_verified_at : null
    useEffect(() => {
        usePageStore.setState({
            page: 'Home',
        })
    }, [])
    if(!isLoggedIn) return <div>You need to login.</div>
    else if(!email_verified_at) return <div>Please confirm your email.</div>
    else return <h1>Home</h1>
}

export default Home