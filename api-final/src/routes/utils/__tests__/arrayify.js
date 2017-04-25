import arrayify from '../arrayify'

test('arrayify returns an empty array when given nothing', () => {
  const result = arrayify()
  expect(result).toEqual([])
})

test(`arrayify returns the array-ed version of what it's given`, () => {
  const input = 'hi there'
  const result = arrayify(input)
  expect(result).toEqual([input])
})

test(`arrayify returns the array if it's given an array`, () => {
  const input = [1, 2, 3]
  const result = arrayify(input)
  expect(result).toEqual(input)
})

test('I submitted my elaboration and feedback', () => {
  const submitted = true
  expect(true).toBe(submitted)
})
