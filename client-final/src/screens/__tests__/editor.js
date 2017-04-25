import React from 'react'
import {mount} from 'enzyme'
import {Component as Editor} from '../editor'

test('renders editor form by default', () => {
  const wrapper = render()
  expect(wrapper).toMatchSnapshot()
})

test('renders the given title', () => {
  const title = 'The day I dualed Lord Voldemort'
  const wrapper = render({title})
  expect(wrapper.find(sel('title')).node.value).toBe(title)
})

test('adds tag when the user hits enter', () => {
  const newTag = 'interwebs'
  const tagList = ['internet', 'web', 'network']
  const wrapper = render({tagList})
  const tagInput = wrapper.find(sel('tags'))
  changeInputValue(tagInput, newTag)
  keyUpInput(tagInput, 13)
  const tagPills = wrapper.find(sel('tag-pills'))
  expect(tagPills.children()).toHaveLength(4)
  expect(tagPills.find(sel(`tag-3-${newTag}`))).toHaveLength(1)
})

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

test('I submitted my elaboration and feedback', () => {
  const submitted = true
  expect(true).toBe(submitted)
})
