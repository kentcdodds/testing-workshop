import React, {Component} from 'react'
import PropTypes from 'prop-types'
import store from './customers'

class CustomerList extends Component {
  constructor(...args) {
    super(...args)
    this.state = {
      customers: store.getCustomers(),
    }
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(this.updateStateWithCustomers)
  }
  componentWillUnmount() {
    this.unsubscribe()
  }

  updateStateWithCustomers = () => {
    const customers = store.getCustomers()
    this.setState({customers})
  }

  render() {
    const {customers} = this.state
    if (customers.length === 0) {
      return <NoCustomers />
    } else {
      return <ListOfCustomers customers={customers} />
    }
  }
}

function ListOfCustomers({customers}) {
  return (
    <div>
      Here is your list of customers!
      <ul>
        {customers.map((c, i) => <li key={i}>{c.name}</li>)}
      </ul>
    </div>
  )
}

ListOfCustomers.propTypes = {
  customers: PropTypes.array,
}

function NoCustomers() {
  return (
    <div>
      You have no customers. Better get to work!
    </div>
  )
}

export default CustomerList
