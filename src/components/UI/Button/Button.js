import React from 'react';
import classes from './Button.module.css'

import row from '../../../assets/images/nav/row.svg'
import row2 from '../../../assets/images/nav/row2.svg'



const Button = props => {
    const myClasses = [classes.Button, props.type].join(' ')
    let color = window.innerWidth > 500 ? row : row2

    return <button
        className={myClasses}
        onClick={props.clicked}>
        {props.children}
        <img className={classes.Row} src={color} alt="Go, prochaine" />
    </button>
}

export default Button;
