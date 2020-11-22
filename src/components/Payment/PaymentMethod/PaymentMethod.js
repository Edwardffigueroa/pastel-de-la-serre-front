import React, { useState } from 'react';

import master from '../../../assets/checkout/master.svg'
import visa from '../../../assets/checkout/visa.svg'
import Selected from '../../Selected/Selected'
import Button from '../../UI/Button/Button';
import classes from './PaymentMethod.module.css'

import { loadStripe } from "@stripe/stripe-js";
import {
	Elements,
	CardElement,
	CardNumberElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51Hgd7fLNYvKIoqTP0Ppxros0gTuijF8K9LUFPKAD5EKPxrg2wryXL4VzSgeynbHoTIFkEe0pM96sPFLYf3r6WPQs00IbqFvhE6");

const addZero = number => number < 10 ? '0' + number : number


const PaymentMethod = ({ titleLabel, nameLabel, numberLabel, expLabel, codeLabel, buttonLabel, next }) => {

	const [month, setMonth] = useState(0)
	const [year, setYear] = useState(0)
	const [name, setName] = useState('')
	const [card, setCard] = useState('')

	const _months = new Array(12).fill().map((_, i) => {
		const _m = addZero(i + 1)
		return _m
	})

	const _years = new Array(10).fill().map((_, i) => {
		const _y = i + 20
		return _y
	})

	const onPayHandler = e => {
		const _cardDetails = {
			month: month,
			year: year,
			name: name,
			card: card
		}
		//  ==== TODO ====
		next(_cardDetails)
	}

	const cardHandler = e => {
		const _txt = e.target.value
		const cardNumber = _txt.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
		setCard(cardNumber)
	}



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
				console.log(error)
			}
		}
		return (
			<>
				<CardElement
					options={{
						style: {
							base: {
								iconColor: '#c4f0ff',
								color: '#fff',
							}
						}
					}}
				/>
				<Button clicked={handleSubmit} isCheckout>{buttonLabel}</Button>
				{/* {response!=null && res ? <p> {error.message} </p> : null} */}
			</>
		);

	}

	return (
		<div className={classes.Payment}>
			<div className={classes.Form}>
				<h3>{titleLabel}</h3>

				<section className={classes.Logos}><img src={visa} alt="visa" /><img src={master} alt="master" /></section>
				{/* <label htmlFor="name">{nameLabel}</label>
				<input className={classes.Input} htmlFor="name" type="text" name="name" value={name} onChange={e => setName(e.target.value)} /> */}
				<label htmlFor="number">{numberLabel}</label>
				<Elements stripe={stripePromise}>
					<MyCheckoutForm />

				</Elements>
				{/* <section className={classes.Logos}><img src={visa} alt="visa" /><img src={master} alt="master" /></section>
				<label htmlFor="name">{nameLabel}</label>
				<input className={classes.Input} htmlFor="name" type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
				<label htmlFor="number">{numberLabel}</label>
				<input className={classes.Input} htmlFor="number" type="text" name="card" value={card} onChange={cardHandler} />
				<fieldset>
					<label htmlFor="exp">{expLabel}</label>
					<div className={classes.Divider}></div>
					<label htmlFor="cvv">{codeLabel}</label>
					<br />
					<div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
						<Selected
							payment
							options={_months} />
						<Selected
							payment
							options={_years} />
						<input className={classes.Input} type="number" htmlFor="cvv" name="cvv" />
					</div>
				</fieldset> */}
				{/* <Button clicked={onPayHandler} isCheckout>{buttonLabel}</Button> */}

			</div>
		</div>)
}

export default PaymentMethod
