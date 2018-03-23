import React from 'react'
import ReactDOM from 'react-dom'
import Calculator from '../calculator'

test('mounts', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Calculator />, div)
})
