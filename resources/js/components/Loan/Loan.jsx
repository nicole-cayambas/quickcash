import React from 'react';
import axios from 'axios';


class Loan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loan: {}
    }
  }

  componentDidMount() {
    axios.get('/api/loans/1') // + this.props.match.params.id
      .then(res => {
        this.setState({
          loan: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })


  }

  render() {
    return (
      <div>
        <h1>Loan</h1>
        {this.state.loan.id} : {this.state.loan.amount}
      </div>
    )
  }
}

export default Loan;

