import React from 'react'
import {Link} from 'react-router-dom'
import smiley from '../../shared/smiley-cyrus.jpg'
import ArticleActions from './article-actions'

const ArticleMeta = props => {
  const article = props.article
  return (
    <div className="article-meta">
      <Link to={`/@${article.author.username}`}>
        <img src={article.author.image || smiley} alt="author" />
      </Link>

      <div className="info">
        <Link to={`/@${article.author.username}`} className="author">
          {article.author.username}
        </Link>
        <span className="date">
          {new Date(article.createdAt).toDateString()}
        </span>
      </div>

      <ArticleActions canModify={props.canModify} article={article} />
    </div>
  )
}

export default ArticleMeta
