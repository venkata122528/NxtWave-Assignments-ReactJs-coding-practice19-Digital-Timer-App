// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timerLimit: 25,
      minutesTime: 25,
      secondsTime: 60,
      isItRunning: false,
    }
    this.timer = 60
    console.log('constructor')
  }

  componentDidMount() {
    console.log('componentDidMount')
  }

  increaseTime = () => {
    const {isItRunning} = this.state
    if (!isItRunning) {
      const {timerLimit} = this.state
      this.setState({timerLimit: timerLimit + 1, minutesTime: timerLimit + 1})
    }
  }

  decreaseTime = () => {
    const {timerLimit, isItRunning} = this.state
    if (timerLimit >= 1 && !isItRunning) {
      this.setState({timerLimit: timerLimit - 1, minutesTime: timerLimit - 1})
    }
  }

  startOrPauseEvent = () => {
    const {isItRunning} = this.state
    this.setState({isItRunning: !isItRunning})
    if (!isItRunning) {
      this.uniqId = setInterval(this.reduceSecondsAndMinutes, 1000)
    } else {
      clearInterval(this.uniqId)
    }
  }

  reduceSecondsAndMinutes = () => {
    const {minutesTime} = this.state

    if (this.timer > 1) {
      this.timer -= 1
    } else {
      this.timer = 60
    }
    this.setState({secondsTime: this.timer})
    if (this.timer === 59 || this.timer === 0 || this.timer === 59) {
      this.setState(previousState => ({
        minutesTime: previousState.minutesTime - 1,
      }))
    }

    if (this.timer === 0 && minutesTime === 0) {
      clearInterval(this.uniqId)
    }
  }

  resetEvent = () => {
    this.setState({
      timerLimit: 25,
      minutesTime: 25,
      secondsTime: 60,
      isItRunning: false,
    })
    clearInterval(this.uniqId)
  }

  render() {
    console.log('Render')
    const {timerLimit, minutesTime, secondsTime, isItRunning} = this.state
    const startOrPauseText = isItRunning ? 'Pause' : 'Start'
    let startOrPauseLogo
    let altText
    let runningStatusText

    if (isItRunning) {
      startOrPauseLogo =
        'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      altText = 'pause icon'
      runningStatusText = 'Running'
    } else {
      startOrPauseLogo =
        'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
      altText = 'play icon'
      runningStatusText = 'Paused'
    }

    console.log(secondsTime)

    return (
      <div className="mainContainer">
        <h1 className="mainHeading">Digital Timer</h1>
        <div className="timerContainer">
          <div className="timerImageContainer">
            <div className="timerRunningContainer">
              <h1 className="runningTimeText">
                {minutesTime}:{secondsTime === 60 ? '00' : secondsTime}
              </h1>
              <p className="runningStatus">{runningStatusText}</p>
            </div>
          </div>
          <div className="timerFunctionalityContainer">
            <div className="startResetContainer">
              <div className="startPauseContainer">
                <img
                  src={startOrPauseLogo}
                  alt={altText}
                  className="startPauseResetIcon"
                />
                <button
                  className="startPauseButton"
                  type="button"
                  onClick={this.startOrPauseEvent}
                >
                  {startOrPauseText}
                </button>
              </div>
              <div className="restartContainer">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="startPauseResetIcon"
                />
                <button
                  className="resetButton"
                  type="button"
                  onClick={this.resetEvent}
                >
                  Reset
                </button>
              </div>
            </div>
            <p className="timerLimitText">Set Timer limit</p>
            <div className="timerIncreaseDecreaseButtonsContainer">
              <button
                className="minusButton"
                type="button"
                onClick={this.decreaseTime}
              >
                -
              </button>
              <p className="timerText">{timerLimit}</p>
              <button
                className="plusButton"
                type="button"
                onClick={this.increaseTime}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
