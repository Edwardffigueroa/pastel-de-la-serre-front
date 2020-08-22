import React from 'react'

import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = props => (
    <ul style={props.height ? { height: 'auto' } : null} className={classes.NavigationItems}>
        {/* <NavigationItem link="/notre-histoire" exact>Notre Histoire</NavigationItem> */}
        {/* <NavigationItem link="/visitez-nous" exact>Visitez Nous</NavigationItem>
        <NavigationItem link="/boutique">Boutique</NavigationItem> */}
    </ul>
)

export default navigationItems