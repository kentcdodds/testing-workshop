// Normally you shouldn't need to break your tests up this much.
// Normally I'd just have a file called `auth` and have all my tests
// in that file. But I've split them up like this to make the workshop
// flow nicer with the demo and exercises.

// This is the demo (meant to be written by the instructor)...
// Hi instructor 👋

describe('authentication', () => {
  //////// Elaboration & Feedback /////////
  // When you've finished with the exercises:
  // 1. Copy the URL below into your browser and fill out the form
  // 2. remove the `.skip` from the test below
  // 3. Change submitted from `false` to `true`
  // 4. And you're all done!
  /*
  http://ws.kcd.im/?ws=Testing&e=e2e%20register&em=
  */
  it.skip('I submitted my elaboration and feedback', () => {
    const submitted = false // change this when you've submitted!
    expect(submitted).toBe(true)
  })
  ////////////////////////////////
})
