import React from 'react'
import ReactDOM from 'react-dom'
import AutoScalingText from '../auto-scaling-text'

test('mounts', () => {
  const div = document.createElement('div')
  ReactDOM.render(<AutoScalingText />, div)
})
