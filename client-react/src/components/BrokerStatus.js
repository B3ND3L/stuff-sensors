import React from 'react'
import { connect } from 'react-redux'

import './BrokerStatus.css'

const BrokerStatus = ({status}) => (
  <div className="BrokerStatus">
    <h4>Broker {status}</h4>
  </div>
)
export default connect(
    (state) => ({
      status : state.broker.status
    })
  )(BrokerStatus)
