import React from 'react';
import classes from './Card.module.css';

const Card = props => {
    return (
        <div className={classes.Card} style={{ backgroundImage: `url("${props.image}"` }}>
            {props.children}
        </div>
    );
}

export default Card;
