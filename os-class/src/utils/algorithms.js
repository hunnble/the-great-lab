export const shouldJobSchedule = (jcbs, processes, memory) => {
  const emptyMemory = memory - processes.reduce((occupiedMemory, process) => (
    occupiedMemory + process.memory
  ), 0)
  return emptyMemory >= processes.sort((process1, process2) => (
    process1.memory - process2.memory
  ))[0].memory
}

export const fcfs = (jcbs, curTime) => {
  let minArriveTime = Infinity
  let resultIndex = -1
  for (let i = 0, len = jcbs.length; i < len; ++i) {
    if (jcbs[i].arriveTime <= curTime && jcbs[i].state === 0 && jcbs[i].arriveTime < minArriveTime) {
      minArriveTime = jcbs[i].arriveTime
      resultIndex = i
    }
  }
  return resultIndex
}

export const sjf = (jcbs, curTime) => {
  let minServiceTime = Infinity
  let resultIndex = -1
  for (let i = 0, len = jcbs.length; i < len; ++i) {
    if (jcbs[i].arriveTime <= curTime && jcbs[i].state === 0 && jcbs[i].serviceTime < minServiceTime) {
      minServiceTime = jcbs[i].serviceTime
      resultIndex = i
    }
  }
  return resultIndex
}

export const psa = (jcbs, curTime) => {
  let maxPriority = -Infinity
  let resultIndex = -1
  for (let i = 0, len = jcbs.length; i < len; ++i) {
    if (jcbs[i].arriveTime <= curTime && jcbs[i].state === 0 && jcbs[i].priority > maxPriority) {
      maxPriority = jcbs[i].priority
      resultIndex = i
    }
  }
  return resultIndex
}

const hrrnRp = (jcb, curTime) => (
  (curTime - jcb.arriveTime + jcb.serviceTime) / jcb.serviceTime
)

export const hrrn = (jcbs, curTime) => (
  jcbs
    .filter((jcb) => (
      jcb.arriveTime <= curTime && jcb.state === 0
    ))
    .sort((jcb1, jcb2) => (
      hrrnRp(jcb2, curTime) - hrrnRp(jcb1, curTime)
    ))[0]
)

export const processFcfs = (processes) => (
  processes
)

export const rr = (processes, q, curTime) => {
  if (curTime % q === 0) {
    const lastProcess = processes.shift()
    processes.push(lastProcess)
  }
  return processes
}

export const spn = (processes) => (
  processes.sort((process1, process2) => (
    process1.serviceTime - process2.serviceTime
  ))
)

const algorithms = {
  jobSchedulingAlgorithms: {
    shouldJobSchedule,
    fcfs,
    sjf,
    psa,
    hrrn
  },
  processSchedulingAlgorithms: {
    fcfs: processFcfs,
    rr,
    spn
  }
}

export default algorithms
