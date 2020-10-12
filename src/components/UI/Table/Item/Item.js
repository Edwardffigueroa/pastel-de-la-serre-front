import React from 'react';

import classes from './Item.module.css'
import Counter from '../../../Counter/Counter'

const Item = ({ id, name, price, amount, description, onAdded, onDeleted, onDeleteAll }) => {
	return (
		<div className={classes.ItemWrapper}>
			<div className={classes.Item}>
				<div className={classes.NameWrapper}>
					<p>{name}</p>
					<p className={classes.MobilePrice}>{price ? price + ' €' : '70 €'}</p>
				</div>
				<Counter id={id} quantity={amount} increase={onAdded} decrease={onDeleted} />
				<p className={classes.DesktopPrice}>{price ? price + ' €' : '70 €'}</p>
				<span className={classes.Delete} onClick={onDeleteAll}></span>
			</div>
		</div>
	)
}

export default Item
