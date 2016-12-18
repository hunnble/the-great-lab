import React from 'react'
import { createForm } from 'redux-form-utils'
import { jcbFormConfig } from '../configs/form.config'

export class JcbForm extends React.Component {
  handleAddJcb = () => {
    this.props.addJcb()
    this.props.clearAll()
  }
  render () {
    const {
      name,
      arriveTime,
      serviceTime,
      startAddress,
      memory,
      tapeDriveNum,
      priority
    } = this.props.fields
    const { addJcb, clearAll } = this.props
    return (
      <form className='text-left'>
        <h3 className='text-center'>create new job</h3>
        <div className='form-group'>
          <label>name</label>
          <input
          type='text'
          className='form-control'
          name='name'
          {...name} />
        </div>
        <div className='form-group'>
          <label>arrive time</label>
          <input
            type='number'
            min='0'
            max='1440'
            className='form-control'
            name='arriveTime'
            {...arriveTime} />
        </div>
        <div className='form-group'>
          <label>service time</label>
          <input
            type='number'
            min='0'
            max='120'
            className='form-control'
            name='serviceTime'
            {...serviceTime} />
        </div>
        <div className='form-group'>
          <label>start address(in memory)</label>
          <input
            type='number'
            min='1'
            max='100'
            className='form-control'
            name='startAddress'
            {...startAddress} />
        </div>
        <div className='form-group'>
          <label>memory footprint</label>
          <input
            type='number'
            min='1'
            max='100'
            className='form-control'
            name='memory'
            {...memory} />
        </div>
        <div className='form-group'>
          <label>tap drive</label>
          <input
            type='number'
            min='0'
            max='3'
            className='form-control'
            name='tapeDriveNum'
            {...tapeDriveNum} />
        </div>
        <div className='form-group'>
          <label>priority(useful when you choose PSA)</label>
          <input
            type='number'
            min='0'
            max='100'
            className='form-control'
            name='priority'
            {...priority} />
        </div>
        <button type='button' className='btn btn-default' onClick={this.handleAddJcb}>create job</button>
        <button type='button' className='btn btn-default' onClick={clearAll}>reset</button>
      </form>
    )
  }
}

JcbForm.propTypes = {
  form: React.PropTypes.object.isRequired,
  fields: React.PropTypes.object.isRequired,
  clear: React.PropTypes.func.isRequired,
  clearAll: React.PropTypes.func.isRequired,
  addJcb: React.PropTypes.func.isRequired
}

export default createForm(jcbFormConfig)(JcbForm)
