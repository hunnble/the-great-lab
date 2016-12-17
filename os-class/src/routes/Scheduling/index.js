import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'scheduling',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Scheduling = require('./containers/SchedulingContainer').default
      const reducer = require('./modules/index').default

      injectReducer(store, { key: 'scheduling', reducer })

      cb(null, Scheduling)
    }, 'scheduling')
  }
})
