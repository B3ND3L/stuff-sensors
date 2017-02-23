
import SensorClient from '../api/SensorClient'

import ActionTypes from '../types/ActionTypes'


import SensorType from '../types/SensorType'

import  {
  BROKER_DISCONNECTED,
  BROKER_CONNECTED,
  BROKER_CONNECTING
} from '../types/BrokerStates'

import  {
  INFO,
  ERROR
} from '../types/MessageLevel'

const {
  CHANGE_BROKER_STATUS,
  ADD_SENSOR_VALUE,
  ADD_MESSAGE,
  DISMISS_MESSAGE
} = ActionTypes



export const message = (message, level) => (dispatch) => {
  dispatch({type:ADD_MESSAGE, text: message, level})
  return new Promise((resolve, reject) =>(setTimeout(resolve, 5000)))
  .then(()=>(
    dispatch({type:DISMISS_MESSAGE})
  ))
}

export const disconnectFromBroker =  (url) => (dispatch) => (
  SensorClient.disconnect().then(
    () => ({type:CHANGE_BROKER_STATUS, status: BROKER_DISCONNECTED, url})
  )
)


export const connectToBroker =  (url) => (dispatch) => {
  dispatch({type: CHANGE_BROKER_STATUS, status: BROKER_CONNECTING, url});
  return SensorClient.disconnect()
  .then(() => {
    SensorClient.connect();
    SensorClient.connectedCallback =  () => {
      dispatch({type:CHANGE_BROKER_STATUS, status: BROKER_CONNECTED, url})
      dispatch(message("Connected to mqtt broker: "+url, INFO))
    }
    SensorClient.disconnectedCallback =  (msg) => {
      dispatch({
        type:CHANGE_BROKER_STATUS,
        status: BROKER_DISCONNECTED,
        url
      })
      dispatch(message("Disconnected from mqtt broker:"+ url, ERROR))
    }
    SensorClient.dataCallback =  (data) => {
      let spl = data.topic.match(/value\/(.*)/)
      if(spl != null) {
        dispatch({type: ADD_SENSOR_VALUE, id: spl[1], dataType: SensorType[data.payload.type], value: data.payload.value});
      }
      else {
        console.log('error')
      throw new Error("Nope connectToBroker")
      }

    }
  });
}
