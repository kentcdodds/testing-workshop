import React from 'react'
import {connect} from 'react-redux'
import marked from 'marked'
import agent from '../../shared/agent'
import ArticleMeta from './article-meta'
import CommentContainer from './comment-container'

const mapStateToProps = state => ({
  ...state.article,
  currentUser: state.common.currentUser,
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({type: 'ARTICLE_PAGE_LOADED', payload}),
  onUnload: () => dispatch({type: 'ARTICLE_PAGE_UNLOADED'}),
})

class Article extends React.Component {
  componentWillMount() {
    this.props.onLoad(
      Promise.all([
        agent.Articles.get(this.props.match.params.id),
        agent.Comments.forArticle(this.props.match.params.id),
      ]),
    )
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  render() {
    if (!this.props.article) {
      return null
    }

    const markup = {__html: marked(this.props.article.body, {sanitize: true})}
    const canModify = this.props.currentUser &&
      this.props.currentUser.username === this.props.article.author.username
    return (
      <div className="article-page">

        <div className="banner">
          <div className="container">

            <h1 data-test="title">{this.props.article.title}</h1>
            <ArticleMeta article={this.props.article} canModify={canModify} />

          </div>
        </div>

        <div className="container page">

          <div className="row article-content">
            <div className="col-xs-12">

              <div dangerouslySetInnerHTML={markup} data-test="body" />

              <ul className="tag-list" data-test="tags">
                {this.props.article.tagList.map(tag => {
                  return (
                    <li className="tag-default tag-pill tag-outline" key={tag}>
                      {tag}
                    </li>
                  )
                })}
              </ul>

            </div>
          </div>

          <hr />

          <div className="article-actions" />

          <div className="row">
            <CommentContainer
              comments={this.props.comments || []}
              errors={this.props.commentErrors}
              slug={this.props.match.params.id}
              currentUser={this.props.currentUser}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article)
