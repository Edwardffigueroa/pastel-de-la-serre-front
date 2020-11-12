import React from 'react'

import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = props => (
    <ul onClick={props.clicked} style={props.height ? { height: 'auto' } : null} className={classes.NavigationItems}>
        {props.options ? props.options.map((option, index) => (
            <NavigationItem
                key={option.option}
                label={option.option}
                link={index}
                goSection={props.goSection}
                active={props.currentActive === index ? true : false}>{option.option}</NavigationItem>
        )) : null}
    </ul>
)

export default navigationItems