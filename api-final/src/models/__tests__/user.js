import mongoose from 'mongoose'
import {getUserConstructor, generateUser} from './helpers/utils'


test('can generate profile JSON', () => {
  const user = generateUser()
  const profileJSON = user.toProfileJSONFor()
  const expected = {
    username: user.username,
    bio: user.bio,
    image: user.image,
    following: false,
  }
  expect(profileJSON).toEqual(expected)
})

test('I submitted my elaboration and feedback', () => {
  const submitted = true
  expect(true).toBe(submitted)
})

// Here are a bunch of other tests you can look at if you want :)
test('can create a new empty user', () => {
  const User = getUserConstructor()
  const user = new User()
  expect(user.toJSON()).toEqual({
    _id: expect.any(mongoose.Types.ObjectId),
    following: [],
    favorites: [],
  })
})

test('can validate passwords', () => {
  const password = 'help me Obi-Wan Kenobi'
  const badPassword = 'help me Qui-Gon Jinn'
  const user = generateUser()
  user.setPassword(password)
  expect(user.validPassword(password)).toBe(true)
  expect(user.validPassword(badPassword)).toBe(false)
})

test('can generate auth JSON', () => {
  const user = generateUser()
  const authJSON = user.toAuthJSON()
  const expected = {
    username: user.username,
    email: user.email,
    bio: user.bio,
    image: user.image,
    token: expect.stringMatching(/.*\..*\..*/),
  }
  expect(authJSON).toEqual(expected)
})

test('shows the user as following based on the given user', () => {
  const user = generateUser()
  const followingUser = generateUser({
    following: [user._id],
  })
  const profileJSON = user.toProfileJSONFor(followingUser)
  expect(profileJSON.following).toBe(true)
})

test('can favorite an article', () => {
  const user = generateUser()
  const articleId = mongoose.Types.ObjectId()
  user.favorite(articleId)
  expect(user.save).toHaveBeenCalledTimes(1)
  expect(user.favorites).toContain(articleId)
})

test('does not double favorite an article', () => {
  const user = generateUser({favorites: []})
  const articleId = mongoose.Types.ObjectId()
  user.favorite(articleId)
  user.favorite(articleId)
  expect(user.save).toHaveBeenCalledTimes(2)
  expect(user.toJSON().favorites).toEqual([articleId])
})

test('can unfavorite an article', () => {
  const articleId = mongoose.Types.ObjectId()
  const user = generateUser({
    favorites: [articleId],
  })
  user.unfavorite(articleId)
  expect(user.save).toHaveBeenCalledTimes(1)
  expect(user.favorites).not.toContain(articleId)
})

test('can verify whether an article is favorited', () => {
  const favorite = mongoose.Types.ObjectId()
  const notFavorite = mongoose.Types.ObjectId()
  const user = generateUser({
    favorites: [favorite],
  })
  expect(user.isFavorite(favorite)).toBe(true)
  expect(user.isFavorite(notFavorite)).toBe(false)
})

test('can follow a user', () => {
  const user = generateUser()
  const userId = mongoose.Types.ObjectId()
  user.follow(userId)
  expect(user.save).toHaveBeenCalledTimes(1)
  expect(user.following).toContain(userId)
})

test('can unfollow a user', () => {
  const userId = mongoose.Types.ObjectId()
  const user = generateUser({
    following: [userId],
  })
  user.unfollow(userId)
  expect(user.save).toHaveBeenCalledTimes(1)
  expect(user.following).not.toContain(userId)
})

test('does not double follow a user', () => {
  const user = generateUser({following: []})
  const userId = mongoose.Types.ObjectId()
  user.follow(userId)
  user.follow(userId)
  expect(user.save).toHaveBeenCalledTimes(2)
  expect(user.toJSON().following).toEqual([userId])
})

test('can verify whether a user is following another', () => {
  const following = mongoose.Types.ObjectId()
  const notFollowing = mongoose.Types.ObjectId()
  const user = generateUser({
    following: [following],
  })
  expect(user.isFollowing(following)).toBe(true)
  expect(user.isFollowing(notFollowing)).toBe(false)
})
