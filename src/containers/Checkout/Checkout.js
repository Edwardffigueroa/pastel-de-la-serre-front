import React, { useState, useEffect } from 'react';
import classes from './Checkout.module.css'


import { useHistory } from 'react-router-dom'
import { a, useSpring } from 'react-spring'
import closeX from '../../assets/checkout/closeBlue.svg'
import Table from '../../components/UI/Table/Table'
import Payment from '../../components/Payment/Payment'
import Shadow from '../../components/UI/Shadow/Shadow'
import Modal from '../../components/Modal/Modal'
import Cart from '../../utils/Cart'


const Checkout = ({ pubkey, refreshCartState, _products, background, translations, goFirstProductHandler }) => {

	const history = useHistory()

	const [approved, setApproved] = useState(false)
	const [confirmed, setConfirmed] = useState(false)
	const [products, setProducts] = useState(_products)
	const [totalPrice, setTotalPrice] = useState(0)
	const [isPurchasable, setIsPurchasable] = useState(false)
	const [exitSpring, setExitSpring, stop] = useSpring(() => ({ opacity: 1, backgroundImage: background }))


	const confirmHandler = () => {
		refreshCartState([])
		setProducts([])
		setExitSpring({ opacity: 0 })
		setApproved(true)
		setConfirmed(true)
	}

	const declinedHandler = () => {

		setApproved(false)
		setConfirmed(true)
	}

	const exitHandler = e => {
		setExitSpring({ opacity: 0 })

		if (confirmed && approved) {
			Cart.setProducts([], 0)
		}

		setTimeout(() => {
			stop()
			history.push('/')
		}, 1200)
	}

	const backHandler = e => {
		setExitSpring({ opacity: 1 })
		setConfirmed(false)
	}

	const goBackHandler = e => {
		history.goBack()
	}

	const increaseItemHandler = (id, size) => {
		Cart.increaseItem(id, size)
		setProducts(Cart.products)
		setTotalPrice(Cart.totalPrice)
		refreshCartState(Cart.products)
	}

	const decreaseItemHandler = (id, size) => {
		Cart.decreaaseItem(id, size)
		setProducts(Cart.products)
		setTotalPrice(Cart.totalPrice)
		refreshCartState(Cart.products)
	}

	const deleteAllHandler = (id, size) => {
		Cart.deleteAll(id, size)
		setProducts(Cart.products)
		setTotalPrice(Cart.totalPrice)
		refreshCartState(Cart.products)
	}

	useEffect(() => {
		if (_products.length < 1) {
			const _prevProds = Cart.getProducts()
			setProducts(_prevProds)
		}

		const _prevPrice = Cart.getPrice()
		setTotalPrice(_prevPrice)
	}, [])

	useEffect(() => {
		if (products.length < 1) {
			setIsPurchasable(false)
		} else {
			setIsPurchasable(true)
		}
	}, [products])

	return (
		<div>
			<div className={classes.Checkout}>
				<a.div style={exitSpring}>
					<Shadow />
					<div className={classes.CheckoutWrapper}>
						<h1 className={classes.Title}>{translations.title}</h1>
						<section className={classes.Content}>
							<Table
								goFirstProduct={goFirstProductHandler}
								products={products}
								totalPrice={totalPrice}
								goBackHandler={goBackHandler}
								increaseItemHandler={increaseItemHandler}
								decreaseItemHandler={decreaseItemHandler}
								deleteAllHandler={deleteAllHandler}
								refreshCartState={refreshCartState}
								translations={translations}
							/>
							<section className={classes.Payment}>
								<Payment
									pubkey={pubkey}
									isPurchasable={isPurchasable}
									translations={translations}
									confirmed={confirmed}
									resumeAccepted={confirmHandler}
									resumeDeclined={declinedHandler}
									products={products} />
							</section>
						</section>
						<span className={classes.Close} onClick={exitHandler} >
							<img src={closeX} alt="close" />
						</span>
					</div>
				</a.div>
			</div>
			<Modal
				approved={approved}
				approvedTitle={translations.order_approved_title}
				approvedDescription={translations.order_approved_description}
				declineTitle={translations.order_declined_title}
				declineDescription={translations.order_decline_description}
				button={translations.order_back_button}
				confirmed={confirmed}
				close={exitHandler} back={backHandler} />
		</div>
	)
}

export default Checkout
