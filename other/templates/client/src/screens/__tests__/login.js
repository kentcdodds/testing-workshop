// FINAL_START
import React from 'react'
import {mount} from 'enzyme'
// FINAL_END
import {Component as Login} from '../login'

test('renders login form by default', () => {
  // WORKSHOP_START
  // TODO
  // WORKSHOP_END
  // FINAL_START
  const wrapper = render()
  expect(isSubmitButtonDisabled(wrapper)).toBe(false)
  // FINAL_END
})

test('disabled button when inProgress', () => {
  // WORKSHOP_START
  // TODO
  // WORKSHOP_END
  // FINAL_START
  const wrapper = render({inProgress: true})
  expect(isSubmitButtonDisabled(wrapper)).toBe(true)
  // FINAL_END
})

test('shows list of errors when there are errors', () => {
  // WORKSHOP_START
  // TODO
  // WORKSHOP_END
  // FINAL_START
  const wrapper = render({
    errors: {
      'some-error': 'there was some error',
      'some-other-error': 'there was some other error',
    },
  })
  expect(getErrors(wrapper)).toEqual([
    'some-error there was some error',
    'some-other-error there was some other error',
  ])
  // FINAL_END
})

// FINAL_START
function render(props = {}) {
  const propsToUse = {
    onSubmit() {},
    onUnload() {},
    inProgress: false,
    errors: {},
    ...props,
  }
  return mount(<Login {...propsToUse} />)
}

function isSubmitButtonDisabled(wrapper) {
  const button = getSubmitButton(wrapper).getNode()
  return button.disabled
}

function getSubmitButton(wrapper) {
  return wrapper.find('button[type="submit"]')
}

function getErrors(wrapper) {
  return Array.from(wrapper.find('.error-messages li').getNodes()).map(
    n => n.textContent,
  )
}
// FINAL_END

// WORKSHOP_START
//////// Elaboration & Feedback /////////
/*
http://ws.kcd.im/?ws=Testing&e=Client%20Unit%20React&em=
*/
test('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(true).toBe(submitted)
})
////////////////////////////////
// WORKSHOP_END
// FINAL_START
test('I submitted my elaboration and feedback', () => {
  const submitted = true
  expect(true).toBe(submitted)
})
// FINAL_END

//////// EXTRA CREDIT ////////

// If you get this far, try adding a few more tests,
// then file a pull request to add them as extra credit!
// Learn more here: http://kcd.im/testing-workshop-contributing
