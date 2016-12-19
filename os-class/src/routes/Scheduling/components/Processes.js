import React from 'react'
import Jcb from './Jcb'

export const Processes = (props) => (
  <div>
    <h3>Processes</h3>
    <table className='table table-condensed table-bordered'>
      <thead>
        <tr>
          <td>name</td>
          <td>arrive time</td>
          <td>service time</td>
          <td>start Time</td>
          <td>worked Time</td>
          <td>memory</td>
          <td>tap drive number</td>
        </tr>
      </thead>
      <tbody>
        {
          props.processes.map((process, index) => (
            <Jcb key={'process' + index} jcb={process} index={index} />
          ))
        }
      </tbody>
    </table>
  </div>
)

Processes.propTypes = {
  processes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
}

export default Processes
