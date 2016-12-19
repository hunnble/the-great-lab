import { connect } from 'react-redux'
import { addJcb, removeJcb } from '../modules/control'
import Scheduling from '../components/Scheduling'

const mapStateToProps = (state) => ({
  jcbs: state.scheduling.control.jcbs,
  timer: state.scheduling.control.timer
})

const mapDispatchToProps = {
  addJcb,
  removeJcb
}

export default connect(mapStateToProps, mapDispatchToProps)(Scheduling)
