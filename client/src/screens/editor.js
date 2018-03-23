import React, {Component} from 'react'
import * as api from '../utils/api'
import {HiddenLabel} from '../components/hidden-label'
import {Input, Button, TextArea} from '../components/inputs'

class Editor extends Component {
  static defaultProps = {
    api,
  }
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
    this.props.api.posts.create(newPost).then(() => {
      this.props.history.push('/')
    })
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} data-testid="editor-form">
          <HiddenLabel htmlFor="title-input">Post Title</HiddenLabel>
          <Input
            id="title-input"
            placeholder="Title"
            name="title"
            data-testid="title-input"
          />
          <HiddenLabel htmlFor="content-input">Post Content</HiddenLabel>
          <TextArea
            id="content-input"
            placeholder="Content"
            name="content"
            data-testid="content-input"
          />
          <HiddenLabel htmlFor="tags-input">Post Tags</HiddenLabel>
          <Input
            id="tags-input"
            placeholder="tags"
            name="tags"
            data-testid="tags-input"
          />
          <Button type="submit" data-testid="editor-submit">
            Submit
          </Button>
        </form>
      </div>
    )
  }
}

export default Editor
