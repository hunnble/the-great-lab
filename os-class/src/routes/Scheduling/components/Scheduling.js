import React from 'react'
import Jcb from './Jcb'
import AlgorithmForm from '../containers/AlgorithmFormContainer'
import JcbForm from '../containers/JcbFormContainer'
import Time from '../containers/TimeContainer'
import Processes from '../containers/ProcessesContainer'

export const Scheduling = (props) => (
  <div>
    <Time />  
    <div className='row'>
      <div className='col-xs-12 col-md-4'>
        <JcbForm />
        <h3>Choose scheduling algorithms</h3>
        <AlgorithmForm />
      </div>
      <div className='col-xs-12 col-md-8'>
        <section>
          <header>
            <h3>Backup Queue</h3>
          </header>
          <table className='table table-condensed'>
            <thead>
              <tr>
                <td>name</td>
                <td>arrive time</td>
                <td>service time</td>
                <td>start Time</td>
                <td>worked Time</td>
                <td>memory</td>
                <td>tap drive number</td>
                {
                  !props.timer &&
                  <td>remove job</td>
                }
              </tr>
            </thead>
            <tbody>
              {
                props.jcbs.map((jcb, index) => (
                  jcb.state === 0 &&
                  <Jcb key={'back-up' + index} jcb={jcb} index={index} removeJcb={
                    !props.timer && props.removeJcb
                  } />
                ))
              }
            </tbody>
          </table>
        </section>
        <section>
          <Processes />
        </section>
        <section>
          <header>
            <h3>Finished</h3>
          </header>
          <table className='table table-condensed'>
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
                props.jcbs.some((jcb) => (
                  jcb.state === 2
                )) && props.jcbs.map((jcb, index) => (
                  jcb.state === 2 &&
                  <Jcb key={'memory' + index} jcb={jcb} index={index} />
                ))
              }
            </tbody>
          </table>
        </section>
      </div>
    </div>
  </div>
)

Scheduling.propTypes = {
  timer: React.PropTypes.number,
  jcbs: React.PropTypes.array.isRequired,
  addJcb: React.PropTypes.func.isRequired,
  removeJcb: React.PropTypes.func.isRequired
}

export default Scheduling
