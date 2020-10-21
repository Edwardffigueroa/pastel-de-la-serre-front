import React, { useState } from 'react';

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

	const [exitSpring, setExitSpring, stop] = useSpring(() => ({ opacity: 1 }))

	const [size, setSize] = useState(props.productSizes ? props.productSizes[0] : null)
	const [quantity, setQuantity] = useState(0)

	const history = useHistory()
	const currentPath = history.location.pathname
	const container = currentPath.split('/detail')[0]
	const id = currentPath.split('detail/')[1]
	const isShop = container.includes('boutique')

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

	const exitHandler = e => {
		setExitSpring({ opacity: 0 })
		setTimeout(() => {
			stop()
			history.push(container)
		}, 1200)
	}

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	};

	const imgOrSlide = isShop ? (
		<Slider {...settings}>{
			props.img.length > 0
				? (props.img.map(im => <div><img src={im} alt={props.title} /> </div>))
				: (<img src={props.img} alt={props.description} />)
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
							<h1 className={!isShop ? classes.Title : [classes.Title, classes.TitleShop].join(' ')}>{props.title}</h1>
							<IconList
								isShop={isShop}
								time={props.time}
								level={props.level}
								madeof={props.madeOf}
								people={props.people}
								organic={props.organic}
								recycle={props.recycle} />
							<div>
								{isShop ? <h2 className={classes.Price}>Prix Unité {props.price + '€'}</h2> : null}
							</div>
							<p className={classes.Description}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Nunc pulvinar finibus erat. Vestibulum in nulla et quam gravida blandit.
								Donec iaculis metus ullamcorper nisl consequat, in vulputate ante congue.
								Nulla at rhoncus turpis. Aliquam molestie ex quam. Morbi laoreet a massa id fringilla.
								Nullam sagittis tellus nibh, vestibulum ullamcorper mauris ultrices quis.
								Nam malesuada congue ligula quis egestas. Cras mattis nunc porta
					</p>
						</div>
						{
							!isShop ?
								(
									<div className={classes.SimilarItems}>
										<CardList
											items={props.items} />
										<InfiniteSlider
											detailView
											items={props.items} />
									</div>
								) : (
									<div className={classes.ProductOptions}>
										<div>
											<Selected
												label="Taille"
												onSize={setSize}
												options={props.productSizes} />
											<Selected
												label="Quantite"
												onQuantity={setQuantity}
												options={props.productStock} />
										</div>
									</div>
								)
						}
						<div className={classes.DesktopControllers}>
							<Button isShop clicked={buyHanlder}>Achater </Button>
							<Button isShop>Continuez a la mes Achats</Button>
						</div>
						<div className={classes.CTA}>
							<Button>Réservez</Button>
						</div>
						<div className={classes.Navigations}>
							<RowsNavigation
								changeItem={props.changeItem}
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
