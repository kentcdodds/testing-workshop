import {userToJSON} from '../auth'
import db from '../db'

function setupMiscRoutes(router) {
  router.get('/all', async (req, res) => {
    const [users, posts] = await Promise.all([db.getUsers(), db.getPosts()])
    if (users) {
      res.json({
        users: users.map(u => userToJSON(u)),
        posts,
      })
    } else {
      res.status(404).send()
    }
  })
}

export default setupMiscRoutes
