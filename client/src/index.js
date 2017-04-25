import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter, HashRouter} from 'react-router-dom'
import createStore from './store'
import AppRoutes from './app'

const Router = process.env.NODE_ENV === 'production' ?
  BrowserRouter :
  HashRouter

ReactDOM.render(
  <Provider store={createStore()}>
    <Router>
      <AppRoutes />
    </Router>
  </Provider>,
  document.getElementById('root'),
)
