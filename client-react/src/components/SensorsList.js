import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import SensorItem from './SensorItem'

import './SensorsList.css'

const SensorsList = ({sensors}) => {
  let listOf = sensors.map( (sensor) => {return (<SensorItem
      key={sensor.id}
      {...sensor}
    />)})
  if(listOf.length === 0) {
    listOf = (<h3>&empty;</h3>);
  }
  return (
    <div className="SensorsList">
      <h2> Sensors </h2>
      <ul>
        {listOf}
      </ul>
    </div>
  )
}

SensorsList.PropTypes = {
  sensors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.bool.isRequired,
    type: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
  }).isRequired).isRequired
}


export default connect(
    (state) => (
      {
        sensors: state.sensors
      })
  )(SensorsList)
