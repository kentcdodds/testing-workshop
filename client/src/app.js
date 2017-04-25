import React from 'react'
import {Route} from 'react-router'
import Root from './screens/app'
import Article from './screens/article'
import Editor from './screens/editor'
import Home from './screens/home'
import Login from './screens/login'
import ConnectedProfile from './screens/profile'
import ProfileFavorites from './screens/profile-favorites'
import Register from './screens/register'
import Settings from './screens/settings'

export default AppRoutes

function AppRoutes() {
  return (
    <Route
      path="/"
      render={props => (
        <Root {...props}>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/editor" exact component={Editor} />
          <Route path="/editor/:slug" component={Editor} />
          <Route path="/article/:id" component={Article} />
          <Route path="/settings" component={Settings} />
          <Route path="/@:username" component={ConnectedProfile} />
          <Route path="/@:username/favorites" component={ProfileFavorites} />
        </Root>
      )}
    />
  )
}
