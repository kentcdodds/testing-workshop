import thumbWar from '../thumb-war'
import * as utils from '../utils'

const originalGetWinner = utils.getWinner

test('returns winner', () => {
  // eslint-disable-next-line import/namespace
  utils.getWinner = (p1, p2) => p2

  const winner = thumbWar('Ken Wheeler', 'Kent C. Dodds')
  expect(winner).toBe('Kent C. Dodds')

  // eslint-disable-next-line import/namespace
  utils.getWinner = originalGetWinner
})
