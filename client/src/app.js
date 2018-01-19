import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import * as api from './api'

class RenderPromise extends React.Component {
  initialState = {result: null, error: null, pending: false}
  state = this.initialState
  _isMounted = false
  reset(overrides) {
    const newState = {...this.initialState, ...overrides}
    if (this._isMounted) {
      this.setState(newState)
    }
    return newState
  }
  componentDidMount() {
    this._isMounted = true
    if (!this.props.lazy) {
      this.invoke()
    }
  }
  componentWillUnmount() {
    this._isMounted = false
  }
  invoke = (...args) => {
    this.setState({pending: true})
    return this.props
      .fn(...args)
      .then(
        result => this.reset({result}),
        error => Promise.reject(this.reset({error}))
      )
  }
  render() {
    return this.props.render({
      ...this.state,
      invoke: this.invoke,
    })
  }
}

function Home() {
  return (
    <div>
      <RenderPromise
        fn={() => Promise.all([api.users.get(), api.posts.get()])}
        render={({pending, error, result}) =>
          pending ? (
            'loading'
          ) : error ? (
            'error'
          ) : result ? (
            <div>
              <Timeline users={result[0].users} posts={result[1].posts} />
            </div>
          ) : null
        }
      />
    </div>
  )
}

// eslint-disable-next-line no-shadow
function Timeline({users, posts = []}) {
  return (
    <div>
      {posts.map(t => (
        <Post
          key={t.id}
          post={t}
          author={users.find(u => u.id === t.authorId)}
        />
      ))}
    </div>
  )
}

function Post({post: {title, content, tags}, author}) {
  return (
    <div>
      <h2>{title}</h2>
      <div>{content}</div>
      <div>{tags.map(t => <span key={t}>{t}</span>)}</div>
      <div>by {author.username}</div>
    </div>
  )
}

function Login({onSubmit}) {
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          const {username, password} = e.target.elements
          onSubmit({
            username: username.value,
            password: password.value,
          })
        }}
      >
        <div>
          <label>
            username <input name="username" />
          </label>
        </div>
        <div>
          <label>
            password <input type="password" name="password" />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

class Editor extends Component {
  handleSubmit = e => {
    e.preventDefault()
    const {title, content, tags} = e.target.elements
    const newPost = {
      title: title.value,
      content: content.value,
      tags: tags.value.split(',').map(t => t.trim()),
      date: new Date().toISOString(),
      authorId: this.props.user.id,
    }
    api.posts.create(newPost).then(() => {
      this.props.history.push('/')
    })
  }
  render() {
    const {match} = this.props
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              Title <input name="title" />
            </label>
          </div>
          <div>
            <label>
              Content <textarea name="content" />
            </label>
          </div>
          <div>
            <label>
              Tags: <input name="tags" />
            </label>
          </div>
          <button type="submit">submit</button>
        </form>
        Editor<pre>{JSON.stringify(match, null, 2)}</pre>
      </div>
    )
  }
}

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
                    <span>{user.username}</span>
                    <button onClick={logout}>Logout</button>
                    <Link to="/editor">Add new Post</Link>
                  </div>
                ) : (
                  <div>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
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
