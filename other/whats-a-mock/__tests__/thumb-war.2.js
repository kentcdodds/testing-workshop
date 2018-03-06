import thumbWar from '../thumb-war'
import * as utils from '../utils'

test('returns winner', () => {
  const originalGetWinner = utils.getWinner
  // change this to a jest mock function (Hint #1)
  // eslint-disable-next-line import/namespace
  utils.getWinner = (...args) => {
    utils.getWinner.mock.calls.push(args)
    return args[1]
  }
  utils.getWinner.mock = {calls: []}

  const winner = thumbWar('Ken Wheeler', 'Kent C. Dodds')
  expect(winner).toBe('Kent C. Dodds')
  // change this to the built-in jest assertion for how many times a mock
  // function was called (use toHaveBeenCalledTimes) (Hint #2)
  expect(utils.getWinner.mock.calls).toHaveLength(2)
  utils.getWinner.mock.calls.forEach(args => {
    expect(args).toEqual(['Ken Wheeler', 'Kent C. Dodds'])
  })

  // eslint-disable-next-line import/namespace
  utils.getWinner = originalGetWinner
})

/*
Hints below




















































Hint #1:

You can create a jest mock function with `jest.fn()`:

const myMockFunction = jest.fn((greeting, name) => `${greeting} ${name}`)
myMockFunction('Hey', 'Joe') // returns 'Hey Joe'


Jest keeps track of mock function metadata the same way we did (via myMockFunction.mock.calls)


Hint #2:

You can assert the number of times called with:

expect(myMockFunction).toHaveBeenCalledTimes(1)



 */
