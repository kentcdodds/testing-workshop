// you're going to need to start the server before all the tests
// start and close the server after all the tests are finished.
// startServer is a function that returns a promise which resolves
// to the server object. The server object has a `close` function
// which accepts a callback. Kinda wonky, I know... But you should
// learn how to use both async styles with these tests sooo... :)
// eslint-disable-next-line no-unused-vars
import startServer from '../../src/start-server'
// pulling this in for you. Hint, you'll want it for at least one
// of the tests :)
// eslint-disable-next-line no-unused-vars
import {generateArticleForClient} from '../../../other/generate/article'
// from here you're pretty much on your own.
// Tip: create a ./helpers/api-client where you can have
//   some of the logic for dealing with articles and users
//   (because you'll need to perform basic CRUD and it's
//   nice to avoid that cruft in your tests)

describe('unauthorized', () => {
  test('get with limit', async () => {
    // TODO
  })

  test('get with offset', async () => {
    // TODO
  })
})

describe('authorized', () => {
  // // TODO
  // tip: you're going to need to create a new user
  //   for these tests and set up the API client to
  //   use that user's token. You can look at the
  //   API client in the client application to see
  //   how this is done: client/src/shared/agent.js

  test('post a new article', async () => {
    // TODO
  })

  test('update an article', async () => {
    // TODO
  })

  test('delete an article', async () => {
    // TODO
  })
})

//////// Elaboration & Feedback /////////
/*
http://ws.kcd.im/?ws=Testing&e=API%20Integration&em=
*/
test('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(true).toBe(submitted)
})
////////////////////////////////

//////// EXTRA CREDIT ////////

// If you get this far, try adding a few more tests,
// then file a pull request to add them as extra credit!
// Learn more here: http://kcd.im/testing-workshop-contributing
