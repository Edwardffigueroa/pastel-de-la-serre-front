import React from 'react';
import Button from '../../UI/Button/Button';

import classes from './Confirmation.module.css'

const Confirmation = ({ name, email, phone, address, confirm }) => {
	return (
		<div className={classes.Confirmation}>
			<h1 className={classes.Title}>Détails de facturation</h1>
			<section className={classes.Client}>
				<p className={classes.InnerTitle}>Client</p>
				<p className={classes.Text}>{name}</p>
				<p className={classes.Text}>{email}</p>
				<p className={classes.Text}>{phone}</p>
			</section>
			<section className={classes.Address}>
				<p className={classes.InnerTitle}>Adresse de livraison</p>
				<p className={classes.Text}>{address}</p>
			</section>
			<Button clicked={confirm} isCheckout> Finaliser</Button>
		</div>
	)
}

export default Confirmation
