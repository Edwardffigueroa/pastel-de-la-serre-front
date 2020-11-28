import React from 'react'

import classes from './Table.module.css'
import Item from './Item/Item'
import backRow from '../../../assets/checkout/back.svg'

const Table = ({ translations, products, goFirstProduct, totalPrice, goBackHandler, increaseItemHandler, decreaseItemHandler, deleteAllHandler }) => {

	const goBuy = e => {
		goBackHandler()
		goFirstProduct()
	}

	const value = Object.values(products)
	const _products = products.length < 1 ? (
		<li className={classes.NoProducts} onClick={goBuy}> <p>{translations.no_products_message} </p></li>
	) : value.reduce((acc, current, index) => {
		const _item = Object.keys(current.amount).map((size, index) =>
			<Item
				key={current.id + current.amount[size] + '_' + index}
				size={size}
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
			<div className={classes.TotalPrice}><span>{translations.subtotal_text}</span><h3> {parseFloat(totalPrice).toFixed(2)} €</h3></div>
			<div className={classes.BackButton} onClick={goBackHandler}><span><img src={backRow} alt="Back" /> </span> {translations.back_button}</div>
		</div>
	)
}

export default Table
