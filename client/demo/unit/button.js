import React, {PropTypes} from 'react'

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
  color: React.PropTypes.string,
}
