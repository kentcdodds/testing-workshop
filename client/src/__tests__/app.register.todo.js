// Hi! This is for the instructor :)
// add a beforeEach for cleaning up state and intitializing the API

test('register a new user', async () => {
  // render the app with the router provider and custom history
  //
  // wait for /me request to settle
  //
  // navigate to register by clicking register-link
  //
  // fill out the form
  //
  // submit form
  // first use the axiosMock.__mock.instance
  // to mock out the post implementation
  // it should return the fake user + a token
  // which you can generate with generate.token(fakeUser)
  // Now simulate a submit event on the form
  //
  // wait for promises to settle
  //
  // assert post was called correctly
  // assert localStorage is correct
  // assert the user was redirected (window.location.href)
  // assert the username display is the fake user's username
  // assert the logout button exists
})
