import React, { useState, useEffect } from 'react';
import classes from './Cart.module.css'
import cartImage from '../../assets/images/nav/cart_bag.svg'
import CartInstance from '../../utils/Cart'
import { useHistory } from 'react-router-dom'

const Cart = (props) => {

	const products = CartInstance.products
	const tours = CartInstance.tours
	const [stylo, setStylo] = useState(classes.Feedback)
	const history = useHistory()

	const checkoutHandler = e => {
		history.push('/checkout')
	}


	useEffect(() => {

		if (products || tours) {
			if (products.length > 0 || tours.length > 0) {
				const _css = [classes.Feedback, classes.HasItems].join(' ')
				setStylo(_css)
			}
		} else {
			const _css = classes.Feedback
			setStylo(_css)
		}
	}, [products, tours])

	return (
		<div className={classes.Cart} onClick={checkoutHandler} >
			<span className={stylo}></span>
			<img src={cartImage} alt="cart bag" />
		</div>
	)
}

export default Cart
