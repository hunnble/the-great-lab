export const getUsefulJcbIndexes = (jcbs, processes, memory, curTime) => {
  let usefulJcbIndexes = []
  const emptyMemory = memory - processes.reduce((occupiedMemory, process) => (
    occupiedMemory + process.memory
  ), 0)
  for (let i = 0, len = jcbs.length; i < len; ++i) {
    if (jcbs[i].state === 0 && jcbs[i].memory < emptyMemory && jcbs[i].arriveTime <= curTime) {
      usefulJcbIndexes.push(i)
    }
  }
  return usefulJcbIndexes
}

export const fcfs = (jcbs, usefulJcbIndexes, curTime) => {
  let minArriveTime = Infinity
  let resultIndex = -1
  for (let i = 0, len = usefulJcbIndexes.length; i < len; ++i) {
    const index = usefulJcbIndexes[i]
    if (jcbs[index].arriveTime <= curTime && jcbs[index].state === 0 && jcbs[index].arriveTime < minArriveTime) {
      minArriveTime = jcbs[index].arriveTime
      resultIndex = index
    }
  }
  return resultIndex
}

export const sjf = (jcbs, usefulJcbIndexes, curTime) => {
  let minServiceTime = Infinity
  let resultIndex = -1
  for (let i = 0, len = usefulJcbIndexes.length; i < len; ++i) {
    const index = usefulJcbIndexes[i]
    if (jcbs[index].arriveTime <= curTime && jcbs[index].state === 0 && jcbs[index].serviceTime < minServiceTime) {
      minServiceTime = jcbs[index].serviceTime
      resultIndex = index
    }
  }
  return resultIndex
}

export const psa = (jcbs, usefulJcbIndexes, curTime) => {
  let maxPriority = -Infinity
  let resultIndex = -1
  for (let i = 0, len = usefulJcbIndexes.length; i < len; ++i) {
    const index = usefulJcbIndexes[i]
    if (jcbs[index].arriveTime <= curTime && jcbs[index].state === 0 && jcbs[index].priority > maxPriority) {
      maxPriority = jcbs[index].priority
      resultIndex = index
    }
  }
  return resultIndex
}

const hrrnRp = (jcb, curTime) => (
  (curTime - jcb.arriveTime + jcb.serviceTime) / jcb.serviceTime
)

export const hrrn = (jcbs, usefulJcbIndexes, curTime) => {
  let maxHrrnRp = -Infinity
  let resultIndex = -1
  for (let i = 0, len = usefulJcbIndexes.length; i < len; ++i) {
    const index = usefulJcbIndexes[i]
    const rp = hrrnRp(jcbs[index], curTime)
    if (jcbs[index].arriveTime <= curTime && jcbs[index].state === 0 && rp > maxHrrnRp) {
      maxHrrnRp = rp
      resultIndex = index
    }
  }
  return resultIndex
}

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

export const jobSchedulingAlgorithms = {
  getUsefulJcbIndexes,
  fcfs,
  sjf,
  psa,
  hrrn
}

export const processSchedulingAlgorithms = {
  fcfs: processFcfs,
  rr,
  spn
}

const algorithms = {
  jobSchedulingAlgorithms,
  processSchedulingAlgorithms
}

export default algorithms
