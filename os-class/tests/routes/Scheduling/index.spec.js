import SchedulingRoute from 'routes/Scheduling'

describe('(Route) Scheduling', () => {
  let _route

  beforeEach(() => {
    _route = SchedulingRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should contain path `scheduling`', () => {
    expect(_route.path).to.equal('scheduling')
  })
})
