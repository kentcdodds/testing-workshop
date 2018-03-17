const React = require('react')
const ReactDOM = require('react-dom')
const renderer = require('react-test-renderer')
const {getFlyingSuperHeros} = require('../super-heros')
/*
Find a full list of assertions here: https://facebook.github.io/jest/docs/en/expect.html
*/

test('toBe', () => {
  // similar to ===
  expect(1).toBe(1)
  expect(true).toBe(true)
  expect({}).not.toBe({})
})

test('toEqual', () => {
  // like `lodash.isEqual`: https://lodash.com/docs/4.17.4#isEqual
  const subject = {a: {b: 'c'}, d: 'e'}
  const actual = {a: {b: 'c'}, d: 'e'}
  expect(subject).toEqual(actual)

  const subArray = [1, 2, {three: 'four', five: {six: 7}}]
  const actArray = [1, 2, {three: 'four', five: {six: 7}}]
  expect(subArray).toEqual(actArray)
})

test('toMatchObject', () => {
  // similar to `toEqual`, but for partial equality
  const subject = {a: {b: 'c'}, d: 'e'}
  const actual = {a: {b: 'c'}}
  expect(subject).toMatchObject(actual)

  const subArray = [1, 2, {three: 'four', five: {six: 7}}]
  const actArray = [1, 2, {five: {six: 7}}]
  expect(subArray).toMatchObject(actArray)
})

test('toHaveBeenCalledTimes', () => {
  const mockFn = jest.fn()
  expect(mockFn).toHaveBeenCalledTimes(0)

  mockFn()
  expect(mockFn).toHaveBeenCalledTimes(1)
})

test('toHaveBeenCalledWith', () => {
  const mockFn = jest.fn()
  mockFn('abc', {oneTwoThree: 123})
  // NOTE: uses toEqual (not toBe) on each arg
  expect(mockFn).toHaveBeenCalledWith('abc', {oneTwoThree: 123})
})

test('toBeGreaterThan', () => {
  expect(10).toBeGreaterThan(3)
  expect(10).not.toBeGreaterThan(10)
  expect(10).toBeGreaterThanOrEqual(10)
})

test('toBeFalsy/Truthy', () => {
  expect(false).toBeFalsy()
  expect(true).toBeTruthy()
  expect(null).toBeFalsy()
  expect(undefined).toBeFalsy()
  expect(1).toBeTruthy()
  expect(0).toBeFalsy()
})

test('toEqual, toMatchObject, and toHaveBeenCalledWith matching a schema', () => {
  const birthday = {
    day: 18,
    month: 10,
    year: 1988,
    meta: {display: 'Oct 18th, 1988'},
  }
  const schema = {
    day: expect.any(Number),
    month: expect.any(Number),
    year: expect.any(Number),
    meta: {display: expect.stringContaining('1988')},
    // there's also expect.arrayContaining, or expect.objectContaining
  }
  expect(birthday).toEqual(schema)
})

test('mock functions', () => {
  const myFn = jest.fn()
  myFn('first', {second: 'val'})

  const calls = myFn.mock.calls
  const firstCall = calls[0]
  const firstArg = firstCall[0]
  const secondArg = firstCall[1]
  // could also do this on a single line
  // const [[firstArg, secondArg]] = myFn.mock.calls

  expect(firstArg).toBe('first')
  expect(secondArg).toEqual({second: 'val'})
})

// there are other ways to make mock functions/spies
// we'll cover those later.

/*

Snapshot tests below. We'll cover these later














 */

test('manual "snapshot"', () => {
  const flyingHeros = getFlyingSuperHeros()
  expect(flyingHeros).toEqual([
    {name: 'Dynaguy', powers: ['disintegration ray', 'fly']},
    {name: 'Apogee', powers: ['gravity control', 'fly']},
  ])
})

test('automatic snapshot', () => {
  const flyingHeros = getFlyingSuperHeros()
  expect(flyingHeros).toMatchSnapshot()
})

test('snapshot examples', () => {
  const object = {
    mixedArray: [1, [2, 3], {four: 5, six: [7, 8]}],
    regex: /do-not-try-to-regex-an-email/,
    date: new Date('1988-10-18'),
    error: new Error('some error'),
    someFunction: () => {},
    symbol: Symbol('symbol description'),
    set: new Set([1, 2, 3]),
    map: new Map([[{}, []], [[], {}]]),
    // and more!
  }
  expect(object).toMatchSnapshot()

  // AND DOM NODES!!!
  const div = document.createElement('div')
  const title = '<h2 class="title">Super Heros are great!</h2>'
  const content =
    '<p class="content">We can each be a super hero for someone</p>'
  div.innerHTML = `<section>${title}${content}</section>`
  expect(div).toMatchSnapshot('title of a snapshot!')

  // And react elements!
  const onClick = () => {}
  const element = React.createElement('button', {onClick}, 'Hello World')
  expect(element).toMatchSnapshot('react element')

  // and rendered elements
  const rendered = renderer.create(element)
  expect(rendered).toMatchSnapshot('rendered')

  // and DOM nodes rendered via react
  const app = document.createElement('div')
  ReactDOM.render(element, app)
  expect(app).toMatchSnapshot('react-dom')
})
