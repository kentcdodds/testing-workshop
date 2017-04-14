// FINAL_START
import React from 'react'
import {mount} from 'enzyme'
// FINAL_END
import {Component as Editor} from '../editor'

// default case
test('renders editor form by default', () => {
  // WORKSHOP_START
  // TODO
  // WORKSHOP_END
  // FINAL_START
  const wrapper = render()
  expect(wrapper).toMatchSnapshot()
  // FINAL_END
})

// testing props
test('renders the given title', () => {
  // WORKSHOP_START
  // TODO
  // WORKSHOP_END
  // FINAL_START
  const title = 'The day I dualed Lord Voldemort'
  const wrapper = render({title})
  expect(wrapper.find(sel('title')).node.value).toBe(title)
  // FINAL_END
})

// testing user input
test('adds tag when the user hits enter', () => {
  // WORKSHOP_START
  // TODO
  // WORKSHOP_END
  // FINAL_START
  const newTag = 'interwebs'
  const tagList = ['internet', 'web', 'network']
  const wrapper = render({tagList})
  const tagInput = wrapper.find(sel('tags'))
  changeInputValue(tagInput, newTag)
  keyUpInput(tagInput, 13)
  const tagPills = wrapper.find(sel('tag-pills'))
  expect(tagPills.children()).toHaveLength(4)
  expect(tagPills.find(`[data-tag="${newTag}"]`)).toHaveLength(1)
  // FINAL_END
})

// This component doesn't make any subscriptions to test
// data input and we don't use context directly in this
// component so we have no test for that (and you wont
// often need to) but those are the only two other things
// you need to test with React!

// FINAL_START
function render(props = {}) {
  const propsToUse = {
    onLoad() {},
    onSubmit() {},
    onUnload() {},
    articleSlug: '',
    title: '',
    description: '',
    body: '',
    tagList: [],
    inProgress: false,
    params: {},
    ...props,
  }
  return mount(<Editor {...propsToUse} />)
}

function changeInputValue(input, value) {
  input.simulate('change', {target: {value}})
}

function keyUpInput(input, keyCode) {
  input.simulate('keyup', {keyCode})
}

function sel(id) {
  return `[data-test="${id}"]`
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
