// ------------------------------------
// jcb in jcbs: {
//  name,
//  arriveTime,
//  serviceTime,
//  memory(internal memory), tapeDriveNum, priority, state, startAddress(internal memory), startTime, workedTime }
// ------------------------------------

let Job = function (config) {
  return {
    name: config.name,
    arriveTime: parseInt(config.arriveTime, 10),
    serviceTime: parseInt(config.serviceTime, 10),
    startTime: null,
    workedTime: 0,
    state: 0,
    startAddress: parseInt(config.startAddress, 10),
    memory: parseInt(config.memory, 10),
    tapeDriveNum: parseInt(config.tapeDriveNum, 10),
    priority: parseInt(config.priority, 10)
  }
}

export default Job
