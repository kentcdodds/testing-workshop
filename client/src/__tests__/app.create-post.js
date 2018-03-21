/*
 * This is an example of integration tests for the client
 * They're still fairly react-specific, but less-so than
 * the unit tests. They are also quite longer than
 * unit tests. They cover more code than the unit tests
 * per test.
 */

import React from 'react'
import {Simulate} from 'react-dom/test-utils'
import axiosMock from 'axios'
import {renderWithRouter, flushPromises, generate} from 'client-test-utils'
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

  const {queryByTestId} = renderWithRouter(<App />)

  // wait for /me request to settle
  await flushPromises()
  axiosMock.__mock.reset()

  // navigate to register
  const leftClick = {button: 0}
  Simulate.click(queryByTestId('create-post-link'), leftClick)
  expect(window.location.href).toContain('editor')

  // fill out form
  const fakePost = {
    title: 'post title',
    content: 'this is some content',
    tags: ['tag1', 'tag2'],
    authorId: fakeUser.id,
    date: new Date().toJSON(),
  }
  const titleNode = queryByTestId('title-input')
  const contentNode = queryByTestId('content-input')
  const tagsNode = queryByTestId('tags-input')
  const formWrapper = queryByTestId('editor-form')
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
  Simulate.submit(formWrapper)

  // assert calls
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledTimes(1)
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledWith('/posts', {
    ...fakePost,
    // TODO: make this more resiliant
    date: expect.any(String),
  })

  // wait for promises to settle
  await flushPromises()

  expect(window.location.href).not.toContain('editor')

  // we could mock out the request to get the /posts as well
  // but maybe we'll do that in another test...
})

/* eslint max-statements:0 */
