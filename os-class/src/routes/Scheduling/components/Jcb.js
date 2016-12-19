import React from 'react'
import { timeStringify } from '../../../utils/timeUtils'

export const Jcb = (props) => (
  <tr key={'jcb' + props.index}>
    <td>{props.jcb.name}</td>
    <td>{timeStringify(props.jcb.arriveTime)}</td>
    <td>{timeStringify(props.jcb.serviceTime)}</td>
    <td>{timeStringify(props.jcb.startTime)}</td>
    <td>{timeStringify(props.jcb.workedTime)}</td>
    <td>{props.jcb.memory}</td>
    <td>{props.jcb.tapeDriveNum}</td>
    {
      props.removeJcb &&
      <td>
        <button type='button' className='btn btn-sm btn-danger' onClick={() => {
          props.removeJcb(props.index)
        }}>×</button>
      </td>
    }
  </tr>
)

Jcb.propTypes = {
  jcb: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired,
  removeJcb: React.PropTypes.func
}

export default Jcb
