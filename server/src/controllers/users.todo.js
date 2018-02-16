import {userToJSON, getUserToken} from '../utils/auth'
import db from '../utils/db'

function authorize(req, res, next) {
  if (req.user.id === req.params.id) {
    return next()
  } else {
    return res.status(403).send()
  }
}

async function getUsers(req, res) {
  const users = await db.getUsers()
  if (users) {
    return res.json({users: users.map(u => userToJSON(u))})
  } else {
    return res.status(404).send()
  }
}

async function getUser(req, res) {
  const user = await db.getUser(req.params.id)
  if (user) {
    return res.json({
      user: {
        ...userToJSON(user),
        token:
          req.user && req.user.id === req.params.id
            ? getUserToken(user)
            : undefined,
      },
    })
  } else {
    return res.status(404).send()
  }
}

async function updateUser(req, res) {
  if (!req.user || req.user.id !== req.params.id) {
    return res.status(403).send()
  }
  const user = await db.updateUser(req.params.id, req.body)
  if (user) {
    return res.json({user: userToJSON(user)})
  } else {
    return res.status(404).send()
  }
}

// Here's where you'll add your deleteUser function!
// 1. If the req.user.id does not match the req.param.id then send a 403
// 2. Get the user from the DB. If that doesn't exist, send a 404
// 3. Delete the user
// 4. Send the user back (use userToJSON)
// Don't forget! It needs to be an async function, and you need to add it to the list of exports below.

export {getUsers, getUser, updateUser, authorize}
