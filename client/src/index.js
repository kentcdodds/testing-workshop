import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import {init} from './utils/api'

import './index.css'

if (window.Cypress) {
  init({baseURL: window.Cypress.env('API_URL').trim()})
} else {
  init()
}

ReactDOM.render(<App />, document.getElementById('⚛️'))
