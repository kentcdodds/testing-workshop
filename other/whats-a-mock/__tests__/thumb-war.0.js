import thumbWar from '../thumb-war'

test('returns winner', () => {
  const winner = thumbWar('Ken Wheeler', 'Kent C. Dodds')
  expect(typeof winner).toBe('string')
})
