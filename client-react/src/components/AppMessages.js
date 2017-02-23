import  React from 'react'
import { connect }  from 'react-redux'

import './AppMessages.css'

const AppMessages = ({message, level}) => (
  <div className="AppMessages">
    <span className={level}>{message}</span>
  </div>
)

export default connect(
  (state) => ({
    message: state.message.text,
    level: state.message.level
  }),
  {})(AppMessages)
