import React from 'react'
import { connect } from 'react-redux'

import { connectToBroker, disconnectFromBroker } from '../actions'

import  {
  BROKER_CONNECTED,
  BROKER_CONNECTING
} from '../types/BrokerStates'

import './Broker.css'

const Broker = ( {broker, connectTo, disconnectFrom, status} ) => {
  let element;
console.log( broker, connectTo, disconnectFrom, status);
  let cb;
  let statusText;
  let connecting;
  switch(status){
    case BROKER_CONNECTED:
      connecting = false;
      statusText = 'Disconnect';
      cb = (event) => {
        event.preventDefault();
        disconnectFrom(element.value);
      }
      break;
    case BROKER_CONNECTING:
      connecting = true;
      statusText= 'Connecting...'
      cb = null;
      break;
    default:
      connecting = false;
      statusText= 'Connect'
      cb = (event) => {
        event.preventDefault();
        connectTo(element.value);
      }
  }
  return (
    <form
      className='Broker'
      onSubmit={cb} >
      <label>MQTT Broker: </label>
      <input
        ref={e => {element = e}}
        type="text"
        onChange={(event)=>{console.log('change', event)}}
        placeholder="ws://localhost:1234"
        value={broker}
      />
    <input type="submit" value={statusText}  disabled={connecting} />
  </form>
  )
}

Broker.propTypes = {
  broker: React.PropTypes.string.isRequired,
  status: React.PropTypes.string.isRequired,
  connectTo: React.PropTypes.func.isRequired,
  disconnectFrom: React.PropTypes.func.isRequired,
}

export default connect(
  (state) => ({
    broker: state.broker.url,
    status: state.broker.status
  }),
  (dispatch) => (
    {
      connectTo: (url) => {
        dispatch(connectToBroker(url))
      },
      disconnectFrom: (url) => {
        dispatch(disconnectFromBroker(url))
      },
    }
  )
)(Broker)
