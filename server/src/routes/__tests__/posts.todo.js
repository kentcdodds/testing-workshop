// You need to write tests that cover the posts API endpoints.
// Feel free to create how ever many you want.
//
// Here are a few things to know:
// 1. `jest.unmock('axios')` to use the right version of axios.
// 2. Create an async beforeAll. Use it to await starting the
//    server with any port you want, then you can create two
//    axios instances, (api, and authAPI).
// 3. Add an afterAll that closes the server to avoid a memory leak.
// 4. Add an async beforeEach that generates a new user with
//    `generate.userData({id: generate.id()})` then reset the
//    database with `await resetDb({testUser})`, then create a user
//    token with `getUserToken` and use that to set the authorization
//    header with: authAPI.defaults.headers.common.authorization = `Bearer ${token}`
// 5. Write tests that verify CRUD operations of posts
//
// A good first test is a GET to the posts endpoint. That should
// return to you all the posts in the mockData.posts that you get
// back from the resetDb call.
//
// Then you could write a general CRUD test:
// 1. Create:
//   a. use generate.postData({authorId: testUser.id})
//   b. send a POST to the posts endpoint, that'll give you a test post
//   c. verify the returned post matches the data you generated
// 2. Read:
//   a. send a GET to the posts/:id endpoint with your test post's ID
//   b. verify the post that came back is the same as your test post
// 3. Update:
//   a. create a new title with `generate.title()`
//   b. send a POST request to the posts/:id endpoint with your test post's ID and an updates object
//   c. that should give you back an updated post, verify that has the updated title
// 4. Delete:
//   a. send a DELETE request to the posts/:id endpoint with your test post's ID
//   b. verify the returned post matches your test post
//   c. Attempt to make a GET request to read the post and ensure that request fails with a 404 status code

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=users%20integration&em=
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
