import React, { useState } from 'react';

import master from '../../../assets/checkout/master.svg'
import visa from '../../../assets/checkout/visa.svg'
import Button from '../../UI/Button/Button';
import classes from './PaymentMethod.module.css'

import { loadStripe } from "@stripe/stripe-js";
import {
	Elements,
	CardElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51Hgd7fLNYvKIoqTP0Ppxros0gTuijF8K9LUFPKAD5EKPxrg2wryXL4VzSgeynbHoTIFkEe0pM96sPFLYf3r6WPQs00IbqFvhE6");


const PaymentMethod = ({ titleLabel, nameLabel, numberLabel, expLabel, codeLabel, buttonLabel, next, isValid }) => {

	const [name, setName] = useState('')
	const [card, setCard] = useState('')


	let inputNameClasses = classes.Input
	const regex = /^[a-zA-Z ]{2,30}$/;
	const isValidName = regex.test(name)
	isValidName || name === ''
		? inputNameClasses = classes.Input
		: inputNameClasses = [classes.Input, classes.InputError].join(' ')


	const nameHandler = e => setName(e.target.value)


	const MyCheckoutForm = () => {

		const stripe = useStripe();
		const elements = useElements();
		let response = null;

		const handleSubmit = async (e) => {
			e.preventDefault();

			const { error, paymentMethod } = await stripe.createPaymentMethod({
				type: 'card',
				card: elements.getElement(CardElement)
			})

			if (!error) {
				setCard(paymentMethod.id)
				next(paymentMethod.id)
			} else {
				response = error
			}
		}
		return (
			<>
				<CardElement
					options={{
						style: {
							base: {
								iconColor: '#c4f0ff',
								color: '#fff'

							}
						}
					}}
				/>
				<Button clicked={handleSubmit} isCheckout>{buttonLabel}</Button>
				{response !== null ? <p> {response.message} </p> : null}
			</>
		);

	}

	return (
		<div className={classes.Payment}>
			<div className={classes.Form}>
				<h3>{titleLabel}</h3>
				<section className={classes.Logos}>
					<img src={visa} alt="visa" />
					<img src={master} alt="master" />
				</section>
				<label htmlFor="name">{nameLabel}</label>
				<input className={inputNameClasses}
					htmlFor="name"
					type="text"
					name="name"
					value={name}
					onChange={nameHandler} />
				<div className={classes.SpecialDiviver}></div>
				<label htmlFor="number">{numberLabel}</label>
				<Elements className={classes.SpecialInput} stripe={stripePromise}>
					<MyCheckoutForm />
				</Elements>
			</div>
		</div>)
}

export default PaymentMethod
