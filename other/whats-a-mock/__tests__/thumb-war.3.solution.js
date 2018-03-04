import thumbWar from '../thumb-war'

jest.mock('../utils')

test('returns winner', () => {
  const winner = thumbWar('Ken Wheeler', 'Kent C. Dodds')
  expect(winner).toBe('Kent C. Dodds')
})
