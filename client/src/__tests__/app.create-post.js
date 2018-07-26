/*
 * This is an example of integration tests for the client
 * They're still fairly react-specific, but less-so than
 * the unit tests. They are also quite longer than
 * unit tests. They cover more code than the unit tests
 * per test.
 */

import React from 'react'
import axiosMock from 'axios'
import {renderWithRouter, fireEvent, generate} from 'til-client-test-utils'
import {init as initAPI} from '../utils/api'
import App from '../app'

beforeEach(() => {
  window.localStorage.removeItem('token')
  axiosMock.__mock.reset()
  initAPI()
})

test('create post', async () => {
  // setup things to simulate being logged in
  const {get, post} = axiosMock.__mock.instance
  const fakeToken = 'my.fake.token'
  window.localStorage.setItem('token', fakeToken)
  initAPI()
  const fakeUser = {
    username: generate.username(),
    id: generate.id(),
    token: fakeToken,
  }
  get.mockImplementation(url => {
    if (url === '/auth/me') {
      return Promise.resolve({data: {user: fakeUser}})
    } else if (url === '/users') {
      return Promise.resolve({data: {users: [fakeUser]}})
    } else if (url === '/posts') {
      return Promise.resolve({data: {posts: []}})
    } else {
      throw new Error(`Unexpected request to ${url}`)
    }
  })

  const {
    container,
    getByText,
    getByLabelText,
    finishLoading,
  } = renderWithRouter(<App />)

  // wait for the app to finish loading the mocked requests
  await finishLoading()
  axiosMock.__mock.reset()

  // navigate to register
  const leftClick = {button: 0}
  fireEvent.click(getByText(/^\+$/), leftClick)
  expect(window.location.href).toContain('editor')

  // fill out form
  const fakePost = {
    title: 'post title',
    content: 'this is some content',
    tags: ['tag1', 'tag2'],
    authorId: fakeUser.id,
    date: new Date().toJSON(),
  }
  const titleNode = getByLabelText(/title/i)
  const contentNode = getByLabelText(/content/i)
  const tagsNode = getByLabelText(/tags/i)
  const formWrapper = container.querySelector('form')
  titleNode.value = fakePost.title
  contentNode.value = fakePost.content
  tagsNode.value = fakePost.tags.join(',')

  // submit form
  const fakeId = generate.id()
  post.mockImplementationOnce(() =>
    Promise.resolve({
      data: {post: {...post, id: fakeId}},
    }),
  )
  fireEvent.submit(formWrapper)

  // assert calls
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledTimes(1)
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledWith('/posts', {
    ...fakePost,
    // TODO: make this more resiliant
    date: expect.any(String),
  })

  // wait for the mocked requests to finish
  await finishLoading()

  expect(window.location.href).not.toContain('editor')

  // we could mock out the request to get the /posts as well
  // but maybe we'll do that in another test...
})
