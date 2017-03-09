import React from 'react'
import axiosMock from 'axios'
import Login from '../../src/screens/login'
import renderWithState from './helpers/render-with-redux'

const flushAllPromises = () => new Promise(resolve => setImmediate(resolve))

test('logs in when the form is submitted', async () => {
  const token = 'Luke, I am your father'
  const user = {password: 'my-password', email: 'me@example.com'}
  axiosMock.__mock.instance.post.mockImplementation(() => {
    return Promise.resolve({data: {user: {token}}})
  })

  const {wrapper} = renderWithState({}, <Login />)
  wrapper.find('input[type="email"]').node.value = user.email
  wrapper.find('input[type="password"]').node.value = user.password
  wrapper.find('form').simulate('submit')
  await flushAllPromises()
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledTimes(1)
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledWith('/users/login', {
    user,
  })
  expect(window.localStorage.setItem).toHaveBeenCalledTimes(1)
  expect(window.localStorage.setItem).toHaveBeenCalledWith('jwt', token)
})

/*
<Route path="/" component={App}>
  <IndexRoute component={Home} />
  <Route path="login" component={Login} />
  <Route path="register" component={Register} />
  <Route path="editor" component={Editor} />
  <Route path="editor/:slug" component={Editor} />
  <Route path="article/:id" component={Article} />
  <Route path="settings" component={Settings} />
  <Route path="@:username" component={ConnectedProfile} />
  <Route path="@:username/favorites" component={ProfileFavorites} />
</Route>
 */
