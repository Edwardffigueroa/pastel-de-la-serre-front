import React, { useState, useEffect } from 'react'

import classes from './Cart.module.css'
import cartImage from '../../assets/images/nav/cart_bag.svg'
import CartInstance from '../../utils/Cart'
import { useHistory } from 'react-router-dom'

const Cart = (props) => {

	let stylo = classes.Feedback
	const history = useHistory()

	const checkoutHandler = e => {
		history.push('/checkout')
	}


	setInterval(() => {
		let products = CartInstance.products
		if (products.length > 0) {
			stylo = [classes.Feedback, classes.HasItems].join(' ')
		}
	}, 500)



	return (
		<div className={classes.Cart} onClick={checkoutHandler} >
			<span className={stylo}></span>
			<img src={cartImage} alt="cart bag" />
		</div>
	)
}

export default Cart
