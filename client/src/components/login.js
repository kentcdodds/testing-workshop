import React from 'react'
import {HiddenLabel} from './hidden-label'
import {Input, Button} from './inputs'

function Login({onSubmit}) {
  return (
    <div>
      <form
        data-testid="login-form"
        onSubmit={e => {
          e.preventDefault()
          const {username, password} = e.target.elements
          onSubmit({
            username: username.value,
            password: password.value,
          })
        }}
      >
        <HiddenLabel htmlFor="username-input">Username</HiddenLabel>
        <Input id="username-input" placeholder="Username..." name="username" />
        <HiddenLabel id="password-input">Password</HiddenLabel>
        <Input
          placeholder="Password..."
          type="password"
          name="password"
          aria-labelledby="password-input"
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  )
}

export default Login
