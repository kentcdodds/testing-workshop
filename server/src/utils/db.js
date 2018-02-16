import * as generate from 'til-shared/generate'

const db = {
  users: [],
  posts: [],

  insertUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,

  insertPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
}

async function insertUser(user) {
  const newUser = {
    ...user,
    id: generate.id(),
  }
  db.users.push(newUser)
  return newUser
}

async function getUsers(filter) {
  return filter ? db.users.filter(filter) : [...db.users]
}

async function getUser(id) {
  return (await getUsers(u => u.id === id))[0]
}

async function updateUser(id, newInfo) {
  const user = await getUser(id)
  // doing this to make a new copy of the user to avoid subtle bugs
  // that rely on mutation.
  const newUserWithUpdates = Object.assign({}, user, newInfo)
  db.users[db.users.indexOf(user)] = newUserWithUpdates
  return newUserWithUpdates
}

async function deleteUser(id) {
  const user = await getUser(id)
  db.users = db.users.filter(u => u.id !== id)
  return user
}

async function insertPost(post) {
  const newPost = {
    ...post,
    id: generate.id(),
  }
  db.posts.push(newPost)
  return newPost
}

async function getPosts(filter) {
  return filter ? db.posts.filter(filter) : [...db.posts]
}

async function getPost(id) {
  return (await getPosts(t => t.id === id))[0]
}

async function updatePost(id, newInfo) {
  const post = await getPost(id)
  // doing this to make a new copy of the user to avoid subtle bugs
  // that rely on mutation.
  const newPostWithUpdates = Object.assign({}, post, newInfo)
  db.posts[db.posts.indexOf(post)] = newPostWithUpdates
  return newPostWithUpdates
}

async function deletePost(id) {
  const post = await getPost(id)
  db.posts = db.posts.filter(t => t.id !== id)
  return post
}

export default db
