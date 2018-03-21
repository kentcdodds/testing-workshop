import React, {Component} from 'react'
import * as api from '../utils/api'
import {Input, Button, TextArea} from '../components/inputs'

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
    return (
      <div>
        <form onSubmit={this.handleSubmit} data-testid="editor-form">
          <Input placeholder="title" name="title" data-testid="title-input" />
          <TextArea
            placeholder="content"
            name="content"
            data-testid="content-input"
          />
          <Input placeholder="tags" name="tags" data-testid="tags-input" />
          <Button type="submit" data-testid="editor-submit" />
        </form>
      </div>
    )
  }
}

export default Editor
