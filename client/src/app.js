import React from 'react'
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import User from './components/user'
import Login from './components/login'
import Home from './screens/home'
import Editor from './screens/editor'

function App() {
  return (
    <User
      render={({user, error, pending, login, logout, register}) =>
        pending ? (
          <div>Loading...</div>
        ) : (
          <Router>
            <div>
              {error ? (
                <pre>{JSON.stringify(error.response, null, 2)}</pre>
              ) : null}
              <h1>
                <Link to="/">Today I Learned</Link>
              </h1>
              <small>
                Inspired by{' '}
                <a href="https://til.hashrocket.com/">til.hashrocket.com</a>
              </small>
              <div>
                {user ? (
                  <div>
                    <span data-test="username-display">{user.username}</span>
                    <button onClick={logout}>Logout</button>
                    <Link to="/editor">Add new Post</Link>
                  </div>
                ) : (
                  <div>
                    <Link to="/login" data-test="login-link">
                      Login
                    </Link>
                    <Link to="/register" data-test="register-link">
                      Register
                    </Link>
                  </div>
                )}
              </div>

              <hr />

              <Route exact path="/" component={Home} />

              {user ? (
                <Route
                  path="/editor/:postId?"
                  render={props => <Editor user={user} {...props} />}
                />
              ) : null}
              <React.Fragment>
                <Route
                  path="/login"
                  render={() =>
                    user ? <Redirect to="/" /> : <Login onSubmit={login} />
                  }
                />
                <Route
                  path="/register"
                  render={() =>
                    user ? <Redirect to="/" /> : <Login onSubmit={register} />
                  }
                />
              </React.Fragment>
            </div>
          </Router>
        )
      }
    />
  )
}

export default App
