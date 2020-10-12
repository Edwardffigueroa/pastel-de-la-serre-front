import React, { useState } from 'react';
import Selected from '../Selected/Selected';

import PaymentMethod from './PaymentMethod/PaymentMethod'
import classes from './Payment.module.css'
import TicketDetails from './TicketDetails/TicketDetails';


const Payment = (props) => {

	const paymentHandler = e => {

	}

	const ticketDetailHandler = details => {
		setDetails(details)
		setView(<PaymentMethod
			paymentMethod={paymentHandler} />)
	}

	const [details, setDetails] = useState({})
	const [view, setView] = useState(<TicketDetails next={ticketDetailHandler} />)
	return (
		<div className={classes.Payment}>{view}</div>
	)
}

export default Payment
