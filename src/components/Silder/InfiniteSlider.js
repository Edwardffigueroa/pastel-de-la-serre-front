import React from 'react';
import classes from './InfiniteSlider.module.css'

import Slider from './Slider.js'
import Card from '../../components/UI/Card/Card'
import { a } from 'react-spring'

const InfiniteSlider = props => {
    return (
        <div className={classes.InfiniteSlider}>
            <Slider items={props.items} visible={10}>
                {(item, i) => {
                    console.log(item.download_url)
                    return (
                        <div className={classes.Content}>
                            <span className={classes.Marker}>{String(i).padStart(2, '0')}</span>
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
