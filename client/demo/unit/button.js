import React from 'react'
import PropTypes from 'prop-types'

export default Button

function Button({children}, {color}) {
  return (
    <button style={{background: color}}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.any.isRequired,
}

Button.contextTypes = {
  color: PropTypes.string,
}
