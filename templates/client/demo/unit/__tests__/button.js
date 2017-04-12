// FINAL_START
import React from 'react'
import {mount} from 'enzyme'
import {mountToJson} from 'enzyme-to-json'
import Button from '../button'

test('styles the button with a background of the context color', () => {
  const wrapper = mount(<Button>Click Me</Button>, {
    context: {color: 'blue'},
  })
  expect(mountToJson(wrapper)).toMatchSnapshot()
})
// FINAL_END
// WORKSHOP_START
test('todo', () => {})
// WORKSHOP_END
