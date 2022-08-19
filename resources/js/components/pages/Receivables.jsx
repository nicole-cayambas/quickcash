import React, { useEffect } from 'react'

import { usePageStore } from '../stateman'

const Receivables = () => {
    const { page } = usePageStore();
    useEffect(() => {
        usePageStore.setState({
            page: 'Receivables'
        })
    }, [])
    return <div>{page}</div>
}

export default Receivables