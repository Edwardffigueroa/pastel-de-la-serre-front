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
const DetailView = (props) => {

	const [exitSpring, setExitSpring, stop] = useSpring(() => ({ opacity: 1 }))


	const [size, setSize] = useState(props.productSizes ? props.productSizes[0] : null)
	const [quantity, setQuantity] = useState(0)
	const [reserve, setReserve] = useState()


	const history = useHistory()
	const currentPath = history.location.pathname
	const container = currentPath.split('/detail')[0]
	const id = currentPath.split('detail/')[1]
	const isShop = container.includes('boutique')

	const buyHanlder = e => {
		console.log('price', props.price)
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

	return (
		<a.div style={exitSpring}>
			<div className={classes.DetailView} data-type={container}>
				<div className={classes.DetailWrapper}>
					<section className={classes.ImageWrapper}>
						<img src={props.img} alt={props.description} />
						{
							isShop === false ? (
								<div className={classes.ImageCTA}>
									<Button isOverImage>Réservez</Button>
								</div>
							) : null
						}
					</section>
					<section className={classes.Content}>
						<div className={classes.TitleWrapper}>
							<h1 className={classes.Title}>{props.title}</h1>
							<IconList isShop={isShop} />
							<div>
								{isShop ? <h2 className={classes.Price}>Price {props.productPrice}</h2> : null}
							</div>
							<p>
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
											{/* <Selected
												label="Taille"
												onSize={setSize}
												options={props.productSizes} />
											<Selected
												label="Quantite"
												onQuantity={setQuantity}
												options={props.productStock} /> */}
										</div>
										<div>
											<Button isShop clicked={buyHanlder}>Achater </Button>
											<Button isShop>Continuez a la mes Achats</Button>
										</div>

									</div>
								)
						}
						<div className={classes.CTA}>
							<Button>Réservez</Button>
						</div>
						<div className={classes.Navigations}>
							<RowsNavigation
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
