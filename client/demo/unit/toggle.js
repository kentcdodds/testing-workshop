// see this live: https://codesandbox.io/s/GvWpGjKQ
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import glamorous from 'glamorous'
import {darken} from 'polished'

// imagine this is in a "components" file
const primaryColor = '#337ab7'
const toggledOnStyles = {
  backgroundColor: darken(0.15, primaryColor),
  borderColor: darken(0.25, primaryColor),
  '&:hover,&:active,&:focus': {
    backgroundColor: darken(0.2, primaryColor),
    borderColor: darken(0.3, primaryColor),
  },
}
const toggledOffStyles = {
  backgroundColor: primaryColor,
  borderColor: darken(0.1, primaryColor),
  '&:hover,&:active,&:focus': {
    backgroundColor: darken(0.1, primaryColor),
    borderColor: darken(0.2, primaryColor),
  },
}
const ToggleButton = glamorous.button(
  {
    display: 'inline-block',
    padding: '6px 12px',
    marginBottom: '0',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '1.4',
    textAlign: 'center',
    cursor: 'pointer',
    borderRadius: '4px',
    color: '#fff',
  },
  props => (props.on ? toggledOnStyles : toggledOffStyles),
)

class Toggle extends Component {
  constructor(props, ...rest) {
    super(props, ...rest)
    this.state = {
      toggledOn: props.initialToggledOn || false,
    }
  }

  handleToggleClick = () => {
    const toggledOn = !this.state.toggledOn
    this.props.onToggle(toggledOn)
    this.setState({toggledOn})
  }

  render() {
    const {children} = this.props
    const {toggledOn} = this.state
    return (
      <ToggleButton
        on={toggledOn}
        onClick={this.handleToggleClick}
        data-test="button"
      >
        {children}
      </ToggleButton>
    )
  }
}

Toggle.propTypes = {
  initialToggledOn: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
}

export default Toggle
