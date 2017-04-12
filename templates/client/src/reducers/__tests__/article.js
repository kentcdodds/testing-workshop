/* eslint no-unused-vars: 0, import/no-unresolved: 0 */
import article from '../article'

test('ARTICLE_PAGE_LOADED', () => {
  // WORKSHOP_START
  // TODO
  // WORKSHOP_END
  // FINAL_START
  const initialState = {}
  const articleData = {title: 'Mighty Mouse'}
  const comments = [1, 2, 3]
  const action = {
    type: 'ARTICLE_PAGE_LOADED',
    payload: [{article: articleData}, {comments}],
  }
  const result = article(initialState, action)
  expect(result).toEqual({
    article: articleData,
    comments,
  })
  // FINAL_END
})

test('ARTICLE_PAGE_UNLOADED', () => {
  // WORKSHOP_START
  // TODO
  // WORKSHOP_END
  // FINAL_START
  const initialState = {}
  const action = {type: 'ARTICLE_PAGE_UNLOADED'}
  const result = article(initialState, action)
  expect(result).toEqual({})
  // FINAL_END
})

test('ADD_COMMENT', () => {
  // WORKSHOP_START
  // TODO
  // WORKSHOP_END
  // FINAL_START
  const initialState = {comments: [1, 2, 3]}
  const action = {type: 'ADD_COMMENT', payload: {comment: 4}}
  const result = article(initialState, action)
  expect(result).toEqual({
    commentErrors: null,
    comments: [1, 2, 3, 4],
  })
  // FINAL_END
})

test('non-matching type', () => {
  // WORKSHOP_START
  // TODO
  // WORKSHOP_END
  // FINAL_START
  const initialState = {randomThing: 'blah'}
  const action = {type: 'random_action'}
  const result = article(initialState, action)
  expect(result).toEqual(initialState)
  // FINAL_END
})
