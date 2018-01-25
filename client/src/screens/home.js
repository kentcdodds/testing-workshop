import React, {Component} from 'react'
import * as api from '../utils/api'

class RenderPromise extends Component {
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
        error => Promise.reject(this.reset({error})),
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

export default Home
