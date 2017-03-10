const defaultState = {inProgress: false, errors: null}
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGIN':
    case 'REGISTER':
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null,
      }
    case 'LOGIN_PAGE_UNLOADED':
    case 'REGISTER_PAGE_UNLOADED':
      return {...defaultState}
    case 'ASYNC_START':
      if (action.subtype === 'LOGIN' || action.subtype === 'REGISTER') {
        return {...state, inProgress: true}
      } else {
        return state
      }
    default:
      return state
  }
}
