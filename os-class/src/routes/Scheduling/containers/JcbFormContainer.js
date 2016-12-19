import { connect } from 'react-redux'
import { addJcb } from '../modules/control'
import JcbForm from '../components/JcbForm'

const mapStateToProps = (state) => ({
  form: state.scheduling.control.form,
  fields: state.scheduling.control.fields,
  clear: state.scheduling.control.clear,
  clearAll: state.scheduling.control.clearAll,
  timer: state.scheduling.control.timer

})

const mapDispatchToProps = {
  addJcb
}

export default connect(mapStateToProps, mapDispatchToProps)(JcbForm)
