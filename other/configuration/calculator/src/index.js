import './global.css'
import React from 'react'
import ReactDOM from 'react-dom'
import Calculator from './calculator'

ReactDOM.render(
  <React.Fragment>
    <Calculator />
    <div style={{marginTop: 30, textAlign: 'center'}}>
      Calculator component{' '}
      <a href="https://codepen.io/mjijackson/pen/xOzyGX">created</a> by
      <br />
      <a href="https://twitter.com/mjackson">Michael Jackson</a> of{' '}
      <a href="https://reacttraining.com/">React Training</a>
    </div>
  </React.Fragment>,
  document.getElementById('app'),
)

/* eslint react/jsx-child-element-spacing:0 */
