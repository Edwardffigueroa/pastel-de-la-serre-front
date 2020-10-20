import React, { useState } from 'react';
import Selected from '../Selected/Selected';

import PaymentMethod from './PaymentMethod/PaymentMethod'
import classes from './Payment.module.css'
import TicketDetails from './TicketDetails/TicketDetails';
import Confirmation from './Confirmation/Confirmation';

import Modal from '../Modal/Modal'

const Payment = ({ confirmed, confirmHandler }) => {

	const [view, setView] = useState(0)
	const [card, setCard] = useState({})
	const [details, setDetails] = useState({})

	const paymentHandler = card => {
		setCard(card)
		setView(2)
	}

	const ticketDetailHandler = details => {
		setDetails(details)
		setView(1)
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
				name={details.name}
				email={details.email}
				phone={details.phone}
				address={details.address} />
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
