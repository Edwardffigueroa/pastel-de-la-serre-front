import React, { useEffect, useState } from 'react';
import classes from './InfiniteSlider.module.css'
// import Slider from "@farbenmeer/react-spring-slider";

import Slider from './Slider.js'
import Card from '../../components/UI/Card/Card'
import DeviceType from '../../utils/DeviceType'

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import Slider from "react-slick";

const InfiniteSlider = props => {

    const { width, height } = DeviceType()
    const [_w, setWidth] = useState(width)
    const settings = {
        className: classes.Wrapper,
        centerMode: false,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    const nosotros = props.items.map((item, index) => (
        <div className={classes.CardWrapper}>
            <Card
                key={index}
                index={index}
                id={item._id}
                title={item.title}
                clicked={props.goToDetail}
                detailView={props.detailView}
                image={item.download_url} >
            </Card>
        </div>
    ))
    const isDetailView = props.detailView ? { h: 147, w: 250 + 40 } : null
    const myClasses = props.detailView ? [classes.DetailView, classes.InfiniteSlider].join(' ') : classes.InfiniteSlider
    
    useEffect(() => {
        setWidth(width)
    }, [width])

    return (
        <div className={myClasses}>
            <Slider items={props.items} width={!props.detailView ? _w + 20 : isDetailView.w} height={props.isDetailView ? isDetailView.h : null}>
                {({ _id, title, download_url }, index) => (
                    <Card
                        key={index}
                        index={index}
                        id={_id}
                        title={title}
                        clicked={props.goToDetail}
                        detailView={props.detailView}
                        image={download_url}>
                    </Card>
                )}
            </Slider>
        </div>
    )
}

export default InfiniteSlider;
