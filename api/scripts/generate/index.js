/* eslint no-process-exit:0 */
import mongoose from 'mongoose'
import chalk from 'chalk'
import getUserSchema from '../../src/models/user'
import getArticleSchema from '../../src/models/article'
import getCommentSchema from '../../src/models/comment'
import generateDocumentObjects from './all'

// use native promises
mongoose.Promise = Promise

const User = mongoose.model('User', getUserSchema())
const Article = mongoose.model('Article', getArticleSchema())
const Comment = mongoose.model('Comment', getCommentSchema())

let connectPromise
if (process.env.MONGODB_URI) {
  connectPromise = mongoose.connect(process.env.MONGODB_URI)
} else {
  connectPromise = mongoose.connect('mongodb://localhost/conduit')
}

connectPromise
  .then(
    () => {
      console.log('connected. dropping everything')
      return mongoose.connection.db.dropDatabase()
    },
    error => {
      console.error('Problem connecting to mongo')
      console.error(error)
      process.exit(1)
    },
  )
  .then(() => {
    console.log('database dropped. Generating and inserting new documents...')
    const firstUser = {
      email: 'joe@example.com',
      username: 'joe',
      password: 'joe',
    }
    const {users, articles, comments} = generateDocumentObjects(firstUser)
    return Promise.all([
      User.insertMany(users),
      Article.insertMany(articles),
      Comment.insertMany(comments),
    ])
  })
  .then(
    ([users, articles, comments]) => {
      console.log(chalk.bgGreen.white.bold('operation successful'))
      console.log(
        chalk.green.bold(
          `inserted ${users.length} users, ` +
            `${articles.length} articles, ` +
            `and ${comments.length} comments`,
        ),
      )
      setTimeout(
        () => {
          process.exit(0)
        },
        5000,
      )
    },
    error => {
      console.error('there was an error inserting things!')
      console.error(error)
      process.exit(1)
    },
  )
