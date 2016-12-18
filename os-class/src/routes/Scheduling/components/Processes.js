import React from 'react'
import Jcb from './Jcb'

export const Processes = (props) => (
  <div>
    <h3>processes</h3>
    {
      props.processes.length > 0 &&
      <table className='table table-condensed'>
        <thead>
          <tr>
            <td>name</td>
            <td>arrive time</td>
            <td>service time</td>
            <td>start address</td>
            <td>memory</td>
            <td>tap drive number</td>
            <td>remove job</td>
          </tr>
        </thead>
        <tbody>
          {
            props.processes.map((process, index) => (
              <Jcb jcb={process} index={index} />
            ))
          }
        </tbody>
      </table>
    }
    {
      props.processes.length === 0 &&
      <p>It's empty now!</p>
    }
  </div>
)

Processes.propTypes = {
  processes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
}

export default Processes
