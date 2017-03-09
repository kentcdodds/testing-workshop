import React from 'react'
import ArticlePreview from './article-preview'
import ListPagination from './list-pagination'

const ArticleList = props => {
  if (!props.articles) {
    return <div className="article-preview">Loading...</div>
  }

  if (props.articles.length === 0) {
    return (
      <div className="article-preview">
        No articles are here... yet.
      </div>
    )
  }

  return (
    <div>
      {props.articles.map(article => {
        return <ArticlePreview article={article} key={article.slug} />
      })}

      <ListPagination
        articlesCount={props.articlesCount}
        currentPage={props.currentPage}
      />
    </div>
  )
}

export default ArticleList
