import React from 'react'
import {mount} from 'enzyme'
import {Component as Login} from '../login'

test('renders login form by default', () => {
  const wrapper = render()
  expect(isSubmitButtonDisabled(wrapper)).toBe(false)
})

test('disabled button when inProgress', () => {
  const wrapper = render({inProgress: true})
  expect(isSubmitButtonDisabled(wrapper)).toBe(true)
})

test('shows list of errors when there are errors', () => {
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
})

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
