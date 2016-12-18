import React from 'react'
import { timeStringify } from '../../../utils/timeUtils'

export const Time = (props) => (
  <div>
    <p className='lead'>time: {timeStringify(props.time)}</p>
    <button type='button' className='btn btn-default' onClick={() => {
      const timer = setInterval(props.addTime, props.delay || 200)
      props.startScheduling(timer)
    }}>start</button>
    <button type='button' className='btn btn-default' onClick={props.pauseScheduling}>pause</button>
    <button type='button' className='btn btn-default' onClick={() => {
      props.pauseScheduling()
      props.resetStates()
    }}>reset</button>
  </div>
)

Time.propTypes = {
  time: React.PropTypes.number.isRequired,
  delay: React.PropTypes.number,
  resetStates: React.PropTypes.func.isRequired,
  addTime: React.PropTypes.func.isRequired,
  startScheduling: React.PropTypes.func.isRequired,
  pauseScheduling: React.PropTypes.func.isRequired
}

export default Time
