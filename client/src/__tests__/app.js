import React from 'react'
import axiosMock from 'axios'
// eslint-disable-next-line
import {mountWithRouter, flushAllPromises} from 'til-test-utils'
import {init as initAPI} from '../utils/api'
import App from '../app'

beforeEach(() => {
  window.localStorage.removeItem('jwt')
  axiosMock.__mock.reset()
})

test('register a new user', async () => {
  const {findNodeByTestId, wrapper} = mountWithRouter(<App />)

  // wait for /me request to settle
  await flushAllPromises()
  wrapper.update()

  // navigate to register
  const leftClick = {button: 0}
  findNodeByTestId('register-link').simulate('click', leftClick)
  expect(window.location.href).toContain('register')

  // fill out form
  const fakeUser = {username: 'barry', password: 'allen'}
  const usernameNode = findNodeByTestId('username-input').instance()
  const passwordNode = findNodeByTestId('password-input').instance()
  const formWrapper = findNodeByTestId('login-form')
  usernameNode.value = fakeUser.username
  passwordNode.value = fakeUser.password

  // submit form
  const {post} = axiosMock.__mock.instance
  const token = 'my-mock-token'
  post.mockImplementationOnce(() =>
    Promise.resolve({
      data: {user: {...fakeUser, token}},
    }),
  )
  formWrapper.simulate('submit')

  // assert calls
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledTimes(1)
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledWith(
    '/auth/register',
    fakeUser,
  )

  // wait for promises to settle
  await flushAllPromises()
  wrapper.update()

  // assert the state of the world
  expect(window.localStorage.getItem('jwt')).toBe(token)
  expect(window.location.href).not.toContain('register')
  expect(findNodeByTestId('username-display').text()).toEqual(fakeUser.username)
  expect(findNodeByTestId('logout-button').length).toBe(1)
})

test('login', async () => {
  const {findNodeByTestId, wrapper} = mountWithRouter(<App />)

  // wait for /me request to settle
  await flushAllPromises()
  wrapper.update()

  // navigate to register
  const leftClick = {button: 0}
  findNodeByTestId('login-link').simulate('click', leftClick)
  expect(window.location.href).toContain('login')

  // fill out form
  const fakeUser = {username: 'barry', password: 'allen'}
  const usernameNode = findNodeByTestId('username-input').instance()
  const passwordNode = findNodeByTestId('password-input').instance()
  const formWrapper = findNodeByTestId('login-form')
  usernameNode.value = fakeUser.username
  passwordNode.value = fakeUser.password

  // submit form
  const {post} = axiosMock.__mock.instance
  const token = 'my-mock-token'
  post.mockImplementationOnce(() =>
    Promise.resolve({
      data: {user: {...fakeUser, token}},
    }),
  )
  formWrapper.simulate('submit')

  // assert calls
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledTimes(1)
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledWith(
    '/auth/login',
    fakeUser,
  )

  // wait for promises to settle
  await flushAllPromises()
  wrapper.update()

  // assert the state of the world
  expect(window.localStorage.getItem('jwt')).toBe(token)
  expect(window.location.href).not.toContain('login')
  expect(findNodeByTestId('username-display').text()).toEqual(fakeUser.username)
  expect(findNodeByTestId('logout-button').length).toBe(1)
})

test('create post', async () => {
  // setup things to simulate being logged in
  const {get, post} = axiosMock.__mock.instance
  window.localStorage.setItem('jwt', 'my.fake.jwt')
  initAPI()
  const fakeUser = {username: 'barry', id: 'fake-user-id'}
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

  const {findNodeByTestId, wrapper} = mountWithRouter(<App />)

  // wait for /me request to settle
  await flushAllPromises()
  wrapper.update()
  axiosMock.__mock.reset()

  // navigate to register
  const leftClick = {button: 0}
  findNodeByTestId('create-post-link').simulate('click', leftClick)
  expect(window.location.href).toContain('editor')

  // fill out form
  const fakePost = {
    title: 'post title',
    content: 'this is some content',
    tags: ['tag1', 'tag2'],
    authorId: fakeUser.id,
    date: new Date().toJSON(),
  }
  const titleNode = findNodeByTestId('title-input').instance()
  const contentNode = findNodeByTestId('content-input').instance()
  const tagsNode = findNodeByTestId('tags-input').instance()
  const formWrapper = findNodeByTestId('editor-form')
  titleNode.value = fakePost.title
  contentNode.value = fakePost.content
  tagsNode.value = fakePost.tags.join(',')

  // submit form
  const fakeId = 'fake-id'
  post.mockImplementationOnce(() =>
    Promise.resolve({
      data: {post: {...post, id: fakeId}},
    }),
  )
  formWrapper.simulate('submit')

  // assert calls
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledTimes(1)
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledWith('/posts', {
    ...fakePost,
    // TODO: make this more resiliant
    date: expect.any(String),
  })

  // wait for promises to settle
  await flushAllPromises()
  wrapper.update()

  // assert the state of the world
  expect(window.location.href).not.toContain('editor')

  // we could mock out the request to get the /posts as well
  // but maybe we'll do that in another test...
})
