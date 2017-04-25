import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import smiley from '../smiley-cyrus.jpg'
import agent from '../agent'
import ArticleList from '../components/article-list'

function Profile({
  profile,
  onFollow,
  onUnfollow,
  currentUser,
  articles,
  articlesCount,
  currentPage,
  activeTab,
}) {
  if (!profile || !profile.username) {
    return null
  }

  const isUser = currentUser && profile.username === currentUser.username

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img
                src={profile.image || smiley}
                className="user-img"
                alt="user"
              />
              <h4>{profile.username}</h4>
              <p>{profile.bio}</p>
              <EditProfileSettings isUser={isUser} />
              <FollowUserButton
                isUser={isUser}
                user={profile}
                follow={onFollow}
                unfollow={onUnfollow}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <Tabs username={profile.username} activeTab={activeTab} />
            </div>
            <ArticleList
              articles={articles}
              articlesCount={articlesCount}
              state={currentPage}
            />
          </div>

        </div>
      </div>
    </div>
  )
}
Profile.propTypes = {
  profile: PropTypes.shape({
    username: PropTypes.string,
  }),
  currentUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
  onFollow: PropTypes.func.isRequired,
  onUnfollow: PropTypes.func.isRequired,

  // forward these on to other components
  activeTab: PropTypes.any,
  articles: PropTypes.any,
  articlesCount: PropTypes.any,
  currentPage: PropTypes.any,
}

function Tabs({username, activeTab}) {
  const mineClasses = ['nav-link']
  const favoritesClasses = ['nav-link']
  if (activeTab === 'mine') {
    mineClasses.push('active')
  }
  if (activeTab === 'favorites') {
    favoritesClasses.push('active')
  }
  return (
    <ul className="nav nav-pills outline-active">
      <li className="nav-item">
        <Link className={mineClasses.join(' ')} to={`/@${username}`}>
          My Articles
        </Link>
      </li>

      <li className="nav-item">
        <Link
          className={favoritesClasses.join(' ')}
          to={`/@${username}/favorites`}
        >
          Favorited Articles
        </Link>
      </li>
    </ul>
  )
}
Tabs.propTypes = {
  username: PropTypes.string.isRequired,
  activeTab: PropTypes.string.isRequired,
}

function EditProfileSettings({isUser}) {
  if (isUser) {
    return null
  }
  return (
    <Link
      to="/settings"
      className="btn btn-sm btn-outline-secondary action-btn"
    >
      <i className="ion-gear-a" /> Edit Profile Settings
    </Link>
  )
}
EditProfileSettings.propTypes = {isUser: PropTypes.bool.isRequired}

function FollowUserButton({isUser, user, unfollow, follow}) {
  if (isUser) {
    return null
  }

  let classes = 'btn btn-sm action-btn'
  if (user.following) {
    classes += ' btn-secondary'
  } else {
    classes += ' btn-outline-secondary'
  }

  const handleClick = ev => {
    ev.preventDefault()
    if (user.following) {
      unfollow(user.username)
    } else {
      follow(user.username)
    }
  }

  return (
    <button className={classes} onClick={handleClick}>
      <i className="ion-plus-round" />
      &nbsp;
      {user.following ? 'Unfollow' : 'Follow'} {user.username}
    </button>
  )
}
FollowUserButton.propTypes = {
  isUser: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    following: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
  }),
  unfollow: PropTypes.func.isRequired,
  follow: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    ...state.articleList,
    currentUser: state.common.currentUser,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onFollow: username =>
      dispatch({
        type: 'FOLLOW_USER',
        payload: agent.Profile.follow(username),
      }),
    onUnfollow: username =>
      dispatch({
        type: 'UNFOLLOW_USER',
        payload: agent.Profile.unfollow(username),
      }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
