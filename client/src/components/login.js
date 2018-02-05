import React from 'react'
import {Input, Button} from './inputs'

function Login({onSubmit}) {
  return (
    <div>
      <form
        data-test="login-form"
        onSubmit={e => {
          e.preventDefault()
          const {username, password} = e.target.elements
          onSubmit({
            username: username.value,
            password: password.value,
          })
        }}
      >
        <Input
          placeholder="Username..."
          name="username"
          data-test="username-input"
        />
        <Input
          placeholder="Password..."
          type="password"
          name="password"
          data-test="password-input"
        />
        <Button type="submit" data-test="login-submit" />
      </form>
    </div>
  )
}

export default Login
