import React from 'react'
import classes from './NavigationItem.module.css'

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <span
            onClick={e => props.goSection(props.link)}
            exact={props.exact}
            className={props.active ? classes.active : ' '}>{props.children}</span>
    </li>
);

export default navigationItem