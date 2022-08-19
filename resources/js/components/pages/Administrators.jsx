import React, { useEffect } from 'react'

import { usePageStore } from '../stateman'

const Administrators = () => {
    const { page } = usePageStore();
    useEffect(() => {
        usePageStore.setState({
            page: 'Administrators'
        })
    }, [])
    return <div>{page}</div>
}

export default Administrators