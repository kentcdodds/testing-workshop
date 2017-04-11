// WORKSHOP_START
// Let's make sure that users can login to the app!
//
// Here's a high level overview of what to do...
// 1. Create a mock user object
// 2. Bring in axios (which will actually be our mock)
//    and mock the post implementation with
//    mockImplementation on the instance
//    (you can get it from axiosMock.__mock.instance.post)
//    You'll want to simulate the response that our backend
//    is giving for the login route. Find that in:
//    /api/src/routes/api/users.js
//    The /api/src/models/user.js file will also be helpful.
// 3. Render the Login form with blank state
// 4. Find the email and password fields and set their
//    node values to the values for your mocked user.
// 5. Simulate a submit on the rendered form
// 6. Use `flushAllPromises` from utils to force all
//    promises to resolve
// 7. Assert that post was called only once on the
//    axios instance and assert that it was called
//    correctly
// 8. Assert that localStorage was called once and
//    was called correctly.
//
// Remember that there are some helpers you can
// get to render the <Login /> with predefined state.
// WORKSHOP_END
// FINAL_START
import React from 'react'
import axiosMock from 'axios'
// FINAL_END
// WORKSHOP_START
// eslint-disable-next-line no-unused-vars
// WORKSHOP_END
import Login from '../../src/screens/login'
// FINAL_START
import {renderWithState, sel, flushAllPromises} from './helpers/utils'

// FINAL_END
// WORKSHOP_START
// Note that this test function is set to be async
// Just a little tip ;-)
// WORKSHOP_END
test('logs in when the form is submitted', async () => {
  // FINAL_START
  const token = 'Luke, I am your father'
  const user = {password: 'my-password', email: 'me@example.com'}
  axiosMock.__mock.instance.post.mockImplementation(() => {
    return Promise.resolve({data: {user: {token}}})
  })

  const {wrapper} = renderWithState({}, <Login />)
  wrapper.find(sel('email')).node.value = user.email
  wrapper.find(sel('password')).node.value = user.password
  wrapper.find('form').simulate('submit')
  await flushAllPromises()
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledTimes(1)
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledWith('/users/login', {
    user,
  })
  expect(window.localStorage.setItem).toHaveBeenCalledTimes(1)
  expect(window.localStorage.setItem).toHaveBeenCalledWith('jwt', token)
  // FINAL_END
})
