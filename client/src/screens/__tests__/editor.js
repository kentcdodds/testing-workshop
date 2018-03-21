import React from 'react'
import {generate, render, Simulate, flushPromises} from 'client-test-utils'
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
  const {queryByTestId} = render(
    <Editor api={fakeApi} user={fakeUser} history={fakeHistory} />,
  )

  queryByTestId('title-input').value = fakePost.title
  queryByTestId('content-input').value = fakePost.content
  queryByTestId('tags-input').value = fakePost.tags.join(', ')
  const submitButtonNode = queryByTestId('editor-submit')
  const formNode = queryByTestId('editor-form')
  const preDate = Date.now()

  // Act
  Simulate.submit(formNode)

  const postDate = Date.now()
  await flushPromises()

  // Assert
  expect(fakeApi.posts.create).toHaveBeenCalledTimes(1)
  expect(fakeApi.posts.create).toHaveBeenCalledWith({
    ...fakePost,
    date: expect.any(String),
  })
  const date = new Date(fakeApi.posts.create.mock.calls[0][0].date).getTime()
  expect(date).toBeGreaterThanOrEqual(preDate)
  expect(date).toBeLessThanOrEqual(postDate)
  expect(submitButtonNode.type).toBe('submit')
})

test('snapshot', () => {
  const {container} = render(<Editor />)
  expect(container.firstChild).toMatchSnapshot()
})
