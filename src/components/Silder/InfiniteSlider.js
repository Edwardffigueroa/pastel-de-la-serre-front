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
            _height = 339
            break;
        case 'desktop':
            _width = 202 + 40
            _height = 305
            break;
        case 'large':
            _width = 363 + 40
            _height = 550
            break;
        default:
            _width = 202 + 40
            _height = 305
            break;

    }


    const isDetailView = props.detailView ? { h: 147, w: 250 + 40 } : null
    const wrapperClasses = props.detailView ? [classes.InfiniteSliderDetail] : [classes.InfiniteSlider]

    return (
        <div className={wrapperClasses}>
            <Slider width={isDetailView ? isDetailView.w : _width} itemHeight={isDetailView ? isDetailView.h : _height} items={props.items} visible={10}>
                {(item, i) => {
                    return (
                        <div key={i} className={classes.Content}>
                            <a.div className={classes.Image}>
                                <Card
                                    id={i}
                                    title={item.title}
                                    clicked={props.goToDetail}
                                    detailView={props.detailView}
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
