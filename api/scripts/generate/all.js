import _ from 'lodash'
import createUser from './user'
import createArticle from './article'
import createComment from './comment'

export default generateDocumentObjects

function generateDocumentObjects(firstUser) {
  const users = [createUser(firstUser), ..._.times(10, createUser)]
  const articles = []
  const comments = []
  users.forEach(user => {
    const followees = getRandomUsers(users)
    followees.forEach(followee => {
      if (followee !== user) {
        user.following.push(followee._id)
      }
    })

    const newArticles = _.times(_.random(0, 10), () => {
      const article = createArticle(user)
      const favoriters = getRandomUsers(users)
      favoriters.forEach(favoriter => favoriter.favorites.push(article._id))
      article.favoritesCount = favoriters.length
      return article
    })

    if (newArticles.length) {
      articles.push(...newArticles)
    }

    newArticles.forEach(article => {
      const newComments = _.times(_.random(0, 10), () => {
        const comment = createComment(article, _.sample(users))
        article.comments.push(comment._id)
        return comment
      })
      if (newComments.length) {
        comments.push(...newComments)
      }
    })
  })
  return {users, articles, comments}
}

function getRandomUsers(users) {
  return _.chain(users)
    .shuffle()
    .chunk(_.random(0, users.length))
    .head()
    .value() || []
}
