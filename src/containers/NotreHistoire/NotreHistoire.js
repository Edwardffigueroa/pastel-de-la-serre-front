import React, { useState, useEffect } from 'react'

import classes from './NotreHistoire.module.css'
import Shadow from '../../components/UI/Shadow/Shadow'
import Button from '../../components/UI/Button/Button'
import RowsNavigation from '../../components/Navigation/RowsNavigation/RowsNavigation'


import DotNav from '../../components/Navigation/DotNav/DotNav'

import Layout from '../../hoc/layout/Layout'
import DetailView from '../../components/DetailView/DetailView'

import Card from '../../components/UI/Card/Card'

import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import Checkout from '../Checkout/Checkout'
import detailProdBg from '../../assets/images/boutique/bg_datail_boutique.png'

const NotreHistoire = ({ match, history }) => {

    const [slide, setSlide] = useState(0)
    const [items, setItems] = useState([])

    const [itemSelected, setItemSelected] = useState(false);
    const [indexSelected, setIndexSelected] = useState(0)

    const [products, setProducts] = useState([])

    let mySwiper = new Swiper(".swiper-container", {
        initialSlide: slide,
        speed: 700,
        slidesPerView: 3,
        spaceBetween: 0,
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
                setSlide(0)
            })

        const _prods = localStorage.getItem('PRODUCTS')
        const _amnt = JSON.parse(_prods)
        if (_amnt.length > 0) {
            setProducts(_amnt)
        }
    }, [])



    const changeSlide = (value) => {
        console.log('ahora me lliaman ')
        setSlide(value)
        mySwiper.update()
    }

    const goSectionHandler = number => {
        setItemSelected(false)
        setSlide(number)
        mySwiper.slideTo(number)
        mySwiper.update()

        if (!match.isExact) {
            history.push('/')
        }
    }


    if (mySwiper) {
        mySwiper.on('slideChangeTransitionStart', swiper => {

            if (swiper.realIndex === 2) {
                swiper.allowSlideNext = false
            } else {
                swiper.allowSlideNext = true
            }

            changeSlide(swiper.activeIndex)
        });
    }

    const goToDetail = (e, index, id) => {
        const _index = items.findIndex(item => item._id === id)
        const selected = items.find(item => item._id === id)
        if (index === slide) {
            setItemSelected(selected)
            setIndexSelected(_index)
        } else {
            mySwiper.slideTo(index)
        }
    }

    const goCartHandler = () => {
        setItemSelected(false)
        history.push('/cart/checkout')
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

        if (direction === 'foward' && mySwiper.realIndex !== 2) {
            mySwiper.slideNext()
        }

        if (direction === 'back') {
            mySwiper.slidePrev()
        }

        mySwiper.update()
    }

    const goHomeHandler = e => {
        setItemSelected(false)
        setIndexSelected(0)
        history.push('/')
    }


    const CTAHandler = e => {
        switch (slide) {
            case 0:
                /// TODO -> Go to reservation 
                history.push('/booking')
                break;
            case 1:
                // TODO, Connect to the fetch data from the global tours 
                // const _index = items.findIndex(item => item._id === id)
                // const selected = items.find(item => item._id === id)  
                const selected = items[1]
                setItemSelected(selected)
                setIndexSelected(1)
                break;
            case 2:
                setItemSelected(items[2])
                setIndexSelected(2)
                break;
            default:
                setItemSelected(items[1])
                setIndexSelected(1)
                break;
        }
    }


    const goBooking = e => history.push('/booking')


    const myClasses = itemSelected
        ? [classes.Wrapper, classes.WrapperOnTop].join(' ')
        : [classes.Wrapper].join('')


    let background = ' '
    if (items.length > 0) {
        if (itemSelected && slide === 2) {
            console.log('sisaaaa', detailProdBg)
            background = `url(${detailProdBg})`
        } else {
            background = `url(${items[slide].background})`
        }
    }

    return (
        <Layout
            products={products}
            currentActive={slide}
            goSectionHandler={goSectionHandler}
            goCartHandler={goCartHandler}
            goHomeHandler={goHomeHandler}>
            <div className={myClasses} style={{ backgroundPosition: 'center', backgroundImage: background }}>
                <DotNav
                    hide={itemSelected}
                    current={slide}
                    goSectionHandler={goSectionHandler} />
                <Shadow />
                <section>
                    <div className={classes.TitleWrapper}>
                        <h1>{items.length > 0 ? items[slide].title : 'Plongez <br /> dans le pays<br /> de Cocagne'}</h1>
                        <p>{items.length > 0 ? items[slide].description : 'Plongez <br /> dans le pays<br /> de Cocagne'}</p>
                        <Button
                            clicked={CTAHandler}
                            invert={slide === 2 ? true : false}>{items.length > 0 ? items[slide].button : 'Réservez'} </Button>
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
                {itemSelected ? (
                    <DetailView
                        items={items}
                        currentActive={slide}
                        index={indexSelected}
                        goBooking={goBooking}
                        time={itemSelected.time}
                        title={itemSelected.title}
                        level={itemSelected.level}
                        img={itemSelected.picture}
                        people={itemSelected.people}
                        changeItem={changeItemHandler}
                        closed={e => setItemSelected(false)}
                        description={itemSelected.description}
                        addItem={e => console.log('agregando: ', e)}
                    />) : null}
            </div>
            {!match.isExact ? <Checkout /> : null}
        </Layout >
    );
}

export default NotreHistoire
