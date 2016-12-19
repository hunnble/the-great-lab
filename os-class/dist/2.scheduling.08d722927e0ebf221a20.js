webpackJsonp([2],{

/***/ 406:
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(23)
	  , TAG = __webpack_require__(328)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },

/***/ 409:
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(12);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },

/***/ 410:
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(323)
	  , ITERATOR   = __webpack_require__(328)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },

/***/ 411:
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(406)
	  , ITERATOR  = __webpack_require__(328)('iterator')
	  , Iterators = __webpack_require__(323);
	module.exports = __webpack_require__(7).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },

/***/ 416:
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(328)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },

/***/ 419:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(356);
	
	var _control = __webpack_require__(420);
	
	var _Scheduling = __webpack_require__(431);
	
	var _Scheduling2 = _interopRequireDefault(_Scheduling);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    jcbs: state.scheduling.control.jcbs,
	    timer: state.scheduling.control.timer
	  };
	};
	
	var mapDispatchToProps = {
	  addJcb: _control.addJcb,
	  removeJcb: _control.removeJcb
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Scheduling2.default);

/***/ },

/***/ 420:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CHANGE_ALGORITHM = exports.REMOVE_JCB = exports.ADD_JCB = exports.PAUSE_SCHEDULING = exports.START_SCHEDULING = exports.RESET = exports.ADD_TIME = undefined;
	
	var _assign = __webpack_require__(281);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _toConsumableArray2 = __webpack_require__(421);
	
	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
	
	var _extends2 = __webpack_require__(280);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	exports.addTime = addTime;
	exports.resetStates = resetStates;
	exports.startScheduling = startScheduling;
	exports.pauseScheduling = pauseScheduling;
	exports.changeAlgorithm = changeAlgorithm;
	exports.addJcb = addJcb;
	exports.removeJcb = removeJcb;
	exports.default = schedulingReducer;
	
	var _job = __webpack_require__(426);
	
	var _job2 = _interopRequireDefault(_job);
	
	var _form = __webpack_require__(427);
	
	var _algorithms = __webpack_require__(428);
	
	var _time = __webpack_require__(429);
	
	var _reduxFormUtils = __webpack_require__(430);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ADD_TIME = exports.ADD_TIME = 'ADD_TIME';
	var RESET = exports.RESET = 'RESET';
	var START_SCHEDULING = exports.START_SCHEDULING = 'START_SCHEDULING';
	var PAUSE_SCHEDULING = exports.PAUSE_SCHEDULING = 'PAUSE_SCHEDULING';
	var ADD_JCB = exports.ADD_JCB = 'ADD_JCB';
	var REMOVE_JCB = exports.REMOVE_JCB = 'REMOVE_JCB';
	var CHANGE_ALGORITHM = exports.CHANGE_ALGORITHM = 'CHANGE_ALGORITHM';
	
	// ------------------------------------
	// Actions
	// ------------------------------------
	function addTime() {
	  return {
	    type: ADD_TIME
	  };
	}
	
	function resetStates() {
	  return {
	    type: RESET
	  };
	}
	
	function startScheduling(timer) {
	  return {
	    type: START_SCHEDULING,
	    timer: timer
	  };
	}
	
	function pauseScheduling() {
	  return {
	    type: PAUSE_SCHEDULING
	  };
	}
	
	function changeAlgorithm(index, key) {
	  return {
	    type: CHANGE_ALGORITHM,
	    index: index,
	    key: key
	  };
	}
	
	function addJcb() {
	  return {
	    type: ADD_JCB
	  };
	}
	
	function removeJcb(index) {
	  return {
	    type: REMOVE_JCB,
	    index: index
	  };
	}
	
	// ------------------------------------
	// Reducer
	// ------------------------------------
	
	var _bindRedux = (0, _reduxFormUtils.bindRedux)(_form.jcbFormConfig),
	    jcbFormState = _bindRedux.state,
	    jcbFormReducer = _bindRedux.reducer;
	
	var jobAlgorithm = {
	  key: 'jobAlgorithm',
	  index: 0,
	  items: ['FCFS', 'SJF', 'PSA', 'HRRN']
	};
	var processAlgorithm = {
	  key: 'processAlgorithm',
	  index: 0,
	  items: ['FCFS', 'RR', 'SPN']
	};
	var memoryAlgorithm = {
	  key: 'memoryAlgorithm',
	  index: 0,
	  items: ['FIRST_FIT']
	};
	var algorithms = {
	  jobAlgorithm: jobAlgorithm,
	  processAlgorithm: processAlgorithm,
	  memoryAlgorithm: memoryAlgorithm
	};
	
	var initialState = (0, _extends3.default)({
	  jcbs: [new _job2.default({
	    name: 'JOB1',
	    arriveTime: 0,
	    serviceTime: 60,
	    startAddress: 0,
	    memory: 2,
	    tapeDriveNum: 1,
	    priority: 1
	  }), new _job2.default({
	    name: 'JOB2',
	    arriveTime: 0,
	    serviceTime: 40,
	    startAddress: 3,
	    memory: 3,
	    tapeDriveNum: 1,
	    priority: 3
	  }), new _job2.default({
	    name: 'JOB3',
	    arriveTime: 40,
	    serviceTime: 40,
	    startAddress: 3,
	    memory: 3,
	    tapeDriveNum: 1,
	    priority: 3
	  }), new _job2.default({
	    name: 'JOB4',
	    arriveTime: 60,
	    serviceTime: 10,
	    startAddress: 0,
	    memory: 1,
	    tapeDriveNum: 2,
	    priority: 2
	  }), new _job2.default({
	    name: 'JOB5',
	    arriveTime: 60,
	    serviceTime: 30,
	    startAddress: 1,
	    memory: 2,
	    tapeDriveNum: 1,
	    priority: 2
	  })],
	  time: 0,
	  delay: 200,
	  timer: null,
	  processes: [],
	  tapeDriveNum: 4,
	  memory: 4,
	  algorithms: algorithms
	}, jcbFormState);
	
	function schedulingReducer() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];
	
	  switch (action.type) {
	    case ADD_TIME:
	      var newTime = state.time + _time.timeStep;
	      var jcbs = state.jcbs.concat();
	      var processes = state.processes.concat();
	      var memory = state.memory + 0;
	      var usefulJcbIndexes = _algorithms.jobSchedulingAlgorithms.getUsefulJcbIndexes(jcbs, processes, memory, newTime);
	      if (usefulJcbIndexes.length === 0 && processes.length === 0) {
	        return (0, _extends3.default)({}, state, {
	          time: newTime
	        });
	      }
	      var schedulingJcbIndex = -1;
	      while (usefulJcbIndexes.length > 0) {
	        switch (jobAlgorithm.items[state.algorithms.jobAlgorithm.index]) {
	          case 'FCFS':
	            schedulingJcbIndex = _algorithms.jobSchedulingAlgorithms.fcfs(jcbs, usefulJcbIndexes, newTime);
	            break;
	          case 'SJF':
	            schedulingJcbIndex = _algorithms.jobSchedulingAlgorithms.sjf(jcbs, usefulJcbIndexes, newTime);
	            break;
	          case 'PSA':
	            schedulingJcbIndex = _algorithms.jobSchedulingAlgorithms.psa(jcbs, usefulJcbIndexes, newTime);
	            break;
	          case 'HRRN':
	            schedulingJcbIndex = _algorithms.jobSchedulingAlgorithms.hrrn(jcbs, usefulJcbIndexes, newTime);
	            break;
	          default:
	            schedulingJcbIndex = -1;
	        }
	        if (schedulingJcbIndex >= 0) {
	          jcbs[schedulingJcbIndex].state = 1;
	          processes.push(jcbs[schedulingJcbIndex]);
	        }
	        usefulJcbIndexes = _algorithms.jobSchedulingAlgorithms.getUsefulJcbIndexes(jcbs, processes, memory, newTime);
	      }
	      switch (processAlgorithm.items[state.algorithms.processAlgorithm.index]) {
	        case 'FCFS':
	          processes = _algorithms.processSchedulingAlgorithms.fcfs(processes);
	          break;
	        case 'RR':
	          processes = _algorithms.processSchedulingAlgorithms.rr(processes, 1, newTime);
	          break;
	        case 'SPN':
	          processes = _algorithms.processSchedulingAlgorithms.spn(processes);
	          break;
	        default:
	          break;
	      }
	      var workingProcess = processes[0];
	      if (workingProcess.workedTime === 0) {
	        workingProcess.startTime = newTime - 1;
	      }
	      workingProcess.workedTime += 1;
	      if (workingProcess.workedTime >= workingProcess.serviceTime) {
	        workingProcess.state = 2;
	        processes.shift();
	      }
	      return (0, _extends3.default)({}, state, {
	        time: newTime,
	        memory: memory,
	        processes: processes,
	        jcbs: jcbs
	      });
	    case RESET:
	      var newJcbs = [].concat((0, _toConsumableArray3.default)(state.jcbs));
	      newJcbs = newJcbs.map(function (jcb) {
	        jcb.state = 0;
	        jcb.startTime = null;
	        jcb.workedTime = 0;
	        return jcb;
	      });
	      return (0, _extends3.default)({}, state, {
	        time: 0,
	        jcbs: newJcbs,
	        processes: []
	      });
	    case START_SCHEDULING:
	      return (0, _extends3.default)({}, state, {
	        timer: action.timer
	      });
	    case PAUSE_SCHEDULING:
	      clearInterval(state.timer);
	      return (0, _extends3.default)({}, state, {
	        timer: null
	      });
	    case CHANGE_ALGORITHM:
	      var newAlgorithms = (0, _assign2.default)({}, state.algorithms);
	      for (var i in newAlgorithms) {
	        if (newAlgorithms[i].key === action.key) {
	          newAlgorithms[i].index = action.index;
	          break;
	        }
	      }
	      return (0, _extends3.default)({}, state, {
	        algorithms: newAlgorithms
	      });
	    case ADD_JCB:
	      var newForm = {};
	      for (var key in state.form) {
	        if (state.form[key].value === '') {
	          return state;
	        } else {
	          newForm[key] = state.form[key].value;
	        }
	      }
	      return (0, _extends3.default)({}, state, {
	        jcbs: state.jcbs.concat(new _job2.default(newForm)).sort(function (jcb1, jcb2) {
	          return jcb1.arriveTime - jcb2.arriveTime;
	        })
	      });
	    case REMOVE_JCB:
	      return (0, _extends3.default)({}, state, {
	        jcbs: state.jcbs.filter(function (jcb, index) {
	          return index !== action.index;
	        })
	      });
	    default:
	      return jcbFormReducer(state, action);
	  }
	}

/***/ },

/***/ 421:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _from = __webpack_require__(422);
	
	var _from2 = _interopRequireDefault(_from);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }
	
	    return arr2;
	  } else {
	    return (0, _from2.default)(arr);
	  }
	};

/***/ },

/***/ 422:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(423), __esModule: true };

/***/ },

/***/ 423:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(318);
	__webpack_require__(424);
	module.exports = __webpack_require__(7).Array.from;

/***/ },

/***/ 424:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(8)
	  , $export        = __webpack_require__(5)
	  , toObject       = __webpack_require__(301)
	  , call           = __webpack_require__(409)
	  , isArrayIter    = __webpack_require__(410)
	  , toLength       = __webpack_require__(292)
	  , createProperty = __webpack_require__(425)
	  , getIterFn      = __webpack_require__(411);
	
	$export($export.S + $export.F * !__webpack_require__(416)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },

/***/ 425:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(11)
	  , createDesc      = __webpack_require__(19);
	
	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },

/***/ 426:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// ------------------------------------
	// jcb in jcbs: {
	//  name,
	//  arriveTime,
	//  serviceTime,
	//  memory(internal memory), tapeDriveNum, priority, state, startAddress(internal memory), startTime, workedTime }
	// ------------------------------------
	
	var Job = function Job(config) {
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
	  };
	};
	
	exports.default = Job;

/***/ },

/***/ 427:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var jcbFormConfig = exports.jcbFormConfig = {
	  form: 'jcb-form',
	  fields: ['name', 'arriveTime', 'serviceTime', 'startAddress', 'memory', 'tapeDriveNum', 'priority']
	};
	
	var config = {
	  jcbFormConfig: jcbFormConfig
	};
	
	exports.default = config;

/***/ },

/***/ 428:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var getUsefulJcbIndexes = exports.getUsefulJcbIndexes = function getUsefulJcbIndexes(jcbs, processes, memory, curTime) {
	  var usefulJcbIndexes = [];
	  var emptyMemory = memory - processes.reduce(function (occupiedMemory, process) {
	    return occupiedMemory + process.memory;
	  }, 0);
	  for (var i = 0, len = jcbs.length; i < len; ++i) {
	    if (jcbs[i].state === 0 && jcbs[i].memory < emptyMemory && jcbs[i].arriveTime <= curTime) {
	      usefulJcbIndexes.push(i);
	    }
	  }
	  return usefulJcbIndexes;
	};
	
	var fcfs = exports.fcfs = function fcfs(jcbs, usefulJcbIndexes, curTime) {
	  var minArriveTime = Infinity;
	  var resultIndex = -1;
	  for (var i = 0, len = usefulJcbIndexes.length; i < len; ++i) {
	    var index = usefulJcbIndexes[i];
	    if (jcbs[index].arriveTime <= curTime && jcbs[index].state === 0 && jcbs[index].arriveTime < minArriveTime) {
	      minArriveTime = jcbs[index].arriveTime;
	      resultIndex = index;
	    }
	  }
	  return resultIndex;
	};
	
	var sjf = exports.sjf = function sjf(jcbs, usefulJcbIndexes, curTime) {
	  var minServiceTime = Infinity;
	  var resultIndex = -1;
	  for (var i = 0, len = usefulJcbIndexes.length; i < len; ++i) {
	    var index = usefulJcbIndexes[i];
	    if (jcbs[index].arriveTime <= curTime && jcbs[index].state === 0 && jcbs[index].serviceTime < minServiceTime) {
	      minServiceTime = jcbs[index].serviceTime;
	      resultIndex = index;
	    }
	  }
	  return resultIndex;
	};
	
	var psa = exports.psa = function psa(jcbs, usefulJcbIndexes, curTime) {
	  var maxPriority = -Infinity;
	  var resultIndex = -1;
	  for (var i = 0, len = usefulJcbIndexes.length; i < len; ++i) {
	    var index = usefulJcbIndexes[i];
	    if (jcbs[index].arriveTime <= curTime && jcbs[index].state === 0 && jcbs[index].priority > maxPriority) {
	      maxPriority = jcbs[index].priority;
	      resultIndex = index;
	    }
	  }
	  return resultIndex;
	};
	
	var hrrnRp = function hrrnRp(jcb, curTime) {
	  return (curTime - jcb.arriveTime + jcb.serviceTime) / jcb.serviceTime;
	};
	
	var hrrn = exports.hrrn = function hrrn(jcbs, usefulJcbIndexes, curTime) {
	  var maxHrrnRp = -Infinity;
	  var resultIndex = -1;
	  for (var i = 0, len = usefulJcbIndexes.length; i < len; ++i) {
	    var index = usefulJcbIndexes[i];
	    var rp = hrrnRp(jcbs[index], curTime);
	    if (jcbs[index].arriveTime <= curTime && jcbs[index].state === 0 && rp > maxHrrnRp) {
	      maxHrrnRp = rp;
	      resultIndex = index;
	    }
	  }
	  return resultIndex;
	};
	
	var processFcfs = exports.processFcfs = function processFcfs(processes) {
	  return processes;
	};
	
	var rr = exports.rr = function rr(processes, q, curTime) {
	  if (curTime % q === 0) {
	    var lastProcess = processes.shift();
	    processes.push(lastProcess);
	  }
	  return processes;
	};
	
	var spn = exports.spn = function spn(processes) {
	  return processes.sort(function (process1, process2) {
	    return process1.serviceTime - process2.serviceTime;
	  });
	};
	
	var jobSchedulingAlgorithms = exports.jobSchedulingAlgorithms = {
	  getUsefulJcbIndexes: getUsefulJcbIndexes,
	  fcfs: fcfs,
	  sjf: sjf,
	  psa: psa,
	  hrrn: hrrn
	};
	
	var processSchedulingAlgorithms = exports.processSchedulingAlgorithms = {
	  fcfs: processFcfs,
	  rr: rr,
	  spn: spn
	};
	
	var algorithms = {
	  jobSchedulingAlgorithms: jobSchedulingAlgorithms,
	  processSchedulingAlgorithms: processSchedulingAlgorithms
	};
	
	exports.default = algorithms;

/***/ },

/***/ 429:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var maxTime = exports.maxTime = 1440;
	var timeStep = exports.timeStep = 1;
	
	var timeConfig = {
	  maxTime: maxTime,
	  timeStep: timeStep
	};
	
	exports.default = timeConfig;

/***/ },

/***/ 430:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createForm = createForm;
	exports.bindRedux = bindRedux;
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * @param  {string} options.form     A unique key to identify your form throughout the app
	 * @param  {array}  options.fields   An array of string or object to configure the form fields
	 * @return {object} Enhanced React Component
	 */
	function createForm(_ref) {
	  var form = _ref.form;
	  var fields = _ref.fields;
	
	  return function (Component) {
	    var ReduxForm = function (_React$Component) {
	      _inherits(ReduxForm, _React$Component);
	
	      function ReduxForm(props) {
	        _classCallCheck(this, ReduxForm);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ReduxForm).call(this, props));
	
	        _this.displayName = form + 'Form';
	        _this.state = {};
	        return _this;
	      }
	
	      _createClass(ReduxForm, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	          this.dispatch = this.props.dispatch || this.context && this.context.store && this.context.store.dispatch;
	          if (typeof this.dispatch !== 'function') {
	            throw new ReferenceError('[redux-form-utils] Please pass `dispatch` to ' + form + ' as props or connect it with Redux\'s store.');
	          }
	        }
	      }, {
	        key: 'handleChange',
	        value: function handleChange(key, e) {
	          var value = e;
	
	          if ((typeof e === 'undefined' ? 'undefined' : _typeof(e)) === 'object') {
	            if (_typeof(e.target) === 'object') {
	              if (e.target.tagName.toLowerCase() === 'input' && ['checkbox', 'radio'].indexOf(e.target.type) > -1) {
	                value = e.target.checked;
	              } else {
	                value = e.target.value;
	              }
	            } else if (e.value !== undefined) {
	              value = e.value;
	            }
	          }
	
	          this.dispatch({
	            type: '@@form/VALUE_CHANGE',
	            meta: {
	              form: form,
	              field: key,
	              complex: value === undefined
	            },
	            payload: value !== undefined ? value : _extends({}, e)
	          });
	        }
	      }, {
	        key: 'clearAll',
	        value: function clearAll() {
	          this.dispatch({
	            type: '@@form/CLEAR_ALL',
	            meta: {
	              form: form
	            }
	          });
	        }
	      }, {
	        key: 'clear',
	        value: function clear(field) {
	          if (field && fields.indexOf(field) > -1) {
	            this.dispatch({
	              type: '@@form/CLEAR',
	              meta: {
	                form: form,
	                field: field
	              }
	            });
	          }
	        }
	      }, {
	        key: 'render',
	        value: function render() {
	          var _this2 = this;
	
	          return _react2.default.createElement(Component, _extends({}, this.props, { fields: fields.reduce(function (prev, curr) {
	              if (!_this2.props.form) {
	                throw new Error('[redux-form-utils] `' + _this2.displayName + '.props.form` is not found, make sure add `formState` to initialState using `bindRedux` in your reducer.');
	              }
	
	              if (typeof curr === 'string') {
	                prev[curr] = {
	                  value: _this2.props.form[curr].value,
	                  onChange: _this2.handleChange.bind(_this2, curr)
	                };
	              } else {
	                (function () {
	                  var _prev$key;
	
	                  var key = curr.key;
	                  var _curr$valueKey = curr.valueKey;
	                  var valueKey = _curr$valueKey === undefined ? 'value' : _curr$valueKey;
	                  var _curr$changeType = curr.changeType;
	                  var changeType = _curr$changeType === undefined ? 'onChange' : _curr$changeType;
	                  var resolver = curr.resolver;
	                  var resovler = curr.resovler;
	
	                  // backward compatible for a typo
	
	                  if (!resolver) {
	                    resolver = resovler;
	                  }
	
	                  if (!key || typeof key !== 'string') {
	                    throw new TypeError('[redux-form-utils] If you provide an object within \`fields\` options, make sure this object has a key which named \`key\`, and the type of it\'s value is string.');
	                  }
	
	                  prev[key] = (_prev$key = {}, _defineProperty(_prev$key, valueKey, _this2.props.form[key][valueKey]), _defineProperty(_prev$key, changeType, function (a, b, c, d) {
	                    if (resolver) {
	                      var payload = resolver(a, b, c, d);
	                      _this2.handleChange.call(_this2, key, payload);
	                    } else {
	                      _this2.handleChange.call(_this2, key, a, b, c, d);
	                    }
	                  }), _prev$key);
	                })();
	              }
	
	              return prev;
	            }, {}),
	            clearAll: this.clearAll.bind(this),
	            clear: this.clear.bind(this) }));
	        }
	      }]);
	
	      return ReduxForm;
	    }(_react2.default.Component);
	
	    ReduxForm.propTypes = {
	      form: _react.PropTypes.object
	    };
	    ReduxForm.contextTypes = {
	      store: _react2.default.PropTypes.object
	    };
	
	    return ReduxForm;
	  };
	}
	
	function bindRedux(_ref2) {
	  var form = _ref2.form;
	  var fields = _ref2.fields;
	
	  return {
	    state: {
	      form: fields.reduce(function (prev, curr) {
	        if (typeof curr === 'string') {
	          prev[curr] = {
	            value: ''
	          };
	        } else {
	          var key = curr.key;
	          var _curr$valueKey2 = curr.valueKey;
	          var valueKey = _curr$valueKey2 === undefined ? 'value' : _curr$valueKey2;
	          var initValue = curr.initValue;
	
	          prev[key] = _defineProperty({}, valueKey, initValue !== undefined ? initValue : '');
	        }
	
	        return prev;
	      }, {})
	    },
	
	    setInitValue: function setInitValue(initObj, state) {
	      if (!state || !state.form) {
	        return state;
	      }
	
	      return _extends({}, state, {
	        form: _extends({}, state.form, Object.keys(initObj).reduce(function (prev, curr) {
	          if (_typeof(initObj[curr]) !== 'object') {
	            return _extends({}, prev, _defineProperty({}, curr, {
	              value: initObj[curr]
	            }));
	          }
	
	          return _extends({}, prev, _defineProperty({}, curr, initObj[curr]));
	        }, {}))
	      });
	    },
	    reducer: function reducer(state, action) {
	      if (action.type.indexOf('@@form') !== 0 || action.meta.form !== form) {
	        return state;
	      }
	
	      function findConfig(field) {
	        var fieldConfig = fields.filter(function (k) {
	          if ((typeof k === 'undefined' ? 'undefined' : _typeof(k)) === 'object') {
	            return k.key === field;
	          }
	
	          return k === field;
	        });
	
	        return fieldConfig[0] || {};
	      }
	
	      switch (action.type) {
	        case '@@form/VALUE_CHANGE':
	          {
	            var newField = undefined;
	            if (action.meta.complex) {
	              return _extends({}, state, {
	                form: _extends({}, state.form, _defineProperty({}, action.meta.field, _extends({}, state.form[action.meta.field], action.payload)))
	              });
	            }
	
	            return _extends({}, state, {
	              form: _extends({}, state.form, _defineProperty({}, action.meta.field, _extends({}, state.form[action.meta.field], {
	                value: action.payload
	              })))
	            });
	          }
	
	        case '@@form/CLEAR_ALL':
	          {
	            return _extends({}, state, {
	              form: Object.keys(state.form).reduce(function (prev, curr) {
	                var fieldConfig = findConfig(curr);
	                prev[curr] = _extends({}, state.form[curr], {
	                  value: fieldConfig.initValue || ''
	                });
	
	                return prev;
	              }, {})
	            });
	          }
	
	        case '@@form/CLEAR':
	          {
	            var fieldConfig = findConfig(action.meta.field);
	
	            return _extends({}, state, {
	              form: _extends({}, state.form, _defineProperty({}, action.meta.field, _extends({}, state.form[action.meta.field], {
	                value: fieldConfig.initValue || ''
	              })))
	            });
	          }
	
	        default:
	          return state;
	      }
	    },
	
	    actionCreators: {
	      clear: function clear(field) {
	        return {
	          type: '@@form/CLEAR',
	          meta: {
	            form: form,
	            field: field
	          }
	        };
	      },
	      clearAll: function clearAll() {
	        return {
	          type: '@@form/CLEAR_ALL',
	          meta: {
	            form: form
	          }
	        };
	      }
	    }
	  };
	}

/***/ },

/***/ 431:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Scheduling = undefined;
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Jcb = __webpack_require__(432);
	
	var _Jcb2 = _interopRequireDefault(_Jcb);
	
	var _AlgorithmFormContainer = __webpack_require__(434);
	
	var _AlgorithmFormContainer2 = _interopRequireDefault(_AlgorithmFormContainer);
	
	var _JcbFormContainer = __webpack_require__(436);
	
	var _JcbFormContainer2 = _interopRequireDefault(_JcbFormContainer);
	
	var _TimeContainer = __webpack_require__(438);
	
	var _TimeContainer2 = _interopRequireDefault(_TimeContainer);
	
	var _ProcessesContainer = __webpack_require__(440);
	
	var _ProcessesContainer2 = _interopRequireDefault(_ProcessesContainer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Scheduling = exports.Scheduling = function Scheduling(props) {
	  return _react2.default.createElement(
	    'div',
	    null,
	    _react2.default.createElement(
	      'div',
	      { className: 'row' },
	      _react2.default.createElement(
	        'div',
	        { className: 'col-xs-12 col-md-4' },
	        _react2.default.createElement(_TimeContainer2.default, null),
	        _react2.default.createElement(
	          'h3',
	          null,
	          'Choose scheduling algorithms'
	        ),
	        _react2.default.createElement(_AlgorithmFormContainer2.default, null),
	        !props.timer && _react2.default.createElement(_JcbFormContainer2.default, null)
	      ),
	      _react2.default.createElement(
	        'div',
	        { className: 'col-xs-12 col-md-8' },
	        _react2.default.createElement(
	          'section',
	          null,
	          _react2.default.createElement(
	            'header',
	            null,
	            _react2.default.createElement(
	              'h3',
	              null,
	              'Backup Queue'
	            )
	          ),
	          _react2.default.createElement(
	            'table',
	            { className: 'table table-condensed table-bordered' },
	            _react2.default.createElement(
	              'thead',
	              null,
	              _react2.default.createElement(
	                'tr',
	                null,
	                _react2.default.createElement(
	                  'td',
	                  null,
	                  'name'
	                ),
	                _react2.default.createElement(
	                  'td',
	                  null,
	                  'arrive time'
	                ),
	                _react2.default.createElement(
	                  'td',
	                  null,
	                  'service time'
	                ),
	                _react2.default.createElement(
	                  'td',
	                  null,
	                  'start Time'
	                ),
	                _react2.default.createElement(
	                  'td',
	                  null,
	                  'worked Time'
	                ),
	                _react2.default.createElement(
	                  'td',
	                  null,
	                  'memory'
	                ),
	                _react2.default.createElement(
	                  'td',
	                  null,
	                  'tap drive number'
	                ),
	                !props.timer && _react2.default.createElement(
	                  'td',
	                  null,
	                  'remove job'
	                )
	              )
	            ),
	            _react2.default.createElement(
	              'tbody',
	              null,
	              props.jcbs.map(function (jcb, index) {
	                return jcb.state === 0 && _react2.default.createElement(_Jcb2.default, { key: 'back-up' + index, jcb: jcb, index: index, removeJcb: !props.timer && props.removeJcb });
	              })
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'section',
	          null,
	          _react2.default.createElement(_ProcessesContainer2.default, null)
	        ),
	        _react2.default.createElement(
	          'section',
	          null,
	          _react2.default.createElement(
	            'header',
	            null,
	            _react2.default.createElement(
	              'h3',
	              null,
	              'Finished'
	            )
	          ),
	          _react2.default.createElement(
	            'table',
	            { className: 'table table-condensed table-bordered' },
	            _react2.default.createElement(
	              'thead',
	              null,
	              _react2.default.createElement(
	                'tr',
	                null,
	                _react2.default.createElement(
	                  'td',
	                  null,
	                  'name'
	                ),
	                _react2.default.createElement(
	                  'td',
	                  null,
	                  'arrive time'
	                ),
	                _react2.default.createElement(
	                  'td',
	                  null,
	                  'service time'
	                ),
	                _react2.default.createElement(
	                  'td',
	                  null,
	                  'start Time'
	                ),
	                _react2.default.createElement(
	                  'td',
	                  null,
	                  'worked Time'
	                ),
	                _react2.default.createElement(
	                  'td',
	                  null,
	                  'memory'
	                ),
	                _react2.default.createElement(
	                  'td',
	                  null,
	                  'tap drive number'
	                )
	              )
	            ),
	            _react2.default.createElement(
	              'tbody',
	              null,
	              props.jcbs.some(function (jcb) {
	                return jcb.state === 2;
	              }) && props.jcbs.map(function (jcb, index) {
	                return jcb.state === 2 && _react2.default.createElement(_Jcb2.default, { key: 'memory' + index, jcb: jcb, index: index });
	              })
	            )
	          )
	        )
	      )
	    )
	  );
	};
	
	Scheduling.propTypes = {
	  timer: _react2.default.PropTypes.number,
	  jcbs: _react2.default.PropTypes.array.isRequired,
	  addJcb: _react2.default.PropTypes.func.isRequired,
	  removeJcb: _react2.default.PropTypes.func.isRequired
	};
	
	exports.default = Scheduling;

/***/ },

/***/ 432:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Jcb = undefined;
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _timeUtils = __webpack_require__(433);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Jcb = exports.Jcb = function Jcb(props) {
	  return _react2.default.createElement(
	    'tr',
	    { key: 'jcb' + props.index },
	    _react2.default.createElement(
	      'td',
	      null,
	      props.jcb.name
	    ),
	    _react2.default.createElement(
	      'td',
	      null,
	      (0, _timeUtils.timeStringify)(props.jcb.arriveTime)
	    ),
	    _react2.default.createElement(
	      'td',
	      null,
	      (0, _timeUtils.timeStringify)(props.jcb.serviceTime)
	    ),
	    _react2.default.createElement(
	      'td',
	      null,
	      (0, _timeUtils.timeStringify)(props.jcb.startTime)
	    ),
	    _react2.default.createElement(
	      'td',
	      null,
	      (0, _timeUtils.timeStringify)(props.jcb.workedTime)
	    ),
	    _react2.default.createElement(
	      'td',
	      null,
	      props.jcb.memory
	    ),
	    _react2.default.createElement(
	      'td',
	      null,
	      props.jcb.tapeDriveNum
	    ),
	    props.removeJcb && _react2.default.createElement(
	      'td',
	      null,
	      _react2.default.createElement(
	        'button',
	        { type: 'button', className: 'btn btn-sm btn-danger', onClick: function onClick() {
	            props.removeJcb(props.index);
	          } },
	        '\xD7'
	      )
	    )
	  );
	};
	
	Jcb.propTypes = {
	  jcb: _react2.default.PropTypes.object.isRequired,
	  index: _react2.default.PropTypes.number.isRequired,
	  removeJcb: _react2.default.PropTypes.func
	};
	
	exports.default = Jcb;

/***/ },

/***/ 433:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var timeStringify = exports.timeStringify = function timeStringify(timeNum) {
	  var time = [Math.floor(timeNum / 60), String(timeNum % 60)];
	  var hour = time[0].length > 0 ? time[0] : '0' + time[0];
	  var minute = time.length > 1 ? time[1].slice(0, 2) : '00';
	  if (hour.length < 2) {
	    hour = '0' + hour;
	  }
	  if (minute.length < 2) {
	    minute = '0' + minute;
	  }
	  return [hour, minute].join(':');
	};
	
	var timeParse = exports.timeParse = function timeParse(timeStr) {
	  var time = timeStr.split(':');
	  return parseInt(time[0], 10) * 60 + parseInt(time[1], 10);
	};
	
	var timeUtils = {
	  timeStringify: timeStringify,
	  timeParse: timeParse
	};
	
	exports.default = timeUtils;

/***/ },

/***/ 434:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(356);
	
	var _control = __webpack_require__(420);
	
	var _AlgorithmForm = __webpack_require__(435);
	
	var _AlgorithmForm2 = _interopRequireDefault(_AlgorithmForm);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    algorithms: state.scheduling.control.algorithms,
	    chosedAlgorithmIndexs: state.scheduling.control.chosedAlgorithmIndexs,
	    timer: state.scheduling.control.timer
	  };
	};
	
	var mapDispatchToProps = {
	  changeAlgorithm: _control.changeAlgorithm
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_AlgorithmForm2.default);

/***/ },

/***/ 435:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.AlgorithmForm = undefined;
	
	var _getPrototypeOf = __webpack_require__(304);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(309);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(310);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(314);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(348);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var AlgorithmForm = exports.AlgorithmForm = function (_React$Component) {
	  (0, _inherits3.default)(AlgorithmForm, _React$Component);
	
	  function AlgorithmForm() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    (0, _classCallCheck3.default)(this, AlgorithmForm);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AlgorithmForm.__proto__ || (0, _getPrototypeOf2.default)(AlgorithmForm)).call.apply(_ref, [this].concat(args))), _this), _this.renderAlgorithmBar = function (category) {
	      return _react2.default.createElement(
	        'div',
	        null,
	        category.items.map(function (algorithm, index) {
	          return _react2.default.createElement(
	            'div',
	            { key: category.key + index, className: 'radio' },
	            _react2.default.createElement(
	              'label',
	              null,
	              _react2.default.createElement('input', { type: 'radio', name: category.key, onChange: function onChange(e) {
	                  _this.props.changeAlgorithm(index, category.key);
	                }, checked: index === category.index, value: index }),
	              algorithm
	            )
	          );
	        })
	      );
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }
	
	  (0, _createClass3.default)(AlgorithmForm, [{
	    key: 'render',
	    value: function render() {
	      var _props$algorithms = this.props.algorithms,
	          jobAlgorithm = _props$algorithms.jobAlgorithm,
	          processAlgorithm = _props$algorithms.processAlgorithm,
	          memoryAlgorithm = _props$algorithms.memoryAlgorithm;
	
	      return _react2.default.createElement(
	        'form',
	        null,
	        _react2.default.createElement(
	          'section',
	          { className: 'text-left' },
	          _react2.default.createElement(
	            'header',
	            null,
	            'Job Control'
	          ),
	          this.renderAlgorithmBar(jobAlgorithm)
	        ),
	        _react2.default.createElement(
	          'section',
	          { className: 'text-left' },
	          _react2.default.createElement(
	            'header',
	            null,
	            'Process Control'
	          ),
	          this.renderAlgorithmBar(processAlgorithm)
	        ),
	        _react2.default.createElement(
	          'section',
	          { className: 'text-left' },
	          _react2.default.createElement(
	            'header',
	            null,
	            'Memory Control'
	          ),
	          this.renderAlgorithmBar(memoryAlgorithm)
	        )
	      );
	    }
	  }]);
	  return AlgorithmForm;
	}(_react2.default.Component);
	
	AlgorithmForm.propTypes = {
	  algorithms: _react2.default.PropTypes.object.isRequired,
	  changeAlgorithm: _react2.default.PropTypes.func.isRequired
	};
	
	exports.default = AlgorithmForm;

/***/ },

/***/ 436:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(356);
	
	var _control = __webpack_require__(420);
	
	var _JcbForm = __webpack_require__(437);
	
	var _JcbForm2 = _interopRequireDefault(_JcbForm);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    form: state.scheduling.control.form,
	    fields: state.scheduling.control.fields,
	    clear: state.scheduling.control.clear,
	    clearAll: state.scheduling.control.clearAll,
	    timer: state.scheduling.control.timer
	
	  };
	};
	
	var mapDispatchToProps = {
	  addJcb: _control.addJcb
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_JcbForm2.default);

/***/ },

/***/ 437:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.JcbForm = undefined;
	
	var _extends2 = __webpack_require__(280);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _getPrototypeOf = __webpack_require__(304);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(309);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(310);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(314);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(348);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reduxFormUtils = __webpack_require__(430);
	
	var _form = __webpack_require__(427);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var JcbForm = exports.JcbForm = function (_React$Component) {
	  (0, _inherits3.default)(JcbForm, _React$Component);
	
	  function JcbForm() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    (0, _classCallCheck3.default)(this, JcbForm);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = JcbForm.__proto__ || (0, _getPrototypeOf2.default)(JcbForm)).call.apply(_ref, [this].concat(args))), _this), _this.handleAddJcb = function () {
	      _this.props.addJcb();
	      _this.props.clearAll();
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }
	
	  (0, _createClass3.default)(JcbForm, [{
	    key: 'render',
	    value: function render() {
	      var _props$fields = this.props.fields,
	          name = _props$fields.name,
	          arriveTime = _props$fields.arriveTime,
	          serviceTime = _props$fields.serviceTime,
	          startAddress = _props$fields.startAddress,
	          memory = _props$fields.memory,
	          tapeDriveNum = _props$fields.tapeDriveNum,
	          priority = _props$fields.priority;
	      var clearAll = this.props.clearAll;
	
	      return _react2.default.createElement(
	        'form',
	        { className: 'text-left' },
	        _react2.default.createElement(
	          'h3',
	          { className: 'text-center' },
	          'create new job'
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'name'
	          ),
	          _react2.default.createElement('input', (0, _extends3.default)({
	            type: 'text',
	            className: 'form-control',
	            name: 'name'
	          }, name))
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'arrive time'
	          ),
	          _react2.default.createElement('input', (0, _extends3.default)({
	            type: 'number',
	            min: '0',
	            max: '1440',
	            className: 'form-control',
	            name: 'arriveTime'
	          }, arriveTime))
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'service time'
	          ),
	          _react2.default.createElement('input', (0, _extends3.default)({
	            type: 'number',
	            min: '0',
	            max: '120',
	            className: 'form-control',
	            name: 'serviceTime'
	          }, serviceTime))
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'start address(in memory)'
	          ),
	          _react2.default.createElement('input', (0, _extends3.default)({
	            type: 'number',
	            min: '1',
	            max: '100',
	            className: 'form-control',
	            name: 'startAddress'
	          }, startAddress))
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'memory footprint'
	          ),
	          _react2.default.createElement('input', (0, _extends3.default)({
	            type: 'number',
	            min: '1',
	            max: '100',
	            className: 'form-control',
	            name: 'memory'
	          }, memory))
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'tap drive'
	          ),
	          _react2.default.createElement('input', (0, _extends3.default)({
	            type: 'number',
	            min: '0',
	            max: '3',
	            className: 'form-control',
	            name: 'tapeDriveNum'
	          }, tapeDriveNum))
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'priority(useful when you choose PSA)'
	          ),
	          _react2.default.createElement('input', (0, _extends3.default)({
	            type: 'number',
	            min: '0',
	            max: '100',
	            className: 'form-control',
	            name: 'priority'
	          }, priority))
	        ),
	        _react2.default.createElement(
	          'button',
	          { type: 'button', className: 'btn btn-default', onClick: this.handleAddJcb },
	          'create job'
	        ),
	        _react2.default.createElement(
	          'button',
	          { type: 'button', className: 'btn btn-default', onClick: clearAll },
	          'reset'
	        )
	      );
	    }
	  }]);
	  return JcbForm;
	}(_react2.default.Component);
	
	JcbForm.propTypes = {
	  form: _react2.default.PropTypes.object.isRequired,
	  fields: _react2.default.PropTypes.object.isRequired,
	  clear: _react2.default.PropTypes.func.isRequired,
	  clearAll: _react2.default.PropTypes.func.isRequired,
	  addJcb: _react2.default.PropTypes.func.isRequired
	};
	
	exports.default = (0, _reduxFormUtils.createForm)(_form.jcbFormConfig)(JcbForm);

/***/ },

/***/ 438:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(356);
	
	var _control = __webpack_require__(420);
	
	var _Time = __webpack_require__(439);
	
	var _Time2 = _interopRequireDefault(_Time);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    time: state.scheduling.control.time,
	    memory: state.scheduling.control.memory,
	    delay: state.scheduling.control.delay
	  };
	};
	
	var mapDispatchToProps = {
	  resetStates: _control.resetStates,
	  addTime: _control.addTime,
	  startScheduling: _control.startScheduling,
	  pauseScheduling: _control.pauseScheduling
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Time2.default);

/***/ },

/***/ 439:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Time = undefined;
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _timeUtils = __webpack_require__(433);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Time = exports.Time = function Time(props) {
	  return _react2.default.createElement(
	    'div',
	    null,
	    _react2.default.createElement(
	      'p',
	      { className: 'lead text-info' },
	      'Time: ',
	      (0, _timeUtils.timeStringify)(props.time)
	    ),
	    _react2.default.createElement(
	      'p',
	      { className: 'lead text-info' },
	      'Total Memory: ',
	      props.memory
	    ),
	    _react2.default.createElement(
	      'button',
	      { type: 'button', className: 'btn btn-default', onClick: function onClick() {
	          var timer = setInterval(props.addTime, props.delay || 200);
	          props.startScheduling(timer);
	        } },
	      'start'
	    ),
	    _react2.default.createElement(
	      'button',
	      { type: 'button', className: 'btn btn-default', onClick: props.pauseScheduling },
	      'pause'
	    ),
	    _react2.default.createElement(
	      'button',
	      { type: 'button', className: 'btn btn-default', onClick: function onClick() {
	          props.pauseScheduling();
	          props.resetStates();
	        } },
	      'reset'
	    )
	  );
	};
	
	Time.propTypes = {
	  time: _react2.default.PropTypes.number.isRequired,
	  memory: _react2.default.PropTypes.number.isRequired,
	  delay: _react2.default.PropTypes.number,
	  resetStates: _react2.default.PropTypes.func.isRequired,
	  addTime: _react2.default.PropTypes.func.isRequired,
	  startScheduling: _react2.default.PropTypes.func.isRequired,
	  pauseScheduling: _react2.default.PropTypes.func.isRequired
	};
	
	exports.default = Time;

/***/ },

/***/ 440:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(356);
	
	var _Processes = __webpack_require__(441);
	
	var _Processes2 = _interopRequireDefault(_Processes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    processes: state.scheduling.control.processes
	  };
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(_Processes2.default);

/***/ },

/***/ 441:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Processes = undefined;
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Jcb = __webpack_require__(432);
	
	var _Jcb2 = _interopRequireDefault(_Jcb);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Processes = exports.Processes = function Processes(props) {
	  return _react2.default.createElement(
	    'div',
	    null,
	    _react2.default.createElement(
	      'h3',
	      null,
	      'Processes'
	    ),
	    _react2.default.createElement(
	      'table',
	      { className: 'table table-condensed table-bordered' },
	      _react2.default.createElement(
	        'thead',
	        null,
	        _react2.default.createElement(
	          'tr',
	          null,
	          _react2.default.createElement(
	            'td',
	            null,
	            'name'
	          ),
	          _react2.default.createElement(
	            'td',
	            null,
	            'arrive time'
	          ),
	          _react2.default.createElement(
	            'td',
	            null,
	            'service time'
	          ),
	          _react2.default.createElement(
	            'td',
	            null,
	            'start Time'
	          ),
	          _react2.default.createElement(
	            'td',
	            null,
	            'worked Time'
	          ),
	          _react2.default.createElement(
	            'td',
	            null,
	            'memory'
	          ),
	          _react2.default.createElement(
	            'td',
	            null,
	            'tap drive number'
	          )
	        )
	      ),
	      _react2.default.createElement(
	        'tbody',
	        null,
	        props.processes.map(function (process, index) {
	          return _react2.default.createElement(_Jcb2.default, { key: 'process' + index, jcb: process, index: index });
	        })
	      )
	    )
	  );
	};
	
	Processes.propTypes = {
	  processes: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object).isRequired
	};
	
	exports.default = Processes;

/***/ },

/***/ 442:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _redux = __webpack_require__(202);
	
	var _control = __webpack_require__(420);
	
	var _control2 = _interopRequireDefault(_control);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (0, _redux.combineReducers)({
	  control: _control2.default
	});

/***/ }

});
//# sourceMappingURL=2.scheduling.08d722927e0ebf221a20.js.map