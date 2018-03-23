import React from 'react'
import styles from './calculator-display.module.css'
import AutoScalingText from './auto-scaling-text'
import {getFormattedValue} from './utils'

class CalculatorDisplay extends React.Component {
  render() {
    const {value, ...props} = this.props
    const formattedValue = getFormattedValue(value, navigator.language)

    return (
      <div {...props} className={styles.calculatorDisplay}>
        <AutoScalingText>{formattedValue}</AutoScalingText>
      </div>
    )
  }
}

export default CalculatorDisplay
