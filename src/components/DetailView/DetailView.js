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

	console.log("visits", props.index)

	const isShop = props.currentActive === 2 || props.currentActive === 5
	const isHistoire = props.currentActive === 0 || props.currentActive === 3

	const [article, setArticle] = useState(null)
	const [items, setItems] = useState(props.items ? props.items : [])
	const [exitSpring, setExitSpring, stop] = useSpring(() => ({ opacity: 1 }))

	const [quantity, setQuantity] = useState(0)

	const [size, setSize] = useState(isShop ? props.products[props.index].Product_variation[0].Variation_item[0].Value : 0)

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
		breakpoints: {
			2000: {
				spaceBetween: 50,
				slidesPerView: 3
			},
			1920: {
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
				spaceBetween: 30,
				slidesPerView: 2.5
			},
			320: {
				slidesPerView: 2,
			},
			120: {
				slidesPerView: 2,
			}
		},
	})

	let bool = false;
	similarSwiper.on("init", function (Swiper) {
		console.log("entró al on");
		bool = true;
	}



	)

	useEffect(() => {
		console.log("eejecutó el effect");
		setSlide(props.index)

	}, [props.index])

	useEffect(() => {
		setArticle(props.products[props.index])
		setTimeout(() => setSlide(0), 500)
	}, [])

	const buyHanlder = e => {

		if (size !== 0 && quantity !== 0) {

			const _product = {
				id: props.products[props.index].id,
				name: props.products[props.index]['name_' + props.lang],
				amount: {
					[size]: quantity
				},
				price: props.products[props.index].price
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
		setSlide(0)
		similarSwiper.slideTo(0)
		similarSwiper.update()
		props.changeItem(id)
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
				{props.visits[props.index].title1}<br /> {props.visits[props.index].title2} <br /> {props.visits[props.index].title3}
			</h1>
		)
		: (
			<h1 className={[classes.Title, classes.HistoireTitle].join(' ')}>
				{_productTitle[0]}
				<br />
				{_productTitle[1]}
			</h1>
		)

	return (
		<a.div style={exitSpring}>
			<div className={isShop ? [classes.DetailView, classes.Shop].join(' ') : classes.DetailView}>
				<div className={isShop ? [classes.DetailWrapper, classes.Shop].join(' ') : classes.DetailWrapper}>
					<section
						className={isShop ? [classes.ImageWrapper, classes.Shop].join(' ') : classes.ImageWrapper}
						style={isHistoire ? { backgroundImage: `url(${props.img.image.url})` } : { backgroundImage: `url(${props.img})` }}>
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
											time={props.visits[props.index].time}
											level={props.visits[props.index].type}
											people={props.visits[props.index].people}
											madeof={props.shop.handmade_text}
											organic={props.shop.organic_text}
											recycle={props.shop.recyclable_text} />
										<div>
											{isShop ? <h2 className={classes.Price}>{props.shop.price_text} {props.products[props.index].price + ' ' + props.shop.currency_symbol}</h2> : null}
										</div>
										<p className={classes.Description}>{isShop ? props.products[props.index]['description_' + props.lang] : props.visits[props.index].description}</p>
									</div>
									{
										!isShop ?
											(
												<div className={classes.SimilarItems}>
													<CardList
														items={props.visits}
														goCardHandler={goCardHandler} />
													<div className="swiper-container-similarItems" style={{ width: '100%' }}>
														<div className="swiper-wrapper">
															{props.visits.map((item, i) => {
																return (
																	<div key={i} className="swiper-slide">
																		<Card
																			key={i}
																			index={i}
																			active={slide}
																			id={item.id}
																			title={item.title1 + " " + item.title2}
																			image={item.cover_image.url}
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
			<span className={isShop ? [classes.CloseIpad, classes.ShopCloseIpad].join(' ') : classes.CloseIpad} onClick={exitHandler} >
				<img src={closeX} alt="close" />
			</span>
		</a.div >
	)
}

export default DetailView
