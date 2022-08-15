import React from 'react'
import axios from 'axios'

export default function() {
    const [loans, setLoans] = React.useState([])

    //get all loans
    React.useEffect(() => {
        axios.get('/api/loans')
            .then(res => {
                setLoans(JSON.parse("[" + JSON.stringify(res.data) + "]"))
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    const items = [];
    loans.forEach(loan => {
        items.push(
            <tr key={loan.id.toString()}>
                <td>{loan.amount}</td>
                <td>{loan.amortizations}</td>
            </tr>
        )
    })

    return (
        <div>
            <h1>Loans</h1>
            <table>
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Amortizations</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>
        </div>
    )
}