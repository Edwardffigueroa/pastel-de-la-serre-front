import React from 'react';
import classes from './Counter.module.css'

import plus from '../../assets/checkout/plus.svg'
import less from '../../assets/checkout/less.svg'

const Counter = ({ quantity, increase, decrease }) => {
	return (
		<div className={classes.Counter}>
			<span onClick={increase}>
				<img src={plus} alt="plus" />
			</span>
			<div className={classes.NumberWrapper}>
				<p>{quantity}</p>
			</div>
			<span onClick={decrease}>
				<img src={less} alt="less" />
			</span>
		</div>
	)
}

export default Counter
