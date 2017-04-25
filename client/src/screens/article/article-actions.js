import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import agent from '../../shared/agent'

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload => dispatch({type: 'DELETE_ARTICLE', payload}),
})

const ArticleActions = props => {
  const article = props.article
  const del = () => {
    props.onClickDelete(agent.Articles.delete(article.slug))
  }
  if (props.canModify) {
    return (
      <span>

        <Link
          to={`/editor/${article.slug}`}
          className="btn btn-outline-secondary btn-sm"
          data-test="edit"
        >
          <i className="ion-edit" /> Edit Article
        </Link>

        <button className="btn btn-outline-danger btn-sm" onClick={del}>
          <i className="ion-trash-a" /> Delete Article
        </button>

      </span>
    )
  }

  return <span />
}

export default connect(() => ({}), mapDispatchToProps)(ArticleActions)
