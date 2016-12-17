import React from 'react'

export const Jcb = (props) => (
  <tr key={'jcb' + props.index}>
    <td>{props.jcb.name}</td>
    <td>{props.jcb.arriveTime}</td>
    <td>{props.jcb.serviceTime}</td>
    <td>{props.jcb.startAddress}</td>
    <td>{props.jcb.memory}</td>
    <td>{props.jcb.tapeDriveNum}</td>
    {
      props.removeJcb &&
      <td>
        <button type='button' className='btn btn-sm' onClick={() => {
          props.removeJcb(props.index)
        }} />
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
