import React from 'react'
import { Link } from 'react-router'

import './AppNavLink.css'

const AppNavLink =  (props) => (
    <Link {...props} className="AppNav-link" activeClassName="AppNav-link-active">{props.children}</Link>
)

export default AppNavLink
