import React from 'react';
import classes from './Card.module.css';


const Card = props => {

    return (
        <div className={classes.Card} style={{ backgroundImage: `url("${props.image}"` }}>
            <div className={classes.Flag}></div>
            {props.children}
        </div>
    );
}

export default Card;
