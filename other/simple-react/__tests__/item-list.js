import React from 'react'
import ReactDOM from 'react-dom'
import ItemList from '../item-list'

test('renders "no items" when the item list is empty', () => {
  const container = document.createElement('div')
  ReactDOM.render(<ItemList items={[]} />, container)
  expect(container.textContent).toMatch('no items')
})

test('renders the items in a list', () => {
  const container = document.createElement('div')
  ReactDOM.render(<ItemList items={['apple', 'orange', 'pear']} />, container)
  expect(container.textContent).toMatch('apple')
  expect(container.textContent).toMatch('orange')
  expect(container.textContent).toMatch('pear')
})
