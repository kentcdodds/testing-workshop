import React, {PropTypes, Component} from 'react'
import store from './customers'

class CustomerList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      customers: props.store.getCustomers(),
    }
  }
  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(
      this.updateStateWithCustomers,
    )
  }
  componentWillUnmount() {
    this.unsubscribe()
  }

  updateStateWithCustomers = () => {
    const customers = this.props.store.getCustomers()
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

CustomerList.defaultProps = {store}

CustomerList.propTypes = {
  store: PropTypes.shape({
    getCustomers: PropTypes.func,
    subscribe: PropTypes.func,
  }),
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
