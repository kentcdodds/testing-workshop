import React, {Component} from 'react'
import glamorous from 'glamorous.macro'
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

const PostContainer = glamorous.div({
  background: 'white',
  marginBottom: 20,
  padding: '30px 50px',
  borderRadius: '50px',
  boxShadow: 'var(--shadow)',
})

const PostTitle = glamorous.h2({
  color: 'var(--green)',
})

const PostSeparator = glamorous.hr({
  border: 0,
  borderRadius: 10,
  height: 5,
  width: 30,
  margin: '0 0 10px 0',
  background: 'var(--green)',
})

const Tag = glamorous.span({
  background: 'var(--green)',
  color: 'white',
  padding: 5,
  marginRight: 5,
  borderRadius: 5,
})
function Post({post: {title, content, tags}, author = {username: 'unknown'}}) {
  return (
    <PostContainer>
      <PostTitle>{title}</PostTitle>
      <h4>by {author.username}</h4>
      <PostSeparator />
      <p>{content}</p>
      <div>{tags.map(t => <Tag key={t}>{t}</Tag>)}</div>
    </PostContainer>
  )
}

export default Home
