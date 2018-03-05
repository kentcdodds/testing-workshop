import thumbWar from '../thumb-war'
import * as utils from '../utils'

test('returns winner', () => {
  const originalGetWinner = utils.getWinner
  // eslint-disable-next-line import/namespace
  utils.getWinner = jest.fn((p1, p2) => p2)

  const winner = thumbWar('Ken Wheeler', 'Kent C. Dodds')
  expect(winner).toBe('Kent C. Dodds')
  expect(utils.getWinner).toHaveBeenCalledTimes(2)
  utils.getWinner.mock.calls.forEach(args => {
    expect(args).toEqual(['Ken Wheeler', 'Kent C. Dodds'])
  })

  // eslint-disable-next-line import/namespace
  utils.getWinner = originalGetWinner
})
