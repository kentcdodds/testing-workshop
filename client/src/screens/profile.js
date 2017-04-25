import React from 'react'
import {connect} from 'react-redux'
import agent from '../shared/agent'
import Profile from '../shared/containers/profile'

class ProfilePage extends React.Component {
  componentWillMount() {
    this.props.onLoad(
      Promise.all([
        agent.Profile.get(this.props.match.params.username),
        agent.Articles.byAuthor(this.props.match.params.username),
      ]),
    )
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  render() {
    return <Profile profile={this.props.profile} activeTab="mine" />
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onLoad: payload => dispatch({type: 'PROFILE_PAGE_LOADED', payload}),
    onUnload: () => dispatch({type: 'PROFILE_PAGE_UNLOADED'}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
