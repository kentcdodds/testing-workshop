export default getStoreStub

/**
 * Create a stub for the store which can be used for assertions
 * @param {Array} customers - the array of customers
 * @returns {Object} - ref property has customers and will haf ref.callback when
 *   store.callback is invoked. store.getCustomers will return ref.customers
 */
function getStoreStub(customers = []) {
  let callback
  const unsubscribe = jest.fn()
  const ref = {customers}

  const store = {
    getCustomers: () => ref.customers,
    subscribe: cb => {
      callback = cb
      return unsubscribe
    },
  }
  return {unsubscribe, store, updateCustomers}

  function updateCustomers(newCustomers) {
    ref.customers = newCustomers
    callback()
  }
}
