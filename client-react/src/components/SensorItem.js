import React from 'react'
import AppNavLink from './AppNavLink'

const liStyle = {
  margin:'1em'
}
const SensorItem = ({id, name}) => (
  <li style={liStyle}>
    <AppNavLink  to={`/livefeed/${id}`}>{name}</AppNavLink>
  </li>
)
export default SensorItem
