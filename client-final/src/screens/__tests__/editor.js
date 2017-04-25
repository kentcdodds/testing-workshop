import React from 'react'
import {mount} from 'enzyme'
import {Component as Editor} from '../editor'

test('renders editor form by default', () => {
  const wrapper = mountEditor()
  expect(wrapper).toMatchSnapshot()
})

test('renders the given title', () => {
  const title = 'The day I dualed Lord Voldemort'
  const wrapper = mountEditor({title})
  expect(wrapper.find(sel('title')).node.value).toBe(title)
})

test('adds tag when the user hits enter', () => {
  const newTag = 'interwebs'
  const tagList = ['internet', 'web', 'network']
  const wrapper = mountEditor({tagList})
  const tagInput = wrapper.find(sel('tags'))
  changeInputValue(tagInput, newTag)
  keyUpInput(tagInput, 13)
  const tagPills = wrapper.find(sel('tag-pills'))
  expect(tagPills.children()).toHaveLength(4)
  expect(tagPills.find(sel(`tag-3-${newTag}`))).toHaveLength(1)
})

function mountEditor(props = {}) {
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

// This helper will make it easier to change the value
// in an input element. For example:
// changeInputValue(tagInput, 'hello')
// will change the input's value to 'hello'
function changeInputValue(input, value) {
  input.simulate('change', {target: {value}})
}

// this helper will make it easier to fire the keyUp event
// on elements. For example:
// keyUpInput(tagInput, 13)
// will fire the "enter" key on that input
function keyUpInput(input, keyCode) {
  input.simulate('keyup', {keyCode})
}

// this helper will make it easier for you to find
// labeled elements in the wrapper:
// const tagInput = wrapper.find(sel('tags'))
function sel(id) {
  return `[data-test="${id}"]`
}

test('I submitted my elaboration and feedback', () => {
  const submitted = true
  expect(true).toBe(submitted)
})
