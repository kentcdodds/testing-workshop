export default (state = {}, action) => {
  switch (action.type) {
    case 'PROFILE_PAGE_LOADED':
      return {
        ...state,
        ...action.payload[0].profile,
      }
    case 'PROFILE_PAGE_UNLOADED':
      return state
    case 'FOLLOW_USER':
    case 'UNFOLLOW_USER':
      return {
        ...state,
        ...action.payload.profile,
      }
    default:
      return state
  }
}
