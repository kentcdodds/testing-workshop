import React, {Component} from 'react'
import styled from 'react-emotion'
import * as api from '../utils/api'
import Loading from '../components/loading'

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
            <Loading />
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

function Timeline({users = [], posts = []}) {
  return (
    <div>
      {posts
        .sort(sortByLatest)
        .map(p => (
          <Post
            key={p.id}
            post={p}
            author={users.find(u => u.id === p.authorId)}
          />
        ))}
    </div>
  )
}

function sortByLatest(p1, p2) {
  return p1.date > p2.date ? -1 : 1
}

const PostContainer = styled('div')({
  background: 'white',
  marginBottom: 20,
  padding: '30px 50px',
  borderRadius: '50px',
  boxShadow: 'var(--shadow)',
})

const PostTitle = styled('h2')({
  color: 'var(--green)',
})

const PostSeparator = styled('hr')({
  border: 0,
  borderRadius: 10,
  height: 5,
  width: 30,
  margin: '0 0 10px 0',
  background: 'var(--green)',
})

const Tag = styled('span')({
  background: 'var(--green)',
  color: 'white',
  padding: 5,
  marginRight: 5,
  borderRadius: 5,
})
function Post({post: {title, content, tags}, author = {username: 'unknown'}}) {
  return (
    <PostContainer>
      <PostTitle data-testid="post-title">{title}</PostTitle>
      <h4 data-testid="post-author-username">by {author.username}</h4>
      <PostSeparator />
      <p data-testid="post-content">{content}</p>
      <div>
        {tags.map((t, i) => (
          <Tag key={t} data-testid={`post-tag-${i}`}>
            {t}
          </Tag>
        ))}
      </div>
    </PostContainer>
  )
}

export default Home
