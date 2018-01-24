import React from 'react'

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
        <div>
          <label>
            username <input name="username" data-test="username-input" />
          </label>
        </div>
        <div>
          <label>
            password{' '}
            <input type="password" name="password" data-test="password-input" />
          </label>
        </div>
        <button type="submit" data-test="login-submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Login
