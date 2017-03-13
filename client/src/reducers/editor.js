const defaultState = {
  articleSlug: '',
  title: '',
  description: '',
  body: '',
  tagList: [],
  inProgress: false,
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'EDITOR_PAGE_LOADED':
      return {
        ...state,
        articleSlug: action.payload ? action.payload.article.slug : '',
        title: action.payload ? action.payload.article.title : '',
        description: action.payload ? action.payload.article.description : '',
        body: action.payload ? action.payload.article.body : '',
        tagList: action.payload ? action.payload.article.tagList : [],
      }
    case 'EDITOR_PAGE_UNLOADED':
      return defaultState
    case 'ARTICLE_SUBMITTED':
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null,
      }
    case 'ASYNC_START':
      if (action.subtype === 'ARTICLE_SUBMITTED') {
        return {...state, inProgress: true}
      }
      return state
    default:
      return state
  }
}
