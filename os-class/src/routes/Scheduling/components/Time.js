import React from 'react'
import { timeStringify } from '../../../utils/timeUtils'

export const Time = (props) => (
  <div>
    <p className='lead'>time: {timeStringify(props.time)}</p>
    <button type='button' className='btn btn-default' onClick={props.addTime}>start</button>
    <button type='button' className='btn btn-default' onClick={props.setTimeToZero}>set time to zero</button>
  </div>
)

Time.propTypes = {
  time: React.PropTypes.number.isRequired,
  addTime: React.PropTypes.func.isRequired,
  setTimeToZero: React.PropTypes.func.isRequired
}

export default Time
