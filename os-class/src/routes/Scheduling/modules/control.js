import Job from '../../../utils/job.js'
import { jcbFormConfig } from '../configs/form.config'
import { jobSchedulingAlgorithms, processSchedulingAlgorithms } from '../../../utils/algorithms'
import { maxTime, timeStep } from '../configs/time.config'
import { bindRedux } from 'redux-form-utils'

export const ADD_TIME = 'ADD_TIME'
export const RESET = 'RESET'
export const START_SCHEDULING = 'START_SCHEDULING'
export const PAUSE_SCHEDULING = 'PAUSE_SCHEDULING'
export const ADD_JCB = 'ADD_JCB'
export const REMOVE_JCB = 'REMOVE_JCB'
export const CHANGE_ALGORITHM = 'CHANGE_ALGORITHM'

// ------------------------------------
// Actions
// ------------------------------------
export function addTime () {
  return {
    type: ADD_TIME
  }
}

export function resetStates () {
  return {
    type: RESET
  }
}

export function startScheduling (timer) {
  return {
    type: START_SCHEDULING,
    timer
  }
}

export function pauseScheduling () {
  return {
    type: PAUSE_SCHEDULING
  }
}

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
  time: 0,
  delay: 200,
  timer: null,
  processes: [],
  tapeDriveNum: 4,
  memory: 100,
  algorithms,
  ...jcbFormState
}

export default function schedulingReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_TIME:
      let newTime = state.time + timeStep
      if (newTime >= maxTime) {
        newTime -= maxTime
      }
      return {
        ...state,
        time: newTime
      }
    case RESET:
      let newJcbs = state.jcbs.concat()
      newJcbs = newJcbs.map((jcb) => {
        jcb.state = 0
        jcb.startTime = null
        jcb.wordedTime = 0
        return jcb
      })
      return {
        ...state,
        time: 0,
        jcbs: newJcbs,
        processes: []
      }
    case START_SCHEDULING:
      return {
        ...state,
        timer: action.timer
      }
    case PAUSE_SCHEDULING:
      clearInterval(state.timer)
      return {
        ...state,
        timer: null
      }
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
      let newForm = {}
      for (var key in state.form) {
        if (state.form[key].value === '') {
          return state
        } else {
          newForm[key] = state.form[key].value
        }
      }
      return {
        ...state,
        jcbs: state.jcbs
          .concat(new Job(newForm))
          .sort((jcb1, jcb2) => (
            jcb1.arriveTime - jcb2.arriveTime
          ))
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
