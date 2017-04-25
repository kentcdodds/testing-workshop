import React from 'react'
import {Link} from 'react-router-dom'
import smiley from '../../shared/smiley-cyrus.jpg'

function LoggedOutView(props) {
  if (!props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">

        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/login" className="nav-link" data-test="sign-in-link">
            Sign in
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/register" className="nav-link" data-test="sign-up-link">
            Sign up
          </Link>
        </li>

      </ul>
    )
  }
  return null
}

function LoggedInView(props) {
  if (props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">

        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/editor" className="nav-link">
            <i className="ion-compose" />&nbsp;New Post
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/settings" className="nav-link" data-test="settings">
            <i className="ion-gear-a" />&nbsp;Settings
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to={`/@${props.currentUser.username}`}
            className="nav-link"
            data-test="profile-link"
          >
            <img
              src={props.currentUser.image || smiley}
              className="user-pic"
              alt="you"
            />
            {props.currentUser.username}
          </Link>
        </li>

      </ul>
    )
  }

  return null
}

function Header(props) {
  return (
    <nav className="navbar navbar-light">
      <div className="container">

        <Link to="/" className="navbar-brand">
          {props.appName.toLowerCase()}
        </Link>

        <LoggedOutView currentUser={props.currentUser} />

        <LoggedInView currentUser={props.currentUser} />
      </div>
    </nav>
  )
}

export default Header
