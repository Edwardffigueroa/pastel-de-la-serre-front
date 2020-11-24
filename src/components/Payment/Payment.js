import React, { useState } from 'react'

import PaymentMethod from './PaymentMethod/PaymentMethod'
import classes from './Payment.module.css'
import TicketDetails from './TicketDetails/TicketDetails'
import Confirmation from './Confirmation/Confirmation'


const Payment = ({ confirmed, resumeDeclined, resumeAccepted, products, translations }) => {

	const [view, setView] = useState(0)
	const [card, setCard] = useState('')
	const [customer, setCustomer] = useState({})

	const confirmHandler = () => {
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

		const _data = {
			products: _products,
			customer: customer,
			payment: {
				id_card: card
			}
		}

		if (products.length > 0) {
			console.log('data to send', _data)
			fetch('https://pastel-de-la-serre-backend.uc.r.appspot.com/orders/complete', {
				method: 'POST',
				body: JSON.stringify(_data),
				headers: {
					'Content-Type': 'application/json',
				}
			})
				.then(response => response.json())
				.then(res => {

					if (res.order_status === "REJECTED") {
						setView(0)
						setCard('')
						setCustomer({})
						resumeDeclined()
					}

					if (res.order_status === "APPROVED") {
						setView(0)
						resumeAccepted()
					}
				})
		}
	}

	const paymentHandler = cardNumber => {
		setCard(cardNumber)
		setView(2)
	}

	const ticketDetailHandler = _customer => {
		setCustomer(_customer)
		setView(1)
	}

	let container
	switch (view) {
		case 0:
			container = <TicketDetails
				titleLabel={translations.personal_information_title}
				nameLabel={translations.personal_information_name}
				emailLabel={translations.personal_information_mail}
				phoneLabel={translations.personal_information_phone}
				addressLabel={translations.personal_information_address}
				buttonLabel={translations.personal_information_button}
				next={ticketDetailHandler} />
			break;
		case 1:
			container = <PaymentMethod
				titleLabel={translations.payment_title}
				nameLabel={translations.payment_name}
				numberLabel={translations.payment_number}
				expLabel={translations.payment_expiration}
				codeLabel={translations.payment_code}
				buttonLabel={translations.payment_button}
				next={paymentHandler} />
			break;
		case 2:
			container = <Confirmation
				confirm={confirmHandler}
				name={customer.name}
				email={customer.email}
				phone={customer.phone}
				address={customer.address}
				clientLabel={translations.order_details_customer}
				titleLabel={translations.order_details_title}
				addressLabel={translations.order_details_address}
				buttonLabel={translations.order_details_button} />
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
