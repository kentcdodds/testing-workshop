import React from 'react'
import {connect} from 'react-redux'
import agent from '../shared/agent'
import Profile from '../shared/containers/profile'

class ProfileFavoritesPage extends React.Component {
  componentWillMount() {
    this.props.onLoad(
      Promise.all([
        agent.Profile.get(this.props.match.params.username),
        agent.Articles.favoritedBy(this.props.match.params.username),
      ]),
    )
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  render() {
    return (
      <Profile profile={this.props.profileFavorites} activeTab="favorites" />
    )
  }
}

function mapStateToProps(state) {
  return {
    profileFavorites: state.profileFavorites,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onLoad: payload =>
      dispatch({type: 'PROFILE_FAVORITES_PAGE_LOADED', payload}),
    onUnload: () => dispatch({type: 'PROFILE_FAVORITES_PAGE_UNLOADED'}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  ProfileFavoritesPage,
)
