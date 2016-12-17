import Job from '../../../utils/job.js'
import { jcbFormConfig } from '../configs/form.config'
import { bindRedux } from 'redux-form-utils'

export const ADD_JCB = 'ADD_JCB'
export const REMOVE_JCB = 'REMOVE_JCB'
export const CHANGE_ALGORITHM = 'CHANGE_ALGORITHM'

// ------------------------------------
// Actions
// ------------------------------------
export function changeAlgorithm (index, key) {
  return {
    type: CHANGE_ALGORITHM,
    index: index,
    key: key
  }
}

export function addJcb () {
  return {
    type: ADD_JCB
  }
}

export function removeJcb (index) {
  return {
    type: REMOVE_JCB,
    index
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const { state: jcbFormState, reducer: jcbFormReducer } = bindRedux(jcbFormConfig)

const jobAlgorithm = {
  key: 'jobAlgorithm',
  index: 0,
  items: ['FCFS', 'SJF', 'PSA', 'HRRN']
}
const processAlgorithm = {
  key: 'processAlgorithm',
  index: 0,
  items: ['FIFO', 'RR', 'SPN']
}
const memoryAlgorithm = {
  key: 'memoryAlgorithm',
  index: 0,
  items: ['FIRST_FIT']
}
const algorithms = {
  jobAlgorithm,
  processAlgorithm,
  memoryAlgorithm
}

const initialState = {
  jcbs: [
    new Job({
      name: 'JOB1',
      arriveTime: 0,
      serviceTime: 60,
      startAddress: 0,
      memory: 2,
      tapeDriveNum: 1,
      priority: 1
    }),
    new Job({
      name: 'JOB2',
      arriveTime: 40,
      serviceTime: 40,
      startAddress: 3,
      memory: 3,
      tapeDriveNum: 1,
      priority: 3
    }),
    new Job({
      name: 'JOB3',
      arriveTime: 60,
      serviceTime: 10,
      startAddress: 0,
      memory: 1,
      tapeDriveNum: 2,
      priority: 2
    }),
    new Job({
      name: 'JOB4',
      arriveTime: 100,
      serviceTime: 20,
      startAddress: 1,
      memory: 2,
      tapeDriveNum: 1,
      priority: 2
    })
  ],
  tapeDriveNum: 4,
  algorithms,
  ...jcbFormState
}

export default function schedulingReducer (state = initialState, action) {
  switch (action.type) {
    case CHANGE_ALGORITHM:
      let newAlgorithms = Object.assign({}, state.algorithms)
      for (let i in newAlgorithms) {
        if (newAlgorithms[i].key === action.key) {
          newAlgorithms[i].index = action.index
          break
        }
      }
      return {
        ...state,
        algorithms: newAlgorithms
      }
    case ADD_JCB:
      for (var key in state.form) {
        if (state.form[key].value === '') {
          return state
        }
      }
      return {
        ...state,
        jcbs: state.jcbs.concat(new Job(state.form))
      }
    case REMOVE_JCB:
      return {
        ...state,
        jcbs: state.jcbs.filter((jcb, index) => index !== action.index)
      }
    default:
      return jcbFormReducer(state, action)
  }
}
