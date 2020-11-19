import React, { useState } from 'react'
import classes from './TicketDetails.module.css'
import Button from '../../UI/Button/Button'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


const TicketDetails = ({ next, buttonLabel, titleLabel, nameLabel, emailLabel, phoneLabel, addressLabel }) => {

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('+33')
	const [address, setAdress] = useState('')

	const saveTicketHandler = e => {

		const regex = /^[a-zA-Z ]{2,30}$/;
		const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const isValidName = regex.test(name)
		const isValidEmail = regexEmail.test(email.toLocaleLowerCase())

		if (isValidName && isValidEmail) {
			const _customer = {
				name: name,
				email: email,
				phone: phone,
				address: address
			}
			next(_customer)
		}
	}


	return (
		<div className={classes.TicketDetails}>
			<h3>{titleLabel}</h3>
			<label>{nameLabel}</label>
			<input value={name} onChange={e => setName(e.target.value)} type="text" required />
			<label>{emailLabel}</label>
			<input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
			<label>{phoneLabel}</label>
			<PhoneInput
				inputClass={classes.PhoneInput}
				buttonClass={classes.PhoneDropdown}
				country="fr"
				value={phone}
				onChange={tel => setPhone(tel)} />
			{/* <input value={phone} onChange={e => setPhone(e.target.value)} type="text" required /> */}
			<label>{addressLabel}</label>
			<input value={address} onChange={e => setAdress(e.target.value)} type="text" required />
			<Button clicked={saveTicketHandler} isCheckout >{buttonLabel}</Button>
		</div>
	)
}

export default TicketDetails
