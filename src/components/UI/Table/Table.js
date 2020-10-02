import React from 'react';

import classes from './Table.module.css'

const Table = ({ products }) => {
	return (
		<div className={classes.Table}>
			<ul>
				<li>
					<p>	_uid</p>
					<p>nombre</p>
					<p>	cantidad</p>
					<p>precio</p>
					<p>eliminar</p>
				</li>
			</ul>
			<div>
				<h3> Subtotal :sumatoria total de precios </h3>
			</div>
		</div>
	)
}

export default Table
