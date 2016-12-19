import { connect } from 'react-redux'
import { changeAlgorithm } from '../modules/control'
import AlgorithmForm from '../components/AlgorithmForm'

const mapStateToProps = (state) => ({
  algorithms: state.scheduling.control.algorithms,
  chosedAlgorithmIndexs: state.scheduling.control.chosedAlgorithmIndexs,
  timer: state.scheduling.control.timer
})

const mapDispatchToProps = {
  changeAlgorithm
}

export default connect(mapStateToProps, mapDispatchToProps)(AlgorithmForm)
