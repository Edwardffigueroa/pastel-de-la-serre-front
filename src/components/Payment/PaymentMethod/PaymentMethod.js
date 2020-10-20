import React, { useState } from 'react';

import master from '../../../assets/checkout/master.svg'
import visa from '../../../assets/checkout/visa.svg'
import Selected from '../../Selected/Selected'
import classes from './PaymentMethod.module.css'



const addZero = number => number < 10 ? '0' + number : number


const PaymentMethod = ({ next }) => {

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
		next(_cardDetails)
	}

	return (
		<div className={classes.Payment}>
			<div className={classes.Form}>
				<h3>Moyent de paiement</h3>
				<section className={classes.Logos}><img src={visa} alt="visa" /><img src={master} alt="master" /></section>
				<label htmlFor="name">Titulaire de la cart</label>
				<input className={classes.Input} htmlFor="name" type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
				<label htmlFor="number">N° Carte</label>
				<input className={classes.Input} htmlFor="number" type="text" name="card" value={card} onChange={e => setCard(e.target.value)} />
				<fieldset>
					<label htmlFor="exp">Exp.</label>
					<div className={classes.Divider}></div>
					<label htmlFor="cvv">CVV</label>
					<br />
					<div style={{ width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
						<Selected
							payment
							options={_months} />
						<Selected
							payment
							options={_years} />
						<input className={classes.Input} type="number" htmlFor="cvv" name="cvv" />
					</div>
				</fieldset>
				<button onClick={onPayHandler} className={classes.Pay}>Suivant</button>
			</div>
		</div>)
}

export default PaymentMethod
