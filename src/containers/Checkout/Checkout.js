import React, { useState } from 'react';
import classes from './Checkout.module.css'


import { useHistory } from 'react-router-dom'
import { a, useSpring } from 'react-spring'
import closeX from '../../assets/checkout/closeBlue.svg'
import Table from '../../components/UI/Table/Table'
import Payment from '../../components/Payment/Payment'
import Shadow from '../../components/UI/Shadow/Shadow'
import Modal from '../../components/Modal/Modal'
import Cart from '../../utils/Cart'


const Checkout = ({ refreshCartState, _products, background }) => {

	const _price = Cart.getPrice()
	const history = useHistory()

	const [confirmed, setConfirmed] = useState(false)
	const [products, setProducts] = useState(_products)
	const [totalPrice, setTotalPrice] = useState(_price)
	const [exitSpring, setExitSpring, stop] = useSpring(() => ({ opacity: 1, backgroundImage: background }))

	const confirmHandler = () => {
		setExitSpring({ opacity: 0 })
		setConfirmed(true)
	}

	const exitHandler = e => {
		setExitSpring({ opacity: 0 })
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


	return (
		<div>
			<div className={classes.Checkout}>
				<a.div style={exitSpring}>
					<Shadow />
					<div className={classes.CheckoutWrapper}>
						<h1 className={classes.Title}>Checkout</h1>
						<section className={classes.Content}>
							<Table
								products={products}
								totalPrice={totalPrice}
								goBackHandler={goBackHandler}
								increaseItemHandler={increaseItemHandler}
								decreaseItemHandler={decreaseItemHandler}
								deleteAllHandler={deleteAllHandler}
								refreshCartState={refreshCartState}
							/>
							<section className={classes.Payment}>
								<Payment
									confirmed={confirmed}
									confirmHandler={confirmHandler}
									products={products} />
							</section>
						</section>
						<span className={classes.Close} onClick={exitHandler} >
							<img src={closeX} alt="close" />
						</span>
					</div>
				</a.div>
			</div>
			<Modal confirmed={confirmed} close={exitHandler} back={backHandler} />
		</div>
	)
}

export default Checkout
