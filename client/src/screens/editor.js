import React from 'react'
import {connect} from 'react-redux'
import agent from '../shared/agent'
import ListErrors from '../shared/components/list-errors'

const mapStateToProps = state => ({
  ...state.editor,
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({type: 'EDITOR_PAGE_LOADED', payload}),
  onSubmit: payload => dispatch({type: 'ARTICLE_SUBMITTED', payload}),
  onUnload: () => dispatch({type: 'EDITOR_PAGE_UNLOADED'}),
})

const isEnter = ({keyCode}) => keyCode === 13

class Editor extends React.Component {
  constructor(props, ...args) {
    super(props, ...args)
    this.state = {
      ...this.getStateFromProps(props),
      tagInput: '',
    }
  }
  watchForEnter = ev => {
    if (isEnter(ev)) {
      ev.preventDefault()
      const {target: {value}} = ev
      if (!this.state.tagList.includes(value)) {
        this.setState(state => ({
          tagInput: '',
          tagList: state.tagList.concat(value),
        }))
      }
    }
  }

  removeTagHandler = ev => {
    if (ev.type === 'click' || isEnter(ev)) {
      const {target: {dataset: {tag}}} = ev
      this.setState(state => ({
        tagList: state.tagList.filter(t => t !== tag),
      }))
      this._tags.focus()
    }
  }
  submitForm = ev => {
    ev.preventDefault()
    if (document.activeElement === this._tags) {
      return
    }
    const {title, description, body, tagList} = this.state
    const article = {title, description, body, tagList}

    const slug = {slug: this.props.articleSlug}
    const promise = this.props.articleSlug ?
      agent.Articles.update(Object.assign(article, slug)) :
      agent.Articles.create(article)

    this.props.onSubmit(promise)
  }

  updateInputState = ({target: {dataset, value}}) => {
    this.setState({[dataset.stateKey]: value})
  }

  getStateFromProps(props = this.props) {
    const {title, description, body, tagList} = props
    return {title, description, body, tagList}
  }

  componentWillReceiveProps(nextProps) {
    const oldSlug = getSlug(this.props)
    const newSlug = getSlug(nextProps)
    if (oldSlug === newSlug) {
      this.setState(this.getStateFromProps(nextProps))
    } else if (newSlug) {
      this.props.onUnload()
      this.props.onLoad(agent.Articles.get(newSlug))
    } else {
      this.setState(this.getStateFromProps({}))
    }
  }

  componentDidMount() {
    const slug = getSlug(this.props)
    if (slug) {
      return this.props.onLoad(agent.Articles.get(slug))
    }
    this.props.onLoad(null)
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  render() {
    const {errors, inProgress} = this.props
    const {title, description, body, tagInput, tagList} = this.state
    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">

              <ListErrors errors={errors} />

              <form onSubmit={this.submitForm}>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Article Title"
                      value={title}
                      onChange={this.updateInputState}
                      data-state-key="title"
                      data-test="title"
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="What's this article about?"
                      value={description}
                      onChange={this.updateInputState}
                      data-state-key="description"
                      data-test="description"
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows="8"
                      placeholder="Write your article (in markdown)"
                      value={body}
                      onChange={this.updateInputState}
                      data-state-key="body"
                      data-test="body"
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter tags"
                      value={tagInput}
                      onChange={e => this.setState({tagInput: e.target.value})}
                      onKeyUp={this.watchForEnter}
                      ref={node => this._tags = node}
                      data-test="tags"
                    />

                    <div className="tag-list" data-test="tag-pills">
                      {(tagList || []).map((tag, index) => {
                        return (
                          <span
                            className="tag-default tag-pill"
                            key={tag}
                            data-test={`tag-${index}-${tag}`}
                          >
                            <i
                              className="ion-close-round"
                              onClick={this.removeTagHandler}
                              onKeyUp={this.removeTagHandler}
                              tabIndex={0}
                              data-tag={tag}
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
                    disabled={inProgress}
                    data-test="submit"
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

function getSlug(props) {
  const {match: {params: {slug} = {}} = {}} = props
  return slug
}

export {Editor as Component}
export default connect(mapStateToProps, mapDispatchToProps)(Editor)
