// FINAL_START
import sum from '../sum'
// FINAL_END
// WORKSHOP_START
// Let's test drive summing numbers
test('todo!', () => {})
// WORKSHOP_END
// FINAL_START
test('returns 0 when given no arguments', () => {
  const result = sum()
  expect(result).toBe(0)
})

test('returns the number when given a number', () => {
  const input = 3
  const result = sum(input)
  expect(result).toBe(input)
})

test('returns the sum of all numbers given', () => {
  const result = sum(3, 4, 5, 6)
  expect(result).toBe(18)
})
// FINAL_END
