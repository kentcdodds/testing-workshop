import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import {init} from './api'

init()

ReactDOM.render(<App />, document.getElementById('root'))
