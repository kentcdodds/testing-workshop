import express from 'express'
import db from '../db'

function setupUserRoutes(router) {
  router.get('/:id?', async (req, res) => {
    if (req.params.id) {
      res.json(await db.getUser(req.params.id))
    } else {
      res.json(await db.getUsers())
    }
  })

  router.post('/', async (req, res) => {
    // await db.insertUser()
  })

  router.put('/', async (req, res) => {
    // await db.updateUser()
  })

  router.delete('/:id', async (req, res) => {
    const deletedUser = await db.deleteUser(req.params.id)
    res.json(deletedUser)
  })
}

export default setupUserRoutes
