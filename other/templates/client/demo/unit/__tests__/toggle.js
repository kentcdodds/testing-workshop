// FINAL_START
import React from 'react'
import {render, mount} from 'enzyme'
import Toggle from '../toggle'

test('has toggle--off class applied by default', () => {
  const wrapper = renderToggle()
  expect(wrapper).toMatchSnapshotWithGlamor()
})

test('has toggle--on class applied when initialToggledOn: true', () => {
  const wrapper = renderToggle({initialToggledOn: true})
  expect(wrapper).toMatchSnapshotWithGlamor()
})

test('invokes the onToggle prop when clicked', () => {
  const onToggle = jest.fn()
  const wrapper = mountToggle({onToggle})
  clickButton(wrapper)
  expect(onToggle).toHaveBeenCalledTimes(1)
  expect(onToggle).toBeCalledWith(true)
})

/**
 * Uses enzyme to mount the Toggle component
 * @param {Object} props - the props to mount the component with
 * @return {Object} - the enzyme wrapper
 */
function mountToggle(props = {}) {
  return mount(<Toggle onToggle={() => {}} children="Toggle Me" {...props} />)
}

/**
 * Uses enzyme to render the Toggle component
 * @param {Object} props - the props to render the component with
 * @return {Object} - the enzyme wrapper
 */
function renderToggle(props = {}) {
  return render(<Toggle onToggle={() => {}} children="Toggle Me" {...props} />)
}

/**
 * finds the button in the given wrapper and simulates a click event
 * @param {Object} wrapper - the enzyme wrapper
 */
function clickButton(wrapper) {
  wrapper.find(sel('button')).simulate('click')
}

// this helper will make it easier for you to find
// labeled elements in the wrapper:
// const tagInput = wrapper.find(sel('tags'))
function sel(id) {
  return `[data-test="${id}"]`
}

// FINAL_END
// WORKSHOP_START
test('todo', () => {})
// WORKSHOP_END
