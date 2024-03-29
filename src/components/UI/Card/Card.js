import React from 'react';
import classes from './Card.module.css'

import Stars from '../../Stars/Stars'
const Card = props => {

    const { index } = props
    const responsiveWidth = props.noFlag ? { flexBasis: '100%' } : { flexBasis: '80%' }
    const isDetailView = props.detailView ? [classes.Card, classes.DetailView].join(' ') : [classes.Card].join(' ')


    return (
        <div
            className={isDetailView}
            onClick={e => props.detailView
                ? props.clicked(e, index, props.id)
                : props.clicked(e, index, props.id)}
            style={{ backgroundImage: `url('${props.image}')` }}>

            <section className={classes.Header}>
                <div className={classes.Marker} style={responsiveWidth}>
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
