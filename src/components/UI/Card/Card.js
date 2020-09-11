import React from 'react';
import classes from './Card.module.css'

import Stars from '../../Stars/Stars'
import { useHistory } from 'react-router-dom'
const Card = props => {

    const history = useHistory()
    const colorOption = { background: 'lightgray' }

    return (
        <div onClick={e => props.clicked(e, history, props.id)} className={classes.Card} style={colorOption}>
            <section className={classes.Header}>
                <div className={classes.Marker}>
                    <h3 className={classes.Title}>Ballades dans Nos Champs</h3>
                    <Stars />
                </div>
                <div className={classes.Flag}></div>
            </section>
            <div className={classes.Selected}></div>
            {props.children}
        </div>
    );
}

export default Card;
