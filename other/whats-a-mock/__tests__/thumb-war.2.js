import thumbWar from '../thumb-war'
// remove the next line
import * as utils from '../utils'

// remove the next line
const originalGetWinner = utils.getWinner

// add an inline mock with the jest.mock API
//
// jest.mock(
//   relativePathToModuleToMock,
//   functionThatReturnsMockObject
// )
//
// See hint below

test('returns winner', () => {
  // remove the next 2 lines
  // eslint-disable-next-line import/namespace
  utils.getWinner = (p1, p2) => p2

  const winner = thumbWar('Ken Wheeler', 'Kent C. Dodds')
  expect(winner).toBe('Kent C. Dodds')

  // remove the next 2 lines
  // eslint-disable-next-line import/namespace
  utils.getWinner = originalGetWinner
})

/*
Hint below:














































jest.mock('../utils', () => {
  return {
    // ...
    // see answer in the solution file
  }
})

 */
