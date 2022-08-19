import React, { useEffect } from 'react'

import { usePageStore } from '../stateman'

const PayrollOfficers = () => {
    const { page } = usePageStore();
    useEffect(() => {
        usePageStore.setState({
            page: 'PayrollOfficers'
        })
    }, [])
    return <div>{page}</div>
}

export default PayrollOfficers