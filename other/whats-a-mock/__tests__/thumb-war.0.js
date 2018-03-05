import thumbWar from '../thumb-war'

test('returns winner', () => {
  const winner = thumbWar('Ken Wheeler', 'Kent C. Dodds')
  expect(['Ken Wheeler', 'Kent C. Dodds'].includes(winner)).toBe(true)
})
