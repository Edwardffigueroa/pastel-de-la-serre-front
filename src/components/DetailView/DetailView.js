import React, { useState, useEffect } from 'react';

import classes from './DetailView.module.css'
import InfiniteSlider from '../Silder/InfiniteSlider';
import CardList from '../CardList/CardList';

import closeX from '../../assets/detailView/close.svg'
import Button from '../UI/Button/Button'
import RowsNavigation from '../Navigation/RowsNavigation/RowsNavigation';

import { useHistory } from 'react-router-dom'
import { a, useSpring } from 'react-spring';
import Selected from '../Selected/Selected'
import IconList from './IconList/IconList';

import Cart from '../../utils/Cart'
import Slider from 'react-slick';
const DetailView = (props) => {

	const [article, setArticle] = useState(null)

	const [items, setItems] = useState([])
	const [exitSpring, setExitSpring, stop] = useSpring(() => ({ opacity: 1 }))

	const [size, setSize] = useState(0)
	const [quantity, setQuantity] = useState(0)

	const history = useHistory()
	const currentPath = history.location.pathname
	const container = currentPath.split('/detail')[0]
	const id = currentPath.split('detail/')[1]
	const isShop = props.currentActive === 2

	useEffect(() => {
		fetch('../../data/shop.json')
			.then(res => res.json())
			.then(data => {
				setItems(data)
				setArticle(data[0])
			})
	}, [])

	const buyHanlder = e => {

		if (isShop) {

			const _product = {
				id: id,
				name: props.title,
				amount: {
					[size]: quantity
				},
				price: props.price * quantity
			}

			Cart.addItem(_product)
		} else {

			const _tour = {
				id: id,
				name: props.title,
				people: 3,
				price: props.price * quantity
			}

			Cart.addJourney(_tour)
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
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	}

	const imgOrSlide = isShop ? (
		<Slider {...settings}>{
			article ? article.picture.map(im => <div><img src={im} alt={props.title} /> </div>) : null
		}</Slider>
	) : <img src={props.img} alt={props.description} />

	const buttonOverImage = isShop === false ? (
		<div className={classes.ImageCTA}>
			<Button isOverImage>Réservez</Button>
		</div>
	) : null

	return (
		<a.div style={exitSpring}>
			<div className={isShop ? [classes.DetailView, classes.Shop].join(' ') : classes.DetailView} data-type={container}>
				<div className={isShop ? [classes.DetailWrapper, classes.Shop].join(' ') : classes.DetailWrapper}>
					<section className={isShop ? [classes.ImageWrapper, classes.Shop].join(' ') : classes.ImageWrapper}>
						{imgOrSlide}
						{buttonOverImage}
					</section>
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
										<InfiniteSlider
											detailView
											items={items} />
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
							<Button isShop clicked={buyHanlder}>Achater </Button>
							<Button isShop isSecond>Continuez a la mes Achats</Button>
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
					<span className={classes.Close} onClick={exitHandler} >
						<img src={closeX} alt="close" />
					</span>
				</div>
			</div>
		</a.div>
	)
}

export default DetailView
