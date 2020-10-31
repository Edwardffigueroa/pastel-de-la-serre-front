import React, { useState } from 'react';
import Select from "react-select"

import classes from './Selected.module.css'

const Selected = (props) => {

	let options = { label: ' ', value: ' ' }
	
	if (props.options) {
		if (props.options.length > 1) {
			options = props.options.map(op => ({ value: op, label: op }))
		} else {
			const maxOptions = props.options
			options = new Array(maxOptions).fill().map((op, i) => ({ value: i, label: i }))
		}

	}

	const [selected, setSelected] = useState(options)

	const selectedHandler = e => {

		if (props.label === 'Quantite') {
			console.log(e)
			props.onQuantity(e.value)
		}

		if (props.label === 'Taille') {
			props.onSize(e.value)
		}

		setSelected(e)
	}

	const myclasses = props.payment ? [classes.Selected, classes.Payment].join(' ') : classes.Selected

	return (
		<div className={props.payment ? classes.SelectedWrapperPay : classes.SelectedWrapper}>
			<div className={classes.Label}>{props.label}</div>
			<Select
				className={myclasses}
				classNamePrefix={classes.InnerSelected}
				onChange={selectedHandler}
				defaultValue={selected}
				options={options} />
		</div>
	)
}

export default Selected
