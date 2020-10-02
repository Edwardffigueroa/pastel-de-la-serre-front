import React from 'react';
import classes from './Checkout.module.css'


import { useHistory } from 'react-router-dom'
import { a, useSpring } from 'react-spring';
import closeX from '../../assets/checkout/closeBlue.svg'
import Table from '../../components/UI/Table/Table';

const Checkout = (props) => {

	const [exitSpring, setExitSpring, stop] = useSpring(() => ({ opacity: 1 }))
	const history = useHistory()
	const currentPath = history.location.pathname
	const container = currentPath.split('/detail')[0]

	const exitHandler = e => {
		setExitSpring({ opacity: 0 })
		setTimeout(() => {
			stop()
			history.push(container)
		}, 1200)
	}

	return (
		<a.div style={exitSpring}>
			<div className={classes.Checkout}>
				<div className={classes.CheckoutWrapper}>
					<h1 className={classes.Title}>Checkout</h1>
					<section>
						<Table />
					</section>
					<section>
						PAYMENT
					</section>
					<span className={classes.Close} onClick={exitHandler} >
						<img src={closeX} alt="close" />
					</span>
				</div>
			</div>
		</a.div>
	)
}

export default Checkout
