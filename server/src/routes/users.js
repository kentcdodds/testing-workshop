import express from 'express'
import db from '../db'

function setupUserRoutes(router) {
  router.get('/', async (req, res) => {
    const users = await db.getUsers()
    if (users) {
      res.json(users)
    } else {
      res.status(404).send()
    }
  })

  router.get('/:id', async (req, res) => {
    const user = await db.getUser(req.params.id)
    if (user) {
      res.json(user)
    } else {
      res.status(404).send()
    }
  })

  router.post('/', async (req, res) => {
    const user = await db.insertUser(req.body)
    if (user) {
      res.json(user)
    } else {
      res.status(404).send()
    }
  })

  router.put('/:id', async (req, res) => {
    const user = await db.updateUser(req.params.id, req.body)
    if (user) {
      res.json(user)
    } else {
      res.status(404).send()
    }
  })

  router.delete('/:id', async (req, res) => {
    const user = await db.deleteUser(req.params.id)
    if (user) {
      res.json(user)
    } else {
      res.status(404).send()
    }
  })
}

export default setupUserRoutes
