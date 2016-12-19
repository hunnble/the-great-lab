import { connect } from 'react-redux'
import { resetStates, addTime, startScheduling, pauseScheduling } from '../modules/control'
import Time from '../components/Time'

const mapStateToProps = (state) => ({
  time: state.scheduling.control.time,
  memory: state.scheduling.control.memory,
  delay: state.scheduling.control.delay
})

const mapDispatchToProps = {
  resetStates,
  addTime,
  startScheduling,
  pauseScheduling
}

export default connect(mapStateToProps, mapDispatchToProps)(Time)
