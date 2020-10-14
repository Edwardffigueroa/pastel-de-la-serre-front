import React, { useState } from 'react';
import Selected from '../Selected/Selected';

import PaymentMethod from './PaymentMethod/PaymentMethod'
import classes from './Payment.module.css'
import TicketDetails from './TicketDetails/TicketDetails';
import Confirmation from './Confirmation/Confirmation';

// import Modal from '../UI/Modal'


const Payment = (props) => {

	const [view, setView] = useState(0)
	const [card, setCard] = useState({})
	const [details, setDetails] = useState({})


	const confirmHandler = e => {
		setView(3)
		console.log('holi')
	}

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
				name={details.name}
				email={details.email}
				phone={details.phone}
				address={details.address} />
			break;
		case 3:
			// container = <Modal />
			break;
		default:
			container = <TicketDetails next={ticketDetailHandler} />
			break;
	}

	return (
		<div className={classes.Payment}>{container}</div>
	)
}

export default Payment
