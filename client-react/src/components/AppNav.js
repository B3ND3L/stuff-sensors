import React from "react"
import AppNavLink from "./AppNavLink"
import './AppNav.css'

const AppNav = () => (
  <nav className="AppNav">
    <ul>
      <li><AppNavLink to="livefeed">Real Time Sensors</AppNavLink></li>
      <li><AppNavLink to="other">Other</AppNavLink></li>
      <li><AppNavLink to="other">Bof</AppNavLink></li>
    </ul>
  </nav>
)

export default AppNav
