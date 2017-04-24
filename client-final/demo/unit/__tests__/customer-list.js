import React from 'react'
import {render, mount} from 'enzyme'
import {renderToJson, mountToJson} from 'enzyme-to-json'
import CustomerList from '../customer-list'
import getStoreStub from './helpers/get-store-stub'

test('should render no customers', () => {
  snapshotCustomerList()
})

test('should render customers', () => {
  const {store} = getStoreStub([{name: 'Bob'}, {name: 'Joanna'}])
  snapshotCustomerList({store})
})

test('should respond to store updates', () => {
  const {store, updateCustomers} = getStoreStub()
  const wrapper = mountCustomerList({store})
  expect(mountToJson(wrapper)).toMatchSnapshot()
  updateCustomers([{name: 'Jill'}, {name: 'Fred'}])
  expect(mountToJson(wrapper)).toMatchSnapshot()
})

test('unsubscribe when unmounted', () => {
  const {unsubscribe, store} = getStoreStub()
  const wrapper = mountCustomerList({store})
  wrapper.unmount()
  expect(unsubscribe).toHaveBeenCalledTimes(1)
})

/**
 * Render the <CustomerList /> and snapshot it
 * @param {Object} props - the props to render with
 */
function snapshotCustomerList(props = {}) {
  const wrapper = renderCustomerList(props)
  expect(renderToJson(wrapper)).toMatchSnapshot()
}

/**
 * Renders <CustomerList /> with the given props
 * @param {Object} props - the props to render with
 * @return {Object} the rendered component
 */
function renderCustomerList({store = getStoreStub().store}) {
  return render(<CustomerList store={store} />)
}

/**
 * Mounts <CustomerList /> with the given props
 * @param {Object} props - the props to mount with
 * @return {Object} the rendered component
 */
function mountCustomerList({store = getStoreStub().store}) {
  return mount(<CustomerList store={store} />)
}
