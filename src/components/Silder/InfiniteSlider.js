import React from 'react';
import classes from './InfiniteSlider.module.css'

import Slider from './Slider.js'
import Card from '../../components/UI/Card/Card'
import Stars from '../../components/Stars/Stars'
import { a } from 'react-spring'
import DeviceType from '../../utils/DeviceType'


const InfiniteSlider = props => {

    const device = DeviceType()
    let _width, _height

    switch (device.type) {
        case 'smallest':
            _width = 168
            _height = 215
            break;
        case 'small':
            _width = 187
            _height = 215
            break;
        case 'tablet':
            _width = 224
            _height = 373
            break;
        case 'desktop':
            _width = 202
            _height = 226
            break;
        case 'large':
            _width = 360
            _height = 484
            break;
        default:
            _width = 202
            _height = 226
            break;
    }

    console.log(_width)

    return (
        <div className={classes.InfiniteSlider}>
            <Slider width={_width} itemHeight={_height} items={props.items} visible={10}>
                {(item, i) => {
                    console.log(item.download_url)
                    return (
                        <div key={i} className={classes.Content}>
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
