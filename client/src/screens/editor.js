import React from 'react'
import {connect} from 'react-redux'
import agent from '../shared/agent'
import ListErrors from '../shared/components/list-errors'

const mapStateToProps = state => ({
  ...state.editor,
})

const mapDispatchToProps = dispatch => ({
  onAddTag: () => dispatch({type: 'ADD_TAG'}),
  onLoad: payload => dispatch({type: 'EDITOR_PAGE_LOADED', payload}),
  onRemoveTag: tag => dispatch({type: 'REMOVE_TAG', tag}),
  onSubmit: payload => dispatch({type: 'ARTICLE_SUBMITTED', payload}),
  onUnload: () => dispatch({type: 'EDITOR_PAGE_UNLOADED'}),
  onUpdateField: (key, value) =>
    dispatch({type: 'UPDATE_FIELD_EDITOR', key, value}),
})

class Editor extends React.Component {
  constructor() {
    super()

    const updateFieldEvent = key =>
      ev => this.props.onUpdateField(key, ev.target.value)
    this.changeTitle = updateFieldEvent('title')
    this.changeDescription = updateFieldEvent('description')
    this.changeBody = updateFieldEvent('body')
    this.changeTagInput = updateFieldEvent('tagInput')
  }
  watchForEnter = ev => {
    if (ev.keyCode === 13) {
      ev.preventDefault()
      this.props.onAddTag()
    }
  }

  removeTagHandler = tag =>
    ev => {
      if (ev.type === 'click' || ev.keyCode === 13) {
        this.props.onRemoveTag(tag)
      }
    }
  submitForm = ev => {
    ev.preventDefault()
    if (document.activeElement === this._tags) {
      return
    }
    const article = {
      title: this.props.title,
      description: this.props.description,
      body: this.props.body,
      tagList: this.props.tagList,
    }

    const slug = {slug: this.props.articleSlug}
    const promise = this.props.articleSlug ?
      agent.Articles.update(Object.assign(article, slug)) :
      agent.Articles.create(article)

    this.props.onSubmit(promise)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.slug !== nextProps.params.slug) {
      if (nextProps.params.slug) {
        this.props.onUnload()
        return this.props.onLoad(agent.Articles.get(this.props.params.slug))
      }
      this.props.onLoad(null)
    }
  }

  componentWillMount() {
    if (this.props.params.slug) {
      return this.props.onLoad(agent.Articles.get(this.props.params.slug))
    }
    this.props.onLoad(null)
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  render() {
    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">

              <ListErrors errors={this.props.errors} />

              <form onSubmit={this.submitForm}>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Article Title"
                      value={this.props.title}
                      onChange={this.changeTitle}
                      data-e2e="title"
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="What's this article about?"
                      value={this.props.description}
                      onChange={this.changeDescription}
                      data-e2e="description"
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows="8"
                      placeholder="Write your article (in markdown)"
                      value={this.props.body}
                      onChange={this.changeBody}
                      data-e2e="body"
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter tags"
                      value={this.props.tagInput}
                      onChange={this.changeTagInput}
                      onKeyUp={this.watchForEnter}
                      ref={node => this._tags = node}
                      data-e2e="tags"
                    />

                    <div className="tag-list" data-e2e="tag-pills">
                      {(this.props.tagList || []).map(tag => {
                        return (
                          <span className="tag-default tag-pill" key={tag}>
                            <i
                              className="ion-close-round"
                              onClick={this.removeTagHandler(tag)}
                              onKeyUp={this.removeTagHandler(tag)}
                              tabIndex={0}
                              role="button"
                            />
                            {tag}
                          </span>
                        )
                      })}
                    </div>
                  </fieldset>

                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="submit"
                    disabled={this.props.inProgress}
                    data-e2e="submit"
                  >
                    Publish Article
                  </button>

                </fieldset>
              </form>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
