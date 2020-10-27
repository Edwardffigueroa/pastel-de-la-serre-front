import React, { useState } from 'react';

import classes from './Table.module.css'
import Item from './Item/Item'
import Cart from '../../../utils/Cart'
import backRow from '../../../assets/checkout/back.svg'
import { useHistory } from 'react-router-dom'

const Table = props => {

	const _prods = Cart.getProducts()
	console.log('Table', _prods)
	const [products, setProducts] = useState(_prods)
	const [tours, setTours] = useState([])
	const [totalPrice, setTotalPrice] = useState(0)
	const history = useHistory()


	const goBackHandler = e => {
		history.goBack()
	}

	const increaseItemHandler = (id, size) => {
		Cart.increaseItem(id, size)
		setProducts(Cart.products)
		setTotalPrice(Cart.totalPrice)
	}

	const decreaseItemHandler = (id, size) => {
		Cart.decreaaseItem(id, size)
		setProducts(Cart.products)
		setTotalPrice(Cart.totalPrice)
	}

	const deleteAllHandler = (id, size) => {
		Cart.deleteAll(id, size)
		setProducts(Cart.products)
		setTotalPrice(Cart.totalPrice)
	}

	const value = Object.values(products)
	const _products = !products ? (
		<h2>Not products added yet</h2>
	) : value.reduce((acc, current, index) => {
		const _item = Object.keys(current.amount).map((size, index) =>
			<Item
				key={current.id + current.amount[size]}
				id={current.id}
				name={current.name}
				price={current.price}
				amount={current.amount[size]}
				description={current.description}
				onAdded={e => increaseItemHandler(current.id, size)}
				onDeleted={id => decreaseItemHandler(current.id, size)}
				onDeleteAll={id => deleteAllHandler(current.id, size)} />)
		acc[index] = _item
		return acc
	}, [])

	return (
		<div className={classes.Table}>
			<ul className={classes.List}>{_products}</ul>
			<div className={classes.TotalPrice}><span>Subtotal:</span><h3> {totalPrice} €</h3></div>
			<div className={classes.BackButton} onClick={goBackHandler}><span><img src={backRow} alt="Back" /> </span> Continuer mes Achats</div>
		</div>
	)
}

export default Table
