import React, { useState } from 'react';
import classes from './Checkout.module.css'


import { useHistory } from 'react-router-dom'
import { a, useSpring } from 'react-spring'
import closeX from '../../assets/checkout/closeBlue.svg'
import Table from '../../components/UI/Table/Table'
import Payment from '../../components/Payment/Payment'
import Shadow from '../../components/UI/Shadow/Shadow'
import Modal from '../../components/Modal/Modal'


const Checkout = (props) => {

	const [exitSpring, setExitSpring, stop] = useSpring(() => ({ opacity: 1 }))
	const [entrySpring, setEntrySpring] = useSpring(() => ({ opacity: 0 }))
	const history = useHistory()
	const currentPath = history.location.pathname
	const container = currentPath.split('/detail')[0]

	const [confirmed, setConfirmed] = useState(false)

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

	return (
		<div>
			<div className={classes.Checkout}>
				<Shadow />
				<a.div style={exitSpring}>
					<div className={classes.CheckoutWrapper}>
						<h1 className={classes.Title}>Checkout</h1>
						<section className={classes.Content}>
							<Table />
							<section className={classes.Payment}>
								<Payment confirmed={confirmed} confirmHandler={confirmHandler} />
							</section>
						</section>
						<span className={classes.Close} onClick={exitHandler} >
							<img src={closeX} alt="close" />
						</span>
					</div>
				</a.div>
			</div>
			<Modal confirmed={confirmed} close={exitHandler} />
		</div>
	)
}

export default Checkout
