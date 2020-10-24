import React, { useState, useEffect } from 'react'

import classes from '../VisitezNous/VisitezNous.module.css'
import Shadow from '../../components/UI/Shadow/Shadow'
import Button from '../../components/UI/Button/Button'
import RowsNavigation from '../../components/Navigation/RowsNavigation/RowsNavigation'


import DotNav from '../../components/Navigation/DotNav/DotNav'

import { Route, useRouteMatch } from 'react-router-dom'
import DetailView from '../../components/DetailView/DetailView'

import GoToDetails from '../../utils/GoToDetails'
import Card from '../../components/UI/Card/Card'

import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';


const NotreHistoire = ({ match, history }) => {

    const [slide, setSlide] = useState(0)
    const [items, setItems] = useState([])

    const [itemSelected, setItemSelected] = useState(false);
    const [indexSelected, setIndexSelected] = useState(0)
    const innerMatch = useRouteMatch(`${match.path}/detail/:id`)

    let mySwiper = new Swiper(".swiper-container", {
        initialSlide: slide,
        speed: 700,
        slidesPerView: 3,
        spaceBetween: 50,
        loop: false,
        centeredSlides: true,
        slideActiveClass: 'swiper-slide-active',
        slidePrevClass: 'swiper-slide-prev',
        breakpoints: {
            "@1.5": {
                slidesPerView: 3,
            },
            "@1.0": {
                slidesPerView: 3,
            },
            760: {
                slidesPerView: 3,
            },
            320: {
                slidesPerView: 2,
            }
        },
    })


    useEffect(() => {
        fetch('../../data/home.json')
            .then(res => res.json())
            .then(data => {
                setItems(data)

                if (match.path === '/notre-histoire' || match.path === '/') {
                    setSlide(0)
                }

                if (match.path === '/visitez-nous') {
                    setSlide(1)
                }

                if (match.path === '/boutique') {
                    setSlide(2)
                }

            })

        return () => {
            mySwiper = null
        }
    }, [])


    const changeSlide = (value) => {
        setSlide(value)
        mySwiper.update()
    };


    if (mySwiper) {
        mySwiper.on('slideChangeTransitionStart', swiper => {
            changeSlide(swiper.activeIndex)
        });
    }


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

    const rowsHandler = direction => {

        if (direction === 'foward') {
            mySwiper.slideNext()
        }

        if (direction === 'back') {
            mySwiper.slidePrev()
        }

        mySwiper.update()
    }

    const myClasses = innerMatch
        ? [classes.Wrapper, classes.WrapperOnTop].join(' ')
        : [classes.Wrapper].join('')

    return (
        <div className={myClasses} style={{ backgroundPosition: 'center', backgroundImage: items.length > 0 ? `url(${items[slide].background})` : ' ' }}>
            <DotNav current={slide} />
            <Shadow />
            <section>
                <div className={classes.TitleWrapper}>
                    <h1>{items.length > 0 ? items[slide].title : 'Plongez <br /> dans le pays<br /> de Cocagne'}</h1>
                    <p>{items.length > 0 ? items[slide].description : 'Plongez <br /> dans le pays<br /> de Cocagne'}</p>
                    <Button>Réservez </Button>
                </div>
            </section>
            <section className={classes.SectionSliderWrapper}>
                <div className="swiper-container" style={{ width: '130%' }}>
                    <div className="swiper-wrapper">
                        {items.map((item, i) => {
                            return (
                                <div key={i} className="swiper-slide">
                                    <Card
                                        key={i}
                                        index={i}
                                        active={slide}
                                        id={item._id}
                                        title={item.title}
                                        image={item.picture}
                                        clicked={goToDetail}
                                        hide={i === items.length - 1 ? true : false}>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <RowsNavigation goHandler={rowsHandler} />
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
