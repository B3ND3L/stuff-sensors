import ActionTypes from '../types/ActionTypes'
import { combineReducers } from 'redux'

import SensorType from '../types/SensorType'
import { BROKER_DISCONNECTED } from '../types/BrokerStates'

const MAX_DATA = 10;

/// STATE
// {
//   message: {
//     text: 'blah',
//     level: 'INFO'
//   },
//   broker: {
//     url : 'ws://localhost:4080',
//     status: 'BROKER_DISCONNECTED',
//   },
//   sensors: [
//     {
//        id: '1',
//        name: 'Température Bureau',
//        type: SensorType.TEMPERATURE,
//        data: [20,18,19,21]
//     },
//     {
//        id: '2',
//        name: 'Ventilation',
//        type: SensorType.SWITCH,
//        data: [Value.ON, Value.OFF, Value.ON, Value.OFF]
//     }
//   ]
// }

const message = (state= {text:'', level: 'INFO' }, action) => {
  switch(action.type) {
    case  ActionTypes.ADD_MESSAGE:
      console.log(state, action)
      return Object.assign({}, state,  {text: action.text, level: action.level});
    case ActionTypes.DISMISS_MESSAGE:
      console.log(state, action)
      return Object.assign({}, state,  {text: '', level: 'INFO'});
    default: return state
  }
}

const broker = (state= {url:'', state: BROKER_DISCONNECTED }, action) => {
  switch(action.type) {
    case  ActionTypes.CHANGE_BROKER_STATUS :
      console.log(state, action)
      return Object.assign({}, state,  {url: action.url, status: action.status, message: action.message});
    default: return state
  }
}

const sensors = (state= [], action) => {
  switch(action.type) {
    case  ActionTypes.ADD_SENSOR_VALUE:
    let newSensor = {
      id: action.id,
      type: SensorType[action.dataType] || SensorType['TEXT']
    };

    let thatSensor = state.find( sensor => (sensor.id === action.id) );

    if (typeof thatSensor !== 'undefined') {
      if(thatSensor.data.length >= MAX_DATA) {
        newSensor.data = thatSensor.data.slice(1)
      } else {
        newSensor.data = thatSensor.data.slice(0)
      }
      newSensor.name = thatSensor.name
    } else {
      newSensor.name = action.id
      newSensor.data = []
    }
    newSensor.data.push(action.value)

    let others = state.filter( sensor => (sensor.id !== action.id) );

    //console.log(newSensor)

    others.push(newSensor)
    others.sort((s1, s2) => s1.id.localeCompare(s2.id));
    return others;

    default: return state
  }
}
export default combineReducers({
  message,
  broker,
  sensors
})
