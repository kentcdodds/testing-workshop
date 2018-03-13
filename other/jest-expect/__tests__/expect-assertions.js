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
