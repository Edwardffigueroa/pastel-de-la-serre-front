import React from 'react';
import classes from './Card.module.css'

import Stars from '../../Stars/Stars'
import { useHistory } from 'react-router-dom'
const Card = props => {

    const { index } = props
    const history = useHistory()
    const colorOption = { background: 'lightgray' }
    const responsiveWidth = props.noFlag ? { flexBasis: '100%' } : { flexBasis: '80%' }
    const isDetailView = props.detailView ? [classes.Marker, classes.DetailView].join(' ') : [classes.Marker]

    return (
        <div onClick={e => props.clicked(e, history, props.id)} className={classes.Card} style={colorOption}>
            <section className={classes.Header}>
                <div className={isDetailView} style={responsiveWidth}>
                    <h3 className={classes.Title}>{props.title}</h3>
                    <Stars />
                </div>
                {
                    !props.noFlag
                        ? <div className={classes.Flag}></div>
                        : null
                }
            </section>
            <div className={classes.Selected}></div>
            {props.children}
        </div>
    );
}

export default Card;
