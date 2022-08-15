import React from 'react'
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Moment from 'moment'

class Loans extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loans: []
        }
    }
    componentDidMount() {
      const user = JSON.parse(localStorage.getItem('user'))
      const headers = {
        accept: 'application/json',
        authorization: `Bearer ${user.token}`
      }
        axios.get('/api/loans', {
            headers: headers
        })
            .then(res => {
                this.setState({
                    loans: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }



    render() { 
        Moment.locale('en')
        function createData(id, amount, loan_date, amortizations, percentage, total_interest_rate) {
          return { id, amount, loan_date, amortizations, percentage, total_interest_rate };
        }

        const rows = []
        this.state.loans.forEach(loan => {
            rows.push(createData(loan.id, loan.amount, loan.loan_date, loan.amortizations, loan.percentage, loan.total_interest_rate))
        })

        return (
            <div>
            <h1>Loans</h1>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Loan Date</TableCell>
                    <TableCell align="right">Amortizations</TableCell>
                    <TableCell align="right">Percentage</TableCell>
                    <TableCell align="right">Total Interest Rate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">&#8369; {row.amount}</TableCell>
                      <TableCell align="right">{Moment(row.loan_date).format('d MMM YYYY')}</TableCell>
                      <TableCell align="right">{row.amortizations}</TableCell>
                      <TableCell align="right">{row.percentage}%</TableCell>
                      <TableCell align="right">{row.total_interest_rate}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </div>
        )
    }
}

export default Loans;
