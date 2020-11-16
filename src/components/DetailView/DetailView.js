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

	const isShop = props.currentActive === 2
	const isHistoire = props.currentActive === 0

	const [article, setArticle] = useState(null)
	const [items, setItems] = useState(props.items ? props.items : [])
	const [exitSpring, setExitSpring, stop] = useSpring(() => ({ opacity: 1 }))

	const [quantity, setQuantity] = useState(0)

	const [size, setSize] = useState(isShop ? props.products[props.index].Product_variation[0].Variation_item[0].Value : 0)

	const [slide, setSlide] = useState(1)
	const similarSwiper = new Swiper(".swiper-container-similarItems", {
		initialSlide: slide,
		speed: 700,
		slidesPerView: 2,
		spaceBetween: -50,
		loop: false,
		centeredSlides: false,
		slideActiveClass: 'swiper-slide-active',
		slidePrevClass: 'swiper-slide-prev',
		breakpoints: {
			2000: {
				spaceBetween: 50,
				slidesPerView: 3
			},
			1080: {
				spaceBetween: 50,
				slidesPerView: 2
			},
			1000: {
				slidesPerView: 3
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
		setArticle(props.products[props.index])
		setSlide(0)
	}, [])

	const buyHanlder = e => {

		if (size !== 0 && quantity !== 0) {

			console.log('que pasa por aqui', article)
			const _product = {
				id: props.products[props.index].id,
				name: props.products[props.index]['name_' + props.lang],
				amount: {
					[size]: quantity
				},
				price: article.price
			}

			props.addItem(_product)

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
		variableWidth: true
	}

	const changeSlide = (value) => {
		setSlide(value)
		similarSwiper.update()
	}

	const goCardHandler = (e, index, id) => {
		if (slide !== index) {
			setSlide(index)
			similarSwiper.slideTo(index)
			similarSwiper.update()
		} else {
			props.changeItem(index)
		}
	}

	if (similarSwiper) {
		similarSwiper.on('slideChangeTransitionStart', swiper => {
			changeSlide(swiper.activeIndex)
		});
	}

	const imgOrSlide = isShop ? (
		<Slider {...settings}>{
			article ? article.images.map((im, i) => <div key={i} style={{ width: '20%' }}><img src={im.url} alt={props.title} /> </div>) : null
		}</Slider>
	) : null

	const buttonOverImage = isShop === false && !isHistoire ? (
		<div className={classes.ImageCTA}>
			<Button isOverImage clicked={props.goBooking} >{props.visits[props.index].button}</Button>
		</div>
	) : null



	const _productTitle = isShop ? props.products[props.index]['name_' + props.lang].split(' ')
		.reduce((acc, current, currentIndex, fullTitle) => {

			if (currentIndex < 1) {
				acc[0] = current
				return acc
			}

			if (currentIndex > 0) {
				if (acc[1]) {
					acc[1] += ' ' + current
				} else {
					acc[1] = current
				}
				return acc
			}

		}, []) : []


	const _title = props.title[0]
		? (
			<h1 className={[classes.Title, classes.HistoireTitle].join(' ')}>
				{props.title[0]}<br /> {props.title[1]} <br /> {props.title[2]}
			</h1>
		)
		: (
			<h1 className={[classes.Title, classes.HistoireTitle].join(' ')}>
				{_productTitle[0]}
				<br />
				{_productTitle[1]}
			</h1>
		)


	console.log(props.visits)

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
										<h1 className={[classes.Title, classes.HistoireTitle].join(' ')}>{props.histoireTitle[0]}<br /> {props.histoireTitle[1]} <br /> {props.histoireTitle[2]}</h1>
									</div>
									<Histoire text={props.histoire} />
								</section>
							) : (
								<section className={classes.Content}>
									<div className={classes.TitleWrapper}>
										{_title}
										<IconList
											isShop={isShop}
											time={props.time}
											level={props.level}
											people={props.people}
											madeof={props.shop.handmade_text}
											organic={props.shop.organic_text}
											recycle={props.shop.recyclable_text} />
										<div>
											{isShop ? <h2 className={classes.Price}>{props.shop.price_text} {article ? article.price + ' ' + props.shop.currency_symbol : '0 €'}</h2> : null}
										</div>
										<p className={classes.Description}>{props.description ? props.description : props.products[props.index]['description_' + props.lang]}</p>
									</div>
									{
										!isShop ?
											(
												<div className={classes.SimilarItems}>
													<CardList
														items={props.tours.carousel}
														goCardHandler={goCardHandler} />
													<div className="swiper-container-similarItems" style={{ width: '100%' }}>
														<div className="swiper-wrapper">
															{props.tours.carousel.map((item, i) => {
																return (
																	<div key={i} className="swiper-slide">
																		<Card
																			key={i}
																			index={i}
																			active={slide}
																			id={item.id}
																			title={item.caption}
																			image={item.url}
																			clicked={goCardHandler}
																			detailView>
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
															label={props.products[props.index].Product_variation[0]['variation_name_' + props.lang]}
															onSize={setSize}
															options={props.products[props.index].Product_variation[0].Variation_item} />
														<Selected
															label={props.shop.quantity_text}
															onQuantity={setQuantity}
															options={props.products[props.index].stock} />
													</div>
												</div>
											)
									}
									<div className={isShop ? [classes.DesktopControllers, classes.Shop].join(' ') : classes.DesktopControllers}>
										<Button
											isShop
											invert
											clicked={buyHanlder}>{props.shop.add_to_cart_button}</Button>
										<Button
											isShop
											isSecond
											clicked={exitHandler}>{props.shop.continue_button}</Button>
									</div>
									<div className={isShop ? [classes.CTA, classes.Shop].join(' ') : classes.CTA}>
										<Button> {isShop ? props.shop.add_to_cart_button : props.visits[props.index].button}</Button>
									</div>
									<div className={classes.Navigations}>
										<RowsNavigation
											changeItem={props.changeItem}
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
