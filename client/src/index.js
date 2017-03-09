import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import React from 'react'
import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
  hashHistory,
} from 'react-router'

import createStore from './store'
import App from './screens/app'
import Article from './screens/article'
import Editor from './screens/editor'
import Home from './screens/home'
import Login from './screens/login'
import ConnectedProfile from './screens/profile'
import ProfileFavorites from './screens/profile-favorites'
import Register from './screens/register'
import Settings from './screens/settings'

ReactDOM.render(
  <Provider store={createStore()}>
    <Router
      history={
        process.env.NODE_ENV === 'production' ? browserHistory : hashHistory
      }
    >
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="login" component={Login} />
        <Route path="register" component={Register} />
        <Route path="editor" component={Editor} />
        <Route path="editor/:slug" component={Editor} />
        <Route path="article/:id" component={Article} />
        <Route path="settings" component={Settings} />
        <Route path="@:username" component={ConnectedProfile} />
        <Route path="@:username/favorites" component={ProfileFavorites} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'),
)
