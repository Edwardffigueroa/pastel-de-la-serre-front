import React from 'react';
import classes from './InfiniteSlider.module.css'

import Slider from './Slider.js'
import Card from '../../components/UI/Card/Card'
import Stars from '../../components/Stars/Stars'
import { a } from 'react-spring'

const InfiniteSlider = props => {
    return (
        <div className={classes.InfiniteSlider}>
            <Slider items={props.items} visible={10}>
                {(item, i) => {
                    console.log(item.download_url)
                    return (
                        <div className={classes.Content}>
                            <div className={classes.Marker}>
                                <h3>Title</h3>
                                <Stars />
                            </div>
                            <a.div className={classes.Image}>
                                <Card image={item.download_url} >
                                </Card>
                            </a.div>
                        </div>
                    )
                }}
            </Slider>
        </div>
    );
}

export default InfiniteSlider;
