import {applyMiddleware, createStore} from 'redux'
import {createLogger} from 'redux-logger'
import {promiseMiddleware, localStorageMiddleware} from './middleware'
import reducer from './reducer'

const getMiddleware = () => {
  const isProd = process.env.NODE_ENV === 'production'
  const isTest = process.env.NODE_ENV === 'test'
  if (isProd || isTest) {
    return applyMiddleware(promiseMiddleware, localStorageMiddleware)
  } else {
    // Enable additional logging in non-production environments.
    return applyMiddleware(
      promiseMiddleware,
      localStorageMiddleware,
      createLogger(),
    )
  }
}

export default createStoreWithState

function createStoreWithState(state = {}) {
  return createStore(reducer, state, getMiddleware())
}
