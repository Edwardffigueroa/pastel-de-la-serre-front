import React from 'react'

import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = props => (
    <ul onClick={props.clicked} style={props.height ? { height: 'auto' } : null} className={classes.NavigationItems}>
        <NavigationItem goSection={props.goSection} active={props.currentActive === 0 ? true : false} link={0}>Notre Histoire</NavigationItem>
        <NavigationItem goSection={props.goSection} active={props.currentActive === 1 ? true : false} link={1}>Visitez Nous</NavigationItem>
        <NavigationItem goSection={props.goSection} active={props.currentActive === 0 ? true : false} link={2}>Boutique</NavigationItem>
    </ul>
)

export default navigationItems