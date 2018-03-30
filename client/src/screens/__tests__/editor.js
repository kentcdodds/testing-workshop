import React from 'react'
import {generate, render, Simulate, wait} from 'til-client-test-utils'
import Editor from '../editor'

test('calls onSubmit with the username and password when submitted', async () => {
  // Arrange
  const fakeUser = generate.userData({id: generate.id()})
  const fakePost = generate.postData({authorId: fakeUser.id})
  const fakeHistory = {push: jest.fn()}
  const fakeApi = {
    posts: {
      create: jest.fn(() => Promise.resolve()),
    },
  }
  const {container, getByText, getByLabelText} = render(
    <Editor api={fakeApi} user={fakeUser} history={fakeHistory} />,
  )

  getByLabelText('Title').value = fakePost.title
  getByLabelText('Content').value = fakePost.content
  getByLabelText('Tags').value = fakePost.tags.join(', ')
  const submitButtonNode = getByText('submit')
  const formNode = container.querySelector('form')
  const preDate = Date.now()

  // Act
  Simulate.submit(formNode)

  // Assert
  expect(fakeApi.posts.create).toHaveBeenCalledTimes(1)
  expect(fakeApi.posts.create).toHaveBeenCalledWith({
    ...fakePost,
    date: expect.any(String),
  })

  const postDate = Date.now()
  await wait(() => expect(fakeHistory.push).toHaveBeenCalledTimes(1))
  expect(fakeHistory.push).toHaveBeenCalledWith('/')
  const date = new Date(fakeApi.posts.create.mock.calls[0][0].date).getTime()
  expect(date).toBeGreaterThanOrEqual(preDate)
  expect(date).toBeLessThanOrEqual(postDate)
  expect(submitButtonNode.type).toBe('submit')
})

test('snapshot', () => {
  const {container} = render(<Editor />)
  expect(container.firstChild).toMatchSnapshot()
})
