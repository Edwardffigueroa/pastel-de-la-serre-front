import React from 'react'

import classes from './Cart.module.css'
import cartImage from '../../assets/images/nav/cart_bag.svg'

const Cart = ({ products, goCart }) => {

	let stylo

	if (products.length > 0) {
		stylo = [classes.Feedback, classes.HasItems].join(' ')
	} else {
		stylo = classes.Feedback
	}

	return (
		<div className={classes.Cart} onClick={goCart} >
			<span className={stylo}></span>
			<img src={cartImage} alt="cart bag" />
		</div>
	)
}

export default Cart
