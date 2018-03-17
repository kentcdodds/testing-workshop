/*
 * This is a simple unit test for a function component.
 * These are quite easy to test generally.
 */

import React from 'react'
import {generate, render, Simulate, flushAllPromises} from 'client-test-utils'
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

  // Act
  Simulate.submit(formNode)

  await flushAllPromises()

  // Assert
  expect(fakeApi.posts.create).toHaveBeenCalledTimes(1)
  expect(fakeApi.posts.create).toHaveBeenCalledWith({
    ...fakePost,
    // TODO: fix this
    content: expect.any(String),
    date: expect.any(String),
  })
  expect(submitButtonNode.type).toBe('submit')
})
