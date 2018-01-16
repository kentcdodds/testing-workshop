import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'

const users = []
const posts = []

// swap this for holen
class Fetch extends Component {
  state = {error: false, fetching: false, data: null}
  fetch = () => {
    // TODO: make this fetch from an API
    Promise.resolve().then(() =>
      this.setState({error: false, fetching: false, data: this.props.mockData})
    )
  }
  componentDidMount() {
    this.fetch()
  }
  render() {
    return this.props.children({
      ...this.state,
      fetch: this.fetch,
    })
  }
}

function Home() {
  return (
    <div>
      <Fetch mockData={{users, posts}}>
        {({fetching, error, data}) =>
          fetching ? (
            'loading'
          ) : error ? (
            'error'
          ) : data ? (
            <div>
              <Timeline {...data} />
            </div>
          ) : null
        }
      </Fetch>
    </div>
  )
}

// eslint-disable-next-line no-shadow
function Timeline({users, posts}) {
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
    console.log(newPost)
    this.props.history.push('/')
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

class App extends Component {
  state = {user: {username: 'kentcdodds', id: 'kentcdodds'}}
  handleLoginSubmit = ({username, password: _password}) => {
    this.setState({user: users.find(u => username === u.username)})
  }
  handleLogoutClick = () => this.setState({user: null})
  render() {
    const {user} = this.state
    return (
      <Router>
        <div>
          <h1>
            <Link to="/">Today I Learned</Link>
          </h1>
          <small>
            Inspired by{' '}
            <a href="https://post.hashrocket.com/">post.hashrocket.com</a>
          </small>
          <div>
            {user ? (
              <div>
                <span>{user.username}</span>
                <button onClick={this.handleLogoutClick}>Logout</button>
                <Link to="/editor">Add new Post</Link>
              </div>
            ) : (
              <Link to="/login">Login</Link>
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
          <Route
            path="/login"
            render={() =>
              user ? (
                <Redirect to="/" />
              ) : (
                <Login onSubmit={this.handleLoginSubmit} />
              )
            }
          />
        </div>
      </Router>
    )
  }
}

export default App
