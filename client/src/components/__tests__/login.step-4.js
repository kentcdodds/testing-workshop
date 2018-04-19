import React from 'react'
import {generate} from 'til-client-test-utils'
import {render, renderIntoDocument, cleanup} from 'react-testing-library'
import Login from '../login'

afterEach(cleanup)

test('calls onSubmit with the username and password when submitted', () => {
  // Arrange
  const fakeUser = generate.loginForm()
  const handleSubmit = jest.fn()
  const {getByLabelText, getByText} = renderIntoDocument(
    <Login onSubmit={handleSubmit} />,
  )

  const usernameNode = getByLabelText('username')
  const passwordNode = getByLabelText('password')

  // Act
  usernameNode.value = fakeUser.username
  passwordNode.value = fakeUser.password
  getByText('submit').click()

  // Assert
  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith(fakeUser)
})

test('snapshot', () => {
  // note that we don't need to render this into the document so we'll just
  // use a regular `render` here.
  const {container} = render(<Login />)
  // note that we're snapshotting the firstChild rather than the container.
  // That's just because the container will always be the same. A div.
  // So no reason to include that in the snapshot.
  expect(container.firstChild).toMatchSnapshot()
})
