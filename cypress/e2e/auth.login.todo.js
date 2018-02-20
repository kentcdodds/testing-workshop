// Normally you shouldn't need to break your tests up this much.
// Normally I'd just have a file called `auth` and have all my tests
// in that file. But I've split them up like this to make the workshop
// flow nicer with the demo and exercises.
// eslint-disable-next-line
import {createNewUser, logout, assertRoute} from '../utils'

describe('authentication', () => {
  beforeEach(() => logout())

  it('should allow existing users to login', () => {
    // you'll want to first create a new user.
    // This returns a promise, so you can do:
    // createNewUser().then(user => {
    //   cy commands
    // })
    //
    // With the user created, go ahead and use the cy commands to:
    // 1. visit the app: visitApp
    // 2. Click the login link
    // 3. type the user's username in the username field
    // 4. type the user's password in the password field
    // 5. submit the form by clicking the submit button
    //
    // Finally assert the route changed to '/'
    // and verify that the display name contains user.username
  })
})
