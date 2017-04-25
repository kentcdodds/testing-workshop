// FINAL_START
import React from 'react'
import {render, mount} from 'enzyme'
import {renderToJson, mountToJson} from 'enzyme-to-json'
import CustomerList from '../customer-list'
import store from '../customers'

let storeCleanup
beforeAll(() => {
  storeCleanup = initializeStore()
})

afterAll(() => {
  storeCleanup()
})

test('should render no customers', () => {
  const wrapper = render(<CustomerList />)
  expect(wrapper).toMatchSnapshot()
})

test('should render customers', () => {
  const cleanup = initializeStore([{name: 'Bob'}, {name: 'Joanna'}])
  const wrapper = render(<CustomerList />)
  expect(wrapper).toMatchSnapshot()
  cleanup()
})

test('should respond to store updates', () => {
  const cleanup = initializeStore()
  const wrapper = mountCustomerList()
  expect(wrapper).toMatchSnapshot('1. before customers are added')
  store.setCustomers([{name: 'Jill'}, {name: 'Fred'}])
  expect(wrapper).toMatchSnapshot('2. after customers are added')
  cleanup()
})

test('unsubscribe when unmounted (to avoid memory leaks)', () => {
  const unsubscribeMock = jest.fn()
  const subscribeMock = jest.spyOn(store, 'subscribe')
  subscribeMock.mockImplementation(() => unsubscribeMock)
  const wrapper = mountCustomerList()
  wrapper.unmount()
  expect(unsubscribeMock).toHaveBeenCalledTimes(1)
  subscribeMock.mockRestore() // cleanup
})

/**
 * Mounts <CustomerList /> with the given props
 * @param {Object} props - the props to mount with
 * @return {Object} the rendered component
 */
function mountCustomerList() {
  return mount(<CustomerList />)
}

function initializeStore(customers = []) {
  const initialCustomers = store.getCustomers()
  store.setCustomers(customers)
  return function cleanup() {
    store.setCustomers(initialCustomers)
  }
}
// FINAL_END
// WORKSHOP_START
test('todo', () => {})
// WORKSHOP_END
