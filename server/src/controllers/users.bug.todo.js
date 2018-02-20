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
    // There's a bug here 🐛
    // You might appreciate the userToJSON function
    // we're importing from utils/auth :)
    return res.json({users})
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

async function deleteUser(req, res) {
  if (!req.user || req.user.id !== req.params.id) {
    return res.status(403).send()
  }
  const user = await db.getUser(req.params.id)
  if (!user) {
    return res.status(404).send()
  }
  const deletedUser = await db.deleteUser(req.params.id)
  return res.json({user: userToJSON(deletedUser)})
}

export {getUsers, getUser, updateUser, deleteUser, authorize}
