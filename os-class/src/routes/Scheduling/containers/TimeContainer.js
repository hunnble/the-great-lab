import { connect } from 'react-redux'
import { addTime, setTimeToZero } from '../modules/time'
import Time from '../components/Time'

const mapStateToProps = (state) => ({
  time: state.scheduling.time.time
})

const mapDispatchToProps = {
  addTime,
  setTimeToZero
}

export default connect(mapStateToProps, mapDispatchToProps)(Time)
