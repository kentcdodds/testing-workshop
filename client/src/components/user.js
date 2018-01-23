import React from 'react'
import * as api from '../utils/api'

class User extends React.Component {
  initialState = {user: null, error: null, pending: false}
  state = this.initialState
  reset(overrides) {
    const newState = {...this.initialState, ...overrides}
    this.setState(newState)
    return newState
  }
  componentDidMount() {
    this.reset({pending: true})
    return api.auth
      .me()
      .then(
        ({user}) => this.reset({user}),
        error => Promise.reject(this.reset({error}))
      )
  }
  login = (...args) => {
    this.reset({pending: true})
    return api.auth
      .login(...args)
      .then(
        ({user}) => this.reset({user}),
        error => Promise.reject(this.reset({error}))
      )
  }
  logout = (...args) => {
    this.reset({pending: true})
    return api.auth
      .logout(...args)
      .catch(() => this.reset(), error => Promise.reject(this.reset({error})))
      .finally(() => this.reset())
  }
  register = (...args) => {
    this.reset({pending: true})
    return api.auth
      .register(...args)
      .then(
        ({user}) => this.reset({user}),
        error => Promise.reject(this.reset({error}))
      )
  }
  render() {
    return this.props.render({
      ...this.state,
      login: this.login,
      logout: this.logout,
      register: this.register,
    })
  }
}

export default User
