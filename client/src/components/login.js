import React from 'react'
import {Input, Button} from './inputs'
import Form from './form'

function Login({onSubmit}) {
  return (
    <div>
      <Form
        onSubmit={e => {
          e.preventDefault()
          const {username, password} = e.target.elements
          onSubmit({
            username: username.value,
            password: password.value,
          })
        }}
      >
        <label style={{justifySelf: 'right'}} htmlFor="username-input">
          Username
        </label>
        <Input
          id="username-input"
          placeholder="Username..."
          name="username"
          style={{flex: 1}}
        />
        <label style={{justifySelf: 'right'}} id="password-input">
          Password
        </label>
        <Input
          placeholder="Password..."
          type="password"
          name="password"
          aria-labelledby="password-input"
        />
        <Button type="submit" style={{gridColumnStart: 2, marginTop: 20}}>
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default Login
