import thumbWar from '../thumb-war'

jest.mock('../utils', () => {
  return {
    getWinner: (p1, p2) => p2,
  }
})

test('returns winner', () => {
  const winner = thumbWar('Ken Wheeler', 'Kent C. Dodds')
  expect(winner).toBe('Kent C. Dodds')
})
