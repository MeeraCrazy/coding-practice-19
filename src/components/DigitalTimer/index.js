// Write your code here
import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
  timeLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  onIncreaseTimerLimitMinutes = () => {
    this.setState(prevState => ({
      timeLimitInMinutes: prevState.timeLimitInMinutes + 1,
    }))
  }

  onDecreaseTimerLimitMinutes = () => {
    const {timeLimitInMinutes} = this.state

    if (timeLimitInMinutes > 1) {
      this.setState(prevState => ({
        timeLimitInMinutes: prevState.timeLimitInMinutes - 1,
      }))
    }
  }

  renderTimerLimitControler = () => {
    const {timeLimitInMinutes, timeElapsedInSeconds} = this.state
    const isButtonDisabled = timeElapsedInSeconds > 0

    return (
      <div className="timer-limit-controller-container">
        <p className="limit-label">Set Timer Limit</p>
        <div className="time-limit-controller">
          <button
            className="limit-controller-btn"
            type="button"
            disabled={isButtonDisabled}
            onClick={this.onDecreaseTimerLimitMinutes}
          >
            -
          </button>
          <div className="limit-label-value-container">
            <p className="limit-value">{timeLimitInMinutes}</p>
          </div>
          <button
            className="limit-controller-btn"
            type="button"
            disabled={isButtonDisabled}
            onClick={this.onIncreaseTimerLimitMinutes}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerIntraval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timeElapsedInSeconds, timeLimitInMinutes} = this.state

    const isTimerCompleted = timeElapsedInSeconds === timeLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerIntraval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {isTimerRunning, timeLimitInMinutes, timeElapsedInSeconds} =
      this.state

    const isTimerCompleted = timeElapsedInSeconds === timeLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }

    if (isTimerRunning) {
      this.clearTimerIntraval()
    } else {
      this.intravalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }

    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controller-container">
        <button
          className="time-controler-btn"
          type="button"
          onClick={this.onStartOrPauseTimer}
        >
          <img
            src={startOrPauseImageUrl}
            className="time-controler-icon"
            alt={startOrPauseAltText}
          />
          <p className="timer-controler-label">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>

        <button
          className="time-controler-btn"
          type="button"
          onClick={this.onResetTimer}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            className="time-controler-icon"
            alt="reset icon"
          />
          <p className="timer-controler-label">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedTimeInTimeFormat = () => {
    const {timeLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds = timeLimitInMinutes * 60 - timeElapsedInSeconds

    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes} : ${stringifiedSeconds}`
  }

  clearTimerIntraval = () => clearInterval(this.intravalId)

  componentWilUnmount() {
    this.clearTimerIntraval()
  }

  render() {
    const {isTimerRunning} = this.state

    const labelText = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="app-contiainer">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-display-container">
            <div className="elapsed-time-container">
              <h1 className="elapsed-time">
                {this.getElapsedTimeInTimeFormat()}
              </h1>
              <p className="timer-state">{labelText}</p>
            </div>
          </div>
          <div className="controls-container">
            {this.renderTimerController()}
            {this.renderTimerLimitControler()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
