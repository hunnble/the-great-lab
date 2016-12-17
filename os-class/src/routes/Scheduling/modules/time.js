import { maxTime, timeStep } from '../configs/time.config'

export const ADD_TIME = 'ADD_TIME'
export const SET_TIME_TO_ZERO = 'SET_TIME_TO_ZERO'

// ------------------------------------
// Actions
// ------------------------------------
export function addTime () {
  return {
    type: ADD_TIME
  }
}

export function setTimeToZero () {
  return {
    type: SET_TIME_TO_ZERO
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  time: 0
}

export default function timeReducer (state = initialState, action) {
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
    case SET_TIME_TO_ZERO:
      return {
        ...state,
        time: 0
      }
    default:
      return state
  }
}
