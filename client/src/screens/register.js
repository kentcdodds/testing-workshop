import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import agent from '../shared/agent'
import ListErrors from '../shared/components/list-errors'

const mapStateToProps = state => ({...state.auth})

const mapDispatchToProps = dispatch => ({
  onSubmit: (username, email, password) => {
    const payload = agent.Auth.register(username, email, password)
    dispatch({type: 'REGISTER', payload})
  },
  onUnload: () => dispatch({type: 'REGISTER_PAGE_UNLOADED'}),
})

class Register extends React.Component {
  submitForm = ev => {
    ev.preventDefault()
    this.props.onSubmit(
      this._username.value,
      this._email.value,
      this._password.value,
    )
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  render() {
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign Up</h1>
              <p className="text-xs-center">
                <Link to="/login">
                  Have an account?
                </Link>
              </p>

              <ListErrors errors={this.props.errors} />

              <form onSubmit={this.submitForm}>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Username"
                      ref={node => this._username = node}
                      data-test="username"
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      ref={node => this._email = node}
                      data-test="email"
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      ref={node => this._password = node}
                      data-test="password"
                    />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={this.props.inProgress}
                  >
                    Sign in
                  </button>

                </fieldset>
              </form>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
