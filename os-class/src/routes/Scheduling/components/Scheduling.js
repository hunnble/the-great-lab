import React from 'react'
import Jcb from './Jcb'
import AlgorithmForm from '../containers/AlgorithmFormContainer'
import JcbForm from '../containers/JcbFormContainer'
import Time from '../containers/TimeContainer'

export const Scheduling = (props) => (
  <div>
    <div className='row'>
      <div className='col-xs-12'>
        <p>
          What the fuck is JCB?
          JCB(Job Control Block) contains infomations of a job for job control computing.
        </p>
      </div>
      <div className='col-xs-12 col-md-6'>
        <AlgorithmForm />
        <table className='table table-bordered'>
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
              props.jcbs.map((jcb, index) => (
                <Jcb key={'jcb' + index} jcb={jcb} index={index} removeJcb={props.removeJcb} />
              ))
            }
          </tbody>
        </table>
        <JcbForm />
      </div>
      <section className='col-xs-12 col-md-6'>
        <header>
          jobs
        </header>
        <ul>
          {
            props.jcbs.map((jcb, index) => (
              <Jcb key={'jcb' + index} jcb={jcb} index={index} removeJcb={props.removeJcb} />
            ))
          }
        </ul>
      </section>
      <section className='col-xs-12 col-md-6'>
        <header>
          backup queue
        </header>
        <ul>
          {
            props.jcbs.map((jcb, index) => (
              jcb.state === 1 &&
              <Jcb key={'jcb' + index} jcb={jcb} index={index} removeJcb={props.removeJcb} />
            ))
          }
        </ul>
      </section>
      <section className='col-xs-12 col-md-6'>
        <header>
          memory
        </header>
        <ul>
          {
            props.jcbs.map((jcb, index) => (
              jcb.state === 2 &&
              <Jcb key={'jcb' + index} jcb={jcb} index={index} removeJcb={props.removeJcb} />
            ))
          }
        </ul>
      </section>
      <div className='col-xs-12 col-md-6'>
        <Time />
      </div>
    </div>
  </div>
)

Scheduling.propTypes = {
  jcbs: React.PropTypes.array.isRequired,
  addJcb: React.PropTypes.func.isRequired,
  removeJcb: React.PropTypes.func.isRequired
}

export default Scheduling
