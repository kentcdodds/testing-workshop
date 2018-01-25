import React, {Component} from 'react'
import * as api from '../utils/api'

class Editor extends Component {
  handleSubmit = e => {
    e.preventDefault()
    const {title, content, tags} = e.target.elements
    const newPost = {
      title: title.value,
      content: content.value,
      tags: tags.value.split(',').map(t => t.trim()),
      date: new Date().toISOString(),
      authorId: this.props.user.id,
    }
    api.posts.create(newPost).then(() => {
      this.props.history.push('/')
    })
  }
  render() {
    const {match} = this.props
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              Title <input name="title" data-test="title-input" />
            </label>
          </div>
          <div>
            <label>
              Content <textarea name="content" data-test="content-input" />
            </label>
          </div>
          <div>
            <label>
              Tags: <input name="tags" data-test="tags-input" />
            </label>
          </div>
          <button type="submit" data-test="editor-submit">
            submit
          </button>
        </form>
        Editor<pre>{JSON.stringify(match, null, 2)}</pre>
      </div>
    )
  }
}

export default Editor
