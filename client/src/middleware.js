import agent from './shared/agent'

const promiseMiddleware = store =>
  next =>
    action => {
      if (isPromise(action.payload)) {
        store.dispatch({type: 'ASYNC_START', subtype: action.type})

        const currentView = store.getState().viewChangeCounter
        const skipTracking = action.skipTracking

        action.payload.then(
          res => {
            const currentState = store.getState()
            if (
              !skipTracking && currentState.viewChangeCounter !== currentView
            ) {
              return
            }
            action.payload = res || {}
            if (!action.skipTracking) {
              store.dispatch({type: 'ASYNC_END', promise: action.payload})
            }
            store.dispatch(action)
          },
          error => {
            const currentState = store.getState()
            if (
              !skipTracking && currentState.viewChangeCounter !== currentView
            ) {
              return
            }
            action.error = true
            action.payload = error.response.data
            if (!action.skipTracking) {
              store.dispatch({type: 'ASYNC_END', promise: action.payload})
            }
            store.dispatch(action)
          },
        )

        return
      }

      next(action)
    }

const localStorageMiddleware = () =>
  next =>
    action => {
      if (action.type === 'REGISTER' || action.type === 'LOGIN') {
        if (action.error || !action.payload.user.token) {
          window.localStorage.removeItem('jwt')
          agent.setToken(null)
        } else {
          window.localStorage.setItem('jwt', action.payload.user.token)
          agent.setToken(action.payload.user.token)
        }
      } else if (action.type === 'LOGOUT') {
        window.localStorage.removeItem('jwt')
        agent.setToken(null)
      }

      next(action)
    }

function isPromise(v) {
  return v && typeof v.then === 'function'
}

export {promiseMiddleware, localStorageMiddleware}
