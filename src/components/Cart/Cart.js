import React, { useEffect } from 'react'

import classes from './Cart.module.css'
import cartImage from '../../assets/images/nav/cart_bag.svg'

import CartStorage from '../../utils/Cart'

const Cart = ({ products, goCart }) => {

	let _prods = CartStorage.getProducts()
	let stylo
	if (_prods.length > 0) {
		stylo = [classes.Feedback, classes.HasItems].join(' ')
		// console.log('siii')
	} else {
		stylo = classes.Feedback
		// console.log('noo')
	}

	// console.log('myprods', _prods)
	return (
		<div className={classes.Cart} onClick={goCart} >
			<span className={stylo}></span>
			<img src={cartImage} alt="cart bag" />
		</div>
	)
}

export default Cart
