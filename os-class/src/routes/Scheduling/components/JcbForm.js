import React from 'react'
import { createForm } from 'redux-form-utils'
import { jcbFormConfig } from '../configs/form.config'

export class JcbForm extends React.Component {
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
      <form>
        <input
          type='text'
          className='form-control'
          name='name'
          placeholder='name'
          {...name} />
        <input
          type='number'
          min='0'
          max='1440'
          className='form-control'
          name='arriveTime'
          placeholder='arriving time'
          {...arriveTime} />
        <input
          type='number'
          min='0'
          max='120'
          className='form-control'
          name='serviceTime'
          placeholder='service time'
          {...serviceTime} />
        <input
          type='number'
          min='1'
          max='100'
          className='form-control'
          name='startAddress'
          placeholder='startAddress'
          {...startAddress} />
        <input
          type='number'
          min='1'
          max='100'
          className='form-control'
          name='memory'
          placeholder='memory'
          {...memory} />
        <input
          type='number'
          min='0'
          max='3'
          className='form-control'
          name='tapeDriveNum'
          placeholder='tape drive'
          {...tapeDriveNum} />
        <input
          type='number'
          min='0'
          max='100'
          className='form-control'
          name='priority'
          placeholder='priority'
          {...priority} />
        <button type='button' className='btn btn-default' onClick={addJcb}>create job</button>
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
