import {getFormattedValue} from '../utils'

test('adds missing .0', () => {
  expect(getFormattedValue('1234.0')).toBe('1,234.0')
})
