import React, { useEffect, useState } from 'react'
import { axios } from 'axios'

export default function() {
    const [loan, setLoan] = useState({});
    
    // const getLoan = () => {
        
    // }

    // handleSubmit = (e) => {
    //     axios.post('/api/loans', { loan })
    //     .then(function(response) {
    //         console.log(response)
    //     })
    //     .catch(function(error) {
    //         console.log(error)
    //     });
    //     e.preventDefault();
    // }

    // useEffect(() => {
    //     getLoan();
    // },[loans])
    return (
        <div>
            {/* <form onSubmit={handleSubmit}>
                <input type="text" value={loan.value} onChange={ setLoan(loan.value) } />
                <button>Send</button>
            </form> */}
        </div>
    )
}