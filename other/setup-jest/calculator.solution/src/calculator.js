import React from 'react'
import PointTarget from 'react-point'
import AutoScalingText from './auto-scaling-text'

class CalculatorDisplay extends React.Component {
  render() {
    const {value, ...props} = this.props

    const language = navigator.language || 'en-US'
    let formattedValue = parseFloat(value).toLocaleString(language, {
      useGrouping: true,
      maximumFractionDigits: 6,
    })

    // Add back missing .0 in e.g. 12.0
    const match = value.match(/\.\d*?(0*)$/)

    if (match) formattedValue += /[1-9]/.test(match[0]) ? match[1] : match[0]

    return (
      <div {...props} className="calculator-display">
        <AutoScalingText>{formattedValue}</AutoScalingText>
      </div>
    )
  }
}

class CalculatorKey extends React.Component {
  render() {
    const {onPress, className, ...props} = this.props

    return (
      <PointTarget onPoint={onPress}>
        <button className={`calculator-key ${className}`} {...props} />
      </PointTarget>
    )
  }
}

const CalculatorOperations = {
  '/': (prevValue, nextValue) => prevValue / nextValue,
  '*': (prevValue, nextValue) => prevValue * nextValue,
  '+': (prevValue, nextValue) => prevValue + nextValue,
  '-': (prevValue, nextValue) => prevValue - nextValue,
  '=': (prevValue, nextValue) => nextValue,
}

class Calculator extends React.Component {
  state = {
    value: null,
    displayValue: '0',
    operator: null,
    waitingForOperand: false,
  }

  clearAll() {
    this.setState({
      value: null,
      displayValue: '0',
      operator: null,
      waitingForOperand: false,
    })
  }

  clearDisplay() {
    this.setState({
      displayValue: '0',
    })
  }

  clearLastChar() {
    const {displayValue} = this.state

    this.setState({
      displayValue: displayValue.substring(0, displayValue.length - 1) || '0',
    })
  }

  toggleSign() {
    const {displayValue} = this.state
    const newValue = parseFloat(displayValue) * -1

    this.setState({
      displayValue: String(newValue),
    })
  }

  inputPercent() {
    const {displayValue} = this.state
    const currentValue = parseFloat(displayValue)

    if (currentValue === 0) return

    const fixedDigits = displayValue.replace(/^-?\d*\.?/, '')
    const newValue = parseFloat(displayValue) / 100

    this.setState({
      displayValue: String(newValue.toFixed(fixedDigits.length + 2)),
    })
  }

  inputDot() {
    const {displayValue} = this.state

    if (!/\./.test(displayValue)) {
      this.setState({
        displayValue: `${displayValue}.`,
        waitingForOperand: false,
      })
    }
  }

  inputDigit(digit) {
    const {displayValue, waitingForOperand} = this.state

    if (waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false,
      })
    } else {
      this.setState({
        displayValue:
          displayValue === '0' ? String(digit) : displayValue + digit,
      })
    }
  }

  performOperation(nextOperator) {
    const {value, displayValue, operator} = this.state
    const inputValue = parseFloat(displayValue)

    if (value == null) {
      this.setState({
        value: inputValue,
      })
    } else if (operator) {
      const currentValue = value || 0
      const newValue = CalculatorOperations[operator](currentValue, inputValue)

      this.setState({
        value: newValue,
        displayValue: String(newValue),
      })
    }

    this.setState({
      waitingForOperand: true,
      operator: nextOperator,
    })
  }

  handleKeyDown = event => {
    let {key} = event

    if (key === 'Enter') key = '='

    if (/\d/.test(key)) {
      event.preventDefault()
      this.inputDigit(parseInt(key, 10))
    } else if (key in CalculatorOperations) {
      event.preventDefault()
      this.performOperation(key)
    } else if (key === '.') {
      event.preventDefault()
      this.inputDot()
    } else if (key === '%') {
      event.preventDefault()
      this.inputPercent()
    } else if (key === 'Backspace') {
      event.preventDefault()
      this.clearLastChar()
    } else if (key === 'Clear') {
      event.preventDefault()

      if (this.state.displayValue === '0') {
        this.clearAll()
      } else {
        this.clearDisplay()
      }
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  render() {
    const {displayValue} = this.state

    const clearDisplay = displayValue !== '0'
    const clearText = clearDisplay ? 'C' : 'AC'

    return (
      <div className="calculator">
        <CalculatorDisplay value={displayValue} />
        <div className="calculator-keypad">
          <div className="input-keys">
            <div className="function-keys">
              <CalculatorKey
                className="key-clear"
                onPress={() =>
                  clearDisplay ? this.clearDisplay() : this.clearAll()
                }
              >
                {clearText}
              </CalculatorKey>
              <CalculatorKey
                className="key-sign"
                onPress={() => this.toggleSign()}
              >
                ±
              </CalculatorKey>
              <CalculatorKey
                className="key-percent"
                onPress={() => this.inputPercent()}
              >
                %
              </CalculatorKey>
            </div>
            <div className="digit-keys">
              <CalculatorKey
                className="key-0"
                onPress={() => this.inputDigit(0)}
              >
                0
              </CalculatorKey>
              <CalculatorKey
                className="key-dot"
                onPress={() => this.inputDot()}
              >
                ●
              </CalculatorKey>
              <CalculatorKey
                className="key-1"
                onPress={() => this.inputDigit(1)}
              >
                1
              </CalculatorKey>
              <CalculatorKey
                className="key-2"
                onPress={() => this.inputDigit(2)}
              >
                2
              </CalculatorKey>
              <CalculatorKey
                className="key-3"
                onPress={() => this.inputDigit(3)}
              >
                3
              </CalculatorKey>
              <CalculatorKey
                className="key-4"
                onPress={() => this.inputDigit(4)}
              >
                4
              </CalculatorKey>
              <CalculatorKey
                className="key-5"
                onPress={() => this.inputDigit(5)}
              >
                5
              </CalculatorKey>
              <CalculatorKey
                className="key-6"
                onPress={() => this.inputDigit(6)}
              >
                6
              </CalculatorKey>
              <CalculatorKey
                className="key-7"
                onPress={() => this.inputDigit(7)}
              >
                7
              </CalculatorKey>
              <CalculatorKey
                className="key-8"
                onPress={() => this.inputDigit(8)}
              >
                8
              </CalculatorKey>
              <CalculatorKey
                className="key-9"
                onPress={() => this.inputDigit(9)}
              >
                9
              </CalculatorKey>
            </div>
          </div>
          <div className="operator-keys">
            <CalculatorKey
              className="key-divide"
              onPress={() => this.performOperation('/')}
            >
              ÷
            </CalculatorKey>
            <CalculatorKey
              className="key-multiply"
              onPress={() => this.performOperation('*')}
            >
              ×
            </CalculatorKey>
            <CalculatorKey
              className="key-subtract"
              onPress={() => this.performOperation('-')}
            >
              −
            </CalculatorKey>
            <CalculatorKey
              className="key-add"
              onPress={() => this.performOperation('+')}
            >
              +
            </CalculatorKey>
            <CalculatorKey
              className="key-equals"
              onPress={() => this.performOperation('=')}
            >
              =
            </CalculatorKey>
          </div>
        </div>
      </div>
    )
  }
}

export default Calculator

/* eslint no-eq-null:0, eqeqeq:0 */
