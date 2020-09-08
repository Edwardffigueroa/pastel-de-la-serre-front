import React from 'react';
import classes from './Card.module.css'

import Stars from '../../Stars/Stars'

const Card = props => {


    // const imageOption = { backgroundImage: `url("${props.image}"` }
    const colorOption = { background: 'lightgray' }

    return (
        <div className={classes.Card} style={colorOption}>
            <section className={classes.Header}>
                <div className={classes.Marker}>
                    <h3 className={classes.Title}>Ballades dans Nos Champs</h3>
                    <Stars />
                </div>
                <div className={classes.Flag}></div>
            </section>
            {props.children}
        </div>
    );
}

export default Card;
