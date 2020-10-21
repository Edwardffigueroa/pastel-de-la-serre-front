import React, { useState, useEffect } from 'react'

import classes from './Cart.module.css'
import cartImage from '../../assets/images/nav/cart_bag.svg'
import { useHistory } from 'react-router-dom'

const Cart = ({ products }) => {

	let stylo
	const history = useHistory()
	const checkoutHandler = e => {
		history.push('/checkout')
	}

	if (products.length > 0) {
		stylo = [classes.Feedback, classes.HasItems].join(' ')
	} else {
		stylo = classes.Feedback
	}

	return (
		<div className={classes.Cart} onClick={checkoutHandler} >
			<span className={stylo}></span>
			<img src={cartImage} alt="cart bag" />
		</div>
	)
}

export default Cart
