let _customers = []
const callbacks = []

export default {
  getCustomers,
  setCustomers,
  subscribe,
}

/**
 * Returns the current list of customers
 * @return {Array} customers
 */
function getCustomers() {
  return _customers
}

/**
 * Sets the current list of customers to the given customers
 * and lets all the subscribers know about the update
 * @param {Array} customers - An array of objects that have a name
 *   property that is a string
 */
function setCustomers(customers) {
  _customers = customers
  _letSubscribersKnow()
}

/**
 * Adds the given callback to a list of functions to be
 * called when the current customers are set
 * @param {Function} callback - the callback to be called
 * @return {Function} - a function to call to unsubscribe
 */
function subscribe(callback) {
  callbacks.push(callback)
  return function removeCallback() {
    callbacks.splice(callbacks.indexOf(callback), 1)
  }
}

/**
 * Iterates through all callbacks and calls them
 */
function _letSubscribersKnow() {
  callbacks.forEach(cb => cb())
}
