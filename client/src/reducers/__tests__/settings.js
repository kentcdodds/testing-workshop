import settings from '../settings'

test('SETTINGS_SAVED', () => {
  const initialState = {}
  const action = {type: 'SETTINGS_SAVED'}
  const result = settings(initialState, action)
  expect(result).toEqual({inProgress: false, errors: null})
})

test('SETTINGS_SAVED with errors', () => {
  const initialState = {}
  const errors = [{}]
  const action = {type: 'SETTINGS_SAVED', error: true, payload: {errors}}
  const result = settings(initialState, action)
  expect(result).toEqual({inProgress: false, errors})
})

test('SETTINGS_PAGE_UNLOADED', () => {
  const initialState = {}
  const action = {type: 'SETTINGS_PAGE_UNLOADED'}
  const result = settings(initialState, action)
  expect(result).toEqual({})
})

test('ASYNC_START', () => {
  const initialState = {}
  const action = {type: 'ASYNC_START'}
  const result = settings(initialState, action)
  expect(result).toEqual({inProgress: true})
})

test('non-matching type', () => {
  const initialState = {randomThing: 'blah'}
  const action = {type: 'random_action'}
  const result = settings(initialState, action)
  expect(result).toEqual(initialState)
})
