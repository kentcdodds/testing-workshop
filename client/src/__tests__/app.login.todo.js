// add a beforeEach for cleaning up state and intitializing the API

test('login as an existing user', async () => {
  // 🐨 render the app with the router provider and custom history
  // 💰 const utils = renderWithRouter(<App />)
  //
  // 🐨 wait for the app to finish loading the mocked requests
  // 💰 await utils.finishLoading()
  //
  // 🐨 navigate to login by clicking login-link
  // 💰 the link has text that matches /login/i
  // 💰 when you fireEvent.click on the login link, react-router will ignore
  // the click unless it's a "left click" which is based on the `button`
  // property. So as a second argument to `fireEvent.click`, pass `{button: 0}`
  //
  // 🐨 assert that window.location.href contains 'login'
  //
  // 🐨 fill out the form
  // 💰 generate.loginForm()
  // 💰 get the username and password fields and set their values
  //
  // Now we need to prepare our axios mock to handle the form submission properly:
  // use the axiosMock.__mock.instance
  // to mock out the post implementation
  // it should return the fake user + a token
  // which you can generate with generate.token(fakeUser)
  // 💰 you may want to look at the final version for this one...
  //
  // 🐨 submit form by clicking on the submit button
  //
  // 🐨 wait for the mocked requests to finish
  // 💰 await utils.finishLoading()
  //
  // 🐨 now make some assertions:
  // assert post was called correctly
  // assert localStorage is correct
  // assert the user was redirected (window.location.href)
  // assert the username display is the fake user's username
  // assert the logout button exists
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=app.login&em=
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
