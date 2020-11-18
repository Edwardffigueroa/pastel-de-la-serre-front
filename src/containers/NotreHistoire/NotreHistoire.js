import React, { useState, useEffect, lazy, Suspense } from 'react'

import classes from './NotreHistoire.module.css'
import Shadow from '../../components/UI/Shadow/Shadow'
import Button from '../../components/UI/Button/Button'
import RowsNavigation from '../../components/Navigation/RowsNavigation/RowsNavigation'


import DotNav from '../../components/Navigation/DotNav/DotNav'

import Layout from '../../hoc/layout/Layout'

import Card from '../../components/UI/Card/Card'

import Swiper from 'swiper'
import 'swiper/swiper-bundle.css'
import Checkout from '../Checkout/Checkout'

import Cart from '../../utils/Cart'
import DetailView from '../../components/DetailView/DetailView'

const NotreHistoire = ({ match, history, general, histoire, visit, boutique, shopItems }) => {
    const [lang, setLang] = useState('fr')

    const generalTrans = general.Contents.filter(content => content.abbreviation === lang)[0]
    const histoireTrans = histoire.Contents.filter(content => content.abbreviation === lang)[0].Content
    const visitTrans = visit.Content.filter(content => content.abbreviation === lang)[0].Travels
    const shopTrans = boutique.Boutique_content.filter(content => content.abbreviation === lang)[0].Boutique_detail

    const [slide, setSlide] = useState(1)
    // const [items, setItems] = useState(generalTrans.hero)
    const [items, setItems] = useState([...generalTrans.hero, ...generalTrans.hero])
    const slidersCards = [...generalTrans.slider_navigation, ...generalTrans.slider_navigation];

    const current = items[slide]
    // console.log(current)
    // console.log(slidersCards)

    const [tours, setTours] = useState(visitTrans)

    const [itemSelected, setItemSelected] = useState(false);
    const [indexSelected, setIndexSelected] = useState(0)

    const [products, setProducts] = useState([])
    useEffect(() => {


        const _prevProds = Cart.getProducts().map(prod => {
            const _found = shopItems.find(pr => pr.id === prod.id)
            if (_found) {
                if (_found.price !== prod.price) {
                    prod.price = _found.price
                }
            }
            return prod
        })

        const totalPrice = _prevProds.reduce((acc, prod, index) => {
            const _amount = Object.values(prod.amount)
            acc += (_amount * prod.price)
            return acc
        }, 0)

        setProducts(_prevProds)
        Cart.setProducts(_prevProds, totalPrice)
        setSlide(0)
    }, [])

    let mySwiper = new Swiper(".swiper-container", {
        initialSlide: slide,
        speed: 700,
        slidesPerView: 4,
        spaceBetween: 50,
        loop: false,
        centeredSlides: true,
        slideActiveClass: 'swiper-slide-active',
        slidePrevClass: 'swiper-slide-prev',
        breakpoints: {
            "@1.5": {
                spaceBetween: 0,
                slidesPerView: 4
            },
            1080: {
                spaceBetween: 10,
                slidesPerView: 4
            },
            1000: {
                slidesPerView: 4
            },
            760: {
                spaceBetween: -150,
                slidesPerView: 4
            },
            320: {
                spaceBetween: 0,
                slidesPerView: 3,
            },
            120: {
                spaceBetween: 0,
                slidesPerView: 2,
            }
        },
    })

    const handlerNewItem = (item) => {
        //     console.log(item);
        //     const ref = items[item]
        //     console.log(ref)
        //     const arr = [...items, ...items];
        //    setItems([...items, ref]);
        //     console.log(arr)
    }

    const changeSlide = (value) => {
        setSlide(value)
        mySwiper.update()
    }

    const goSectionHandler = number => {
        console.log(number)
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

            // if (swiper.activeIndex === 1) {
            //     console.log("finish")
            //     handlerNewItem(0)
            // }

            if (swiper.realIndex === 5 || slide === 5) {
                swiper.allowSlideNext = false

            } else {
                swiper.allowSlideNext = true
            }

            changeSlide(swiper.activeIndex)
        });
    }

    const goToDetail = (e, index, id) => {
        console.log("index", index);
        console.log("id", id);
        console.log("current", current.id);

        // const _index = items.findIndex(item => item.id === id)
        // if (_index === slide) {

        //     if (_index === 0) {
        //         console.log(histoireTrans)
        //         setItemSelected(histoireTrans)
        //         setIndexSelected(_index)
        //     }

        //     if (_index === 1) {
        //         const selected = tours.find(item => item.id === 1)
        //         setItemSelected(selected)
        //         setIndexSelected(0)
        //     }

        //     if (_index === 2) {
        //         setItemSelected(shopTrans)
        //         setIndexSelected(0)
        //     }

        // } else {
        //     mySwiper.slideTo(index)
        // }

        const _index = items.findIndex(item => item.id === id)

        if (current.id === id) {

            if (id === 1) {
                console.log(histoireTrans)
                setItemSelected(histoireTrans)
                setIndexSelected(_index)
            }

            if (id === 2) {
                const selected = tours.find(item => item.id === 1)
                console.log(selected)
                setItemSelected(selected)
                setIndexSelected(0)
            }

            if (id === 3) {
                setItemSelected(shopTrans)
                setIndexSelected(0)
            }

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
            if (slide === 1 || slide === 4) {
                _i = _i === 0 ? (visitTrans.length - 1) : (indexSelected - 1)
            }
            if (slide === 2 || slide === 5) {
                _i = _i === 0 ? (shopItems.length - 1) : (indexSelected - 1)
            }
        } else if (direction === 'foward') {
            if (slide === 1 || slide === 4) {
                _i = _i === (visitTrans.length - 1) ? 0 : (indexSelected + 1)
            }
            if (slide === 2 || slide === 5) {
                _i = _i === (shopItems.length - 1) ? 0 : (indexSelected + 1)
            }
        } else {
            _i = visitTrans.findIndex(visit => visit.id === direction)
        }

        if (slide === 1 || slide === 4) {
            setItemSelected(visitTrans[_i])
        } else {
            setItemSelected(shopItems[_i])
        }

        setIndexSelected(_i)
    }

    const rowsHandler = direction => {

        if (direction === 'foward' && mySwiper.realIndex !== 5) {
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
                history.push('/booking')
                break;
            case 1:
                setItemSelected(visitTrans[0])
                setIndexSelected(0)
                break;
            case 2:
                setItemSelected(shopItems[0])
                setIndexSelected(0)
                break;
            default:
                setItemSelected(shopItems[0])
                setIndexSelected(0)
                break;
        }
    }


    const goBooking = e => history.push('/booking')

    const addItemHandler = product => {
        setProducts(prev => ([...prev, product]))
        Cart.addItem(product)
    }

    const refreshCartStateHandler = _prods => {
        setProducts(_prods)
    }

    const languageHandler = lang => setLang(lang)

    const myClasses = itemSelected
        ? [classes.Wrapper, classes.WrapperOnTop].join(' ')
        : [classes.Wrapper].join('')


    let background = ' '
    if (items.length > 0) {
        console.log("intem", itemSelected)
        if (itemSelected && (slide === 5 || slide === 2)) {
            background = `url(${shopTrans.Background_image.url})`
        }

        if (itemSelected && (slide === 0 || slide === 1 || slide === 3 || slide === 4)) {
            background = `url(${itemSelected.background_image.url})`

        }
        // console.log(current)

        if (!itemSelected) {
            background = `url(${current.background_hero.url})`
        }
    }

    return (
        <Layout
            products={products}
            currentActive={slide}
            languageHandler={languageHandler}
            goSectionHandler={goSectionHandler}
            goCartHandler={goCartHandler}
            goHomeHandler={goHomeHandler}
            navOptions={generalTrans.Navigation}
        >
            <div className={myClasses} style={{ backgroundPosition: 'center', backgroundImage: background, overflow: 'hidden' }}>
                <DotNav
                    hide={itemSelected}
                    current={current.id}
                    goSectionHandler={goSectionHandler} />
                <Shadow />
                <section>
                    <div className={classes.TitleWrapper}>
                        <h1>{current.title_1}<br />{current.title_2}<br />{current.title_3}</h1>
                        <p>{current.description}</p>
                        <Button
                            clicked={CTAHandler}
                            invert={slide === 2 || slide === 5 ? true : false}>{current.button_name} </Button>
                    </div>
                </section>
                <section className={classes.SectionSliderWrapper}>
                    <div className="swiper-container" style={{ width: '154%' }}>
                        <div className="swiper-wrapper">
                            {items.map((item, i) => {
                                return (
                                    <div key={i} className={"swiper-slide"}>
                                        <Card
                                            key={i}
                                            index={i}
                                            active={slide}
                                            id={item.id}
                                            title={slidersCards[i].subtitle}
                                            image={slidersCards[i].image.formats.small.url}
                                            clicked={goToDetail}>
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
                        lang={lang}
                        products={shopItems}
                        shop={shopTrans}
                        visits={[...visitTrans, ...visitTrans]}
                        tours={itemSelected}
                        histoireTitle={[histoireTrans.title1, histoireTrans.title2, histoireTrans.title3]}
                        histoire={histoireTrans.body}
                        items={tours}
                        index={indexSelected}
                        currentActive={slide}
                        img={itemSelected.cover_image ? itemSelected.cover_image.url : itemSelected}
                        title={[itemSelected.title1, itemSelected.title2, itemSelected.title3]}
                        time={itemSelected.time}
                        people={itemSelected.people}
                        level={itemSelected.type}
                        description={itemSelected.description}
                        goBooking={goBooking}
                        addItem={addItemHandler}
                        changeItem={changeItemHandler}
                        closed={e => setItemSelected(false)}
                    />
                ) : null}
            </div>
            {!match.isExact ? <Checkout
                background={`url('${shopTrans.Background_image.url}')`}
                _products={products}
                refreshCartState={refreshCartStateHandler} /> : null}
        </Layout >
    );
}

export default NotreHistoire
