import React, { useEffect } from 'react'

import { usePageStore } from '../stateman'
// import User from '../auth/user'
import { isLoggedIn } from '../auth/auth'


const Home = () => {
    useEffect(() => {
        usePageStore.setState({
            page: 'Home',
        })
    }, [])
    if(isLoggedIn()) { 
        return (
            <h1>Home</h1>
        )
    } else  {
        return <div>You're not logged in</div>
    }
}

export default Home