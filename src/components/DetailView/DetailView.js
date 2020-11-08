import React, { useState, useEffect } from 'react'

import classes from './DetailView.module.css'
import CardList from '../CardList/CardList'

import closeX from '../../assets/detailView/close.svg'
import Button from '../UI/Button/Button'
import RowsNavigation from '../Navigation/RowsNavigation/RowsNavigation'

import { a, useSpring } from 'react-spring'
import Selected from '../Selected/Selected'
import IconList from './IconList/IconList'
import Histoire from '../Histoire/Histoire'

import Card from '../UI/Card/Card'
import Swiper from 'swiper'
import 'swiper/swiper-bundle.css'

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"



const DetailView = (props) => {

	const [article, setArticle] = useState(null)

	const [items, setItems] = useState([])
	const [exitSpring, setExitSpring, stop] = useSpring(() => ({ opacity: 1 }))

	const [size, setSize] = useState(0)
	const [quantity, setQuantity] = useState(0)

	const isShop = props.currentActive === 2
	const isHistoire = props.currentActive === 0


	const [slide, setSlide] = useState(0)
	const similarSwiper = new Swiper(".swiper-container-similarItems", {
		initialSlide: slide,
		speed: 700,
		slidesPerView: 2,
		spaceBetween: -50,
		loop: false,
		centeredSlides: false,
		slideActiveClass: 'swiper-slide-active',
		slidePrevClass: 'swiper-slide-prev',
		noSwipingClass: 'hidden-element',
		breakpoints: {
			1080: {
				spaceBetween: 50,
				slidesPerView: 2
			},
			760: {
				slidesPerView: 2
			},
			320: {
				slidesPerView: 2,
			},
			120: {
				slidesPerView: 2,
			}
		},
	})

	useEffect(() => {
		fetch('../../data/shop.json')
			.then(res => res.json())
			.then(data => {
				setItems(data)
				setArticle(data[0])
			})
	}, [])

	const buyHanlder = e => {

		if (size !== 0 && quantity !== 0) {

			const _product = {
				id: article._id,
				name: props.title,
				amount: {
					[size]: quantity
				},
				price: +article.price * quantity
			}

			props.addItem(_product)

		}

	}

	const navigationHandler = direction => {
		const _index = items.findIndex(item => item._id === article._id)
		if (direction === "foward") {
			const _next = items[_index + 1]
			if (_next) {
				setArticle(_next)
			}
		}

		if (direction === "back") {
			const _prev = items[_index - 1]
			if (_prev) {
				setArticle(_prev)
			}
		}

	}

	const exitHandler = e => {
		setExitSpring({ opacity: 0 })
		setTimeout(() => {
			stop()
			props.closed()
		}, 1200)
	}

	const settings = {
		className: classes.SliderShop,
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		// centerMode: true,
		variableWidth: true
	}

	const changeSlide = (value) => {
		setSlide(value)
		similarSwiper.update()
	}

	const goCardHandler = number => {
		props.changeSelected(number)
		setSlide(number)
		similarSwiper.slideTo(number)
		similarSwiper.update()
	}


	if (similarSwiper) {
		similarSwiper.on('slideChangeTransitionStart', swiper => {

			if (swiper.realIndex === 2 || slide === 2) {
				swiper.allowSlideNext = false
			} else {
				swiper.allowSlideNext = true
			}

			changeSlide(swiper.activeIndex)
		});
	}

	const imgOrSlide = isShop ? (
		<Slider {...settings}>{
			article ? article.picture.map(im => <div style={{ width: '15%' }}><img src={im} alt={props.title} /> </div>) : null
		}</Slider>
	) : null

	const buttonOverImage = isShop === false && !isHistoire ? (
		<div className={classes.ImageCTA}>
			<Button isOverImage clicked={props.goBooking} >Réservez</Button>
		</div>
	) : null

	const breaker = <br />

	console.log(article)
	return (
		<a.div style={exitSpring}>
			<div className={isShop ? [classes.DetailView, classes.Shop].join(' ') : classes.DetailView}>
				<div className={isShop ? [classes.DetailWrapper, classes.Shop].join(' ') : classes.DetailWrapper}>
					<section
						className={isShop ? [classes.ImageWrapper, classes.Shop].join(' ') : classes.ImageWrapper}
						style={!isShop ? { backgroundImage: `url(${props.img})` } : null}>
						{imgOrSlide}
						{buttonOverImage}
					</section>
					{
						isHistoire ?
							(
								<section className={classes.Content}>
									<div className={classes.TitleWrapper}>
										<h1 className={[classes.Title, classes.HistoireTitle].join(' ')}>{props.title[0]}<br /> {props.title[1]} <br /> {props.title[2]}</h1>
									</div>
									<Histoire text={props.histoire} />
								</section>
							) : (
								<section className={classes.Content}>
									<div className={classes.TitleWrapper}>
										<h1 className={!isShop ? classes.Title : [classes.Title, classes.TitleShop].join(' ')}>{article ? article.title : 'Title'}</h1>
										<IconList
											isShop={isShop}
											time={props.time}
											level={props.level}
											madeof={props.madeOf}
											people={props.people}
											organic={props.organic}
											recycle={props.recycle} />
										<div>
											{isShop ? <h2 className={classes.Price}>Prix Unité {article ? article.price + '€' : '0 €'}</h2> : null}
										</div>
										<p className={classes.Description}>{article ? article.description : ' Description'}</p>
									</div>
									{
										!isShop ?
											(
												<div className={classes.SimilarItems}>
													<CardList
														items={items} />
													<div className="swiper-container-similarItems" style={{ width: '100%' }}>
														<div className="swiper-wrapper">
															{items.map((item, i) => {
																return (
																	<div key={i} className={i === items.length - 1 ? "swiper-slide" + "hidden-element" : "swiper-slide"}>
																		<Card
																			key={i}
																			index={i}
																			active={slide}
																			id={item._id}
																			title={item.title}
																			image={item.picture}
																			clicked={goCardHandler}
																			detailView
																			hide={i === items.length - 1 ? true : false}>
																		</Card>
																	</div>
																);
															})}
														</div>
													</div>
												</div>
											) : (
												<div className={classes.ProductOptions}>
													<div>
														<Selected
															label="Taille"
															onSize={setSize}
															options={article ? article.sizes : null} />
														<Selected
															label="Quantite"
															onQuantity={setQuantity}
															options={article ? article.stock : null} />
													</div>
												</div>
											)
									}
									<div className={isShop ? [classes.DesktopControllers, classes.Shop].join(' ') : classes.DesktopControllers}>
										<Button
											isShop
											invert
											clicked={buyHanlder}>Achater </Button>
										<Button
											isShop
											isSecond
											clicked={exitHandler}>Continuer mes Achats</Button>
									</div>
									<div className={isShop ? [classes.CTA, classes.Shop].join(' ') : classes.CTA}>
										<Button> {isShop ? 'Achater' : 'Réservez'}</Button>
									</div>
									<div className={classes.Navigations}>
										<RowsNavigation
											changeItem={navigationHandler}
											isDetailView />
									</div>
								</section>
							)}

					<span className={classes.Close} onClick={exitHandler} >
						<img src={closeX} alt="close" />
					</span>
				</div>
			</div>
		</a.div >
	)
}

export default DetailView
