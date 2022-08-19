import React, { useEffect } from 'react'
import { usePageStore } from '../stateman'

const Signup = () => {
    const { page } = usePageStore();
    useEffect(() => {
        usePageStore.setState({
            page: 'Signup'
        })
    }, [])
    return <div>{page}</div>
}

export default Signup