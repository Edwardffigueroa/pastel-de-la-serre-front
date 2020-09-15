import React, { useState } from 'react';
import classes from './Button.module.css'

import row from '../../../assets/images/nav/row.svg'
import row2 from '../../../assets/images/nav/row2.svg'



const Button = props => {
    let myClasses = [classes.Button]

    if (props.detailed) {
        myClasses = [classes.Button, classes.ButtonDetail].join(' ')
    }

    if (props.isOverImage) {
        myClasses = [classes.Button, classes.ButtonOverImage].join(' ')
    }

    const [arrow, setArrow] = useState(false);

    const mouseover = () => {
        setArrow(true);

    }
    const mouseout = () => {
        setArrow(false);
    }

    return <button
        onMouseOver={mouseover}
        onMouseOut={mouseout}
        className={myClasses}
        onClick={props.clicked}>
        {props.children}
        <span className={classes.Row}></span>
    </button>
}

export default Button;
