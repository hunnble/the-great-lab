import { connect } from 'react-redux'
import Processes from '../components/Processes'

const mapStateToProps = (state) => ({
  processes: state.scheduling.control.processes
})

export default connect(mapStateToProps)(Processes)
