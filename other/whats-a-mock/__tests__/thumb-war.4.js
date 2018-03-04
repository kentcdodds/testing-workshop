import thumbWar from '../thumb-war'

// remove the inline mock function and jest
// will use the one that exists in the
// __mocks__ directory which I created for you
// already (you're welcome)
jest.mock('../utils', () => {
  return {
    getWinner: (p1, p2) => p2,
  }
})

test('returns winner', () => {
  const winner = thumbWar('Ken Wheeler', 'Kent C. Dodds')
  expect(winner).toBe('Kent C. Dodds')
})

/*
Hint below




































jest.mock('../utils')




 */
