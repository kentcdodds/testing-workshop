import React from 'react'
import {generate, wait, cleanup, fireEvent, render} from 'til-client-test-utils'
import Editor from '../editor'

afterEach(cleanup)

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
  const {getByText, getByLabelText} = render(
    <Editor api={fakeApi} user={fakeUser} history={fakeHistory} />,
  )

  getByLabelText('Title').value = fakePost.title
  getByLabelText('Content').value = fakePost.content
  getByLabelText('Tags').value = fakePost.tags.join(', ')
  const preDate = Date.now()

  // Act
  fireEvent.click(getByText(/submit/i))

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
})

test('snapshot', () => {
  const {container} = render(<Editor />)
  expect(container).toMatchSnapshot()
})
