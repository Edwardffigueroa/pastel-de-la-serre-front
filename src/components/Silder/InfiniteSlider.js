import React from 'react';
import classes from './InfiniteSlider.module.css'

import Slider from './Slider.js'
import Card from '../../components/UI/Card/Card'
import { a } from 'react-spring'
import DeviceType from '../../utils/DeviceType'


const InfiniteSlider = props => {

    const device = DeviceType()
    let _width, _height

    switch (device.type) {
        // Expected plus 20 padding each side. 
        case 'smallest':
            _width = 168 + 40
            _height = 215
            break;
        case 'small':
            _width = 187 + 40
            _height = 215
            break;
        case 'tablet':
            _width = 224 + 40
            _height = 373
            break;
        case 'desktop':
            _width = 202 + 40
            _height = 226
            break;
        case 'large':
            _width = 360 + 40
            _height = 484
            break;
        default:
            _width = 202 + 40
            _height = 226
            break;
    }

    return (
        <div className={classes.InfiniteSlider}>
            <Slider width={_width} itemHeight={_height} items={props.items} visible={10}>
                {(item, i) => {
                    return (
                        <div key={i} className={classes.Content}>
                            <a.div className={classes.Image}>
                                <Card
                                    id={i}
                                    title={item.title}
                                    clicked={props.goToDetail}
                                    image={item.download_url} >
                                    {/* Nested content possible */}
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
