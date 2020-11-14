import React, { useState } from 'react'

import PaymentMethod from './PaymentMethod/PaymentMethod'
import classes from './Payment.module.css'
import TicketDetails from './TicketDetails/TicketDetails'
import Confirmation from './Confirmation/Confirmation'


const Payment = ({ confirmed, confirmHandler, products }) => {

	const [view, setView] = useState(0)
	// const [card, setCard] = useState({})
	const [customer, setCustomer] = useState({})

	const paymentHandler = card => {
		// setCard(card)
		setView(2)
	}

	const ticketDetailHandler = customer => {


		const value = Object.values(products)
		const _products = value.reduce((acc, current, index) => {
			const _item = Object.keys(current.amount).map((size, index) => ({
				product_id: current.id,
				product_name: current.name,
				quantity: current.amount[size],
				attributes: size
			}))
			acc[index] = _item
			return acc
		}, []).flat()


		fetch('https://jsonplaceholder.typicode.com/posts', {
			method: 'POST',
			body: JSON.stringify({
				products: _products,
				customer: customer
			}),
			headers: {
				'Content-Type': 'application/json',
			}
		})
			.then(response => response.json())
			.then(data => {
				// console.log(data)
				setCustomer(customer)
				setView(1)
			})
			.catch((error) => {
				console.error('Error:', error);
			});

	}


	let container
	switch (view) {
		case 0:
			container = <TicketDetails next={ticketDetailHandler} />
			break;
		case 1:
			container = <PaymentMethod next={paymentHandler} />
			break;
		case 2:
			container = <Confirmation
				confirm={confirmHandler}
				name={customer.name}
				email={customer.email}
				phone={customer.phone}
				address={customer.address} />
			break;
		default:
			container = <TicketDetails next={ticketDetailHandler} />
			break;
	}

	return (
		<div className={classes.Payment}>
			{container}
		</div>
	)
}

export default Payment
