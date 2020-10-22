import React, { useState, useEffect } from 'react'

import classes from './NotreHistoire.module.css'
import Shadow from '../../components/UI/Shadow/Shadow'
import Button from '../../components/UI/Button/Button'
import RowsNavigation from '../../components/Navigation/RowsNavigation/RowsNavigation'
import InfiniteSlider from '../../components/Silder/InfiniteSlider'

import { Route, useRouteMatch } from 'react-router-dom'
import DetailView from '../../components/DetailView/DetailView'

import GoToDetails from '../../utils/GoToDetails'
import Slider from 'react-slick';
import Card from '../../components/UI/Card/Card'

// import { Swiper, SwiperSlide } from 'swiper/react'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const NotreHistoire = ({ match, history }) => {

    const [items, setItems] = useState([])
    const [itemSelected, setItemSelected] = useState(false);
    const [indexSelected, setIndexSelected] = useState(0)
    const innerMatch = useRouteMatch(`${match.path}/detail/:id`)

    useEffect(() => {
        fetch('../../data/home.json')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setItems(data)
            })
    }, [])


    const myClasses = innerMatch
        ? [classes.Wrapper, classes.WrapperOnTop].join(' ')
        : [classes.Wrapper].join('')

    const goToDetail = (e, history, id) => {
        const _index = items.findIndex(item => item._id === id)
        const selected = items.find(item => item._id === id)
        setItemSelected(selected)
        setIndexSelected(_index)
        GoToDetails(e, history, id)
    }

    const changeItemHandler = direction => {

        let _i = indexSelected
        if (direction === 'back') {
            _i = _i === 1 ? (items.length - 1) : (indexSelected - 1)
        } else {
            _i = _i === (items.length - 1) ? 0 : indexSelected + 1
        }
        setItemSelected(items[_i])
        setIndexSelected(_i)
    }


    // let mySwiper = new Swiper(classes.MySlider, {
    //     initialSlide: slide,
    //     slidesPerView: 3,
    //     spaceBetween: 20,
    //     centeredSlides: false,
    //     slideActiveClass: classes.MyActiveSlide,
    //     breakpoints: {
    //         "@1.5": {
    //             slidesPerView: 3
    //         },
    //         "@1.0": {
    //             slidesPerView: 2
    //         },
    //         "@0.25": {
    //             slidesPerView: 2
    //         }
    //     }
    // })

    const settings = {
        dots: false,
        className: classes.SliderItem,
        infinite: false,
        speed: 500,
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0
    };

    return (

        <div className={myClasses}>
            <Shadow />
            <section>
                <div className={classes.TitleWrapper}>
                    <h1>Plongez <br /> dans le pays<br /> de Cocagne</h1>
                    <p>Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit.
                    Nunc pulvinar finibus erat.
                    Vestibulum in nulla et quam gravida blandit.
                    Donec iaculis metus ullamcorper nisl consequat, in vulputate ante congue.
                    Nulla at rhoncus turpis. Aliquam molestie ex quam.</p>
                    <Button>Réservez </Button>
                </div>
            </section>
            <section className={classes.SectionSliderWrapper}>
                <Slider {...settings}>{

                    items.map(im => <Card title={im.title}></Card>)

                }</Slider>
                {/* <InfiniteSlider
                    items={items}
                    goToDetail={goToDetail} /> */}
                <RowsNavigation />
            </section>
            <Route
                path={`${match.path}/detail/:id`}
                render={() => (
                    <DetailView
                        items={items}
                        img={itemSelected.picture}
                        title={itemSelected.title}
                        time={itemSelected.time}
                        people={itemSelected.people}
                        level={itemSelected.level}
                        description={itemSelected.description}
                        changeItem={changeItemHandler} />
                )} />

        </div>
    );
}

export default NotreHistoire
