import React, { useState } from 'react'
import classes from './TicketDetails.module.css'

const TicketDetails = ({ next }) => {

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [address, setAdress] = useState('')

	const saveTicketHandler = e => {
		const _details = {
			name: name,
			email: email,
			phone: phone,
			address: address
		}
		next(_details)
	}

	return (
		<div className={classes.TicketDetails}>
			<h3>Détails de facturation</h3>
			<label>Nom</label>
			<input value={name} onChange={e => setName(e.target.value)} type="text" />
			<label>E-mail</label>
			<input value={email} onChange={e => setEmail(e.target.value)} type="email" />
			<label>Téléphone</label>
			<input value={phone} onChange={e => setPhone(e.target.value)} type="text" />
			<label>Adresse de livraison</label>
			<input value={address} onChange={e => setAdress(e.target.value)} type="text" />
			<button onClick={saveTicketHandler}> Suivant </button>
		</div>
	)
}

export default TicketDetails
