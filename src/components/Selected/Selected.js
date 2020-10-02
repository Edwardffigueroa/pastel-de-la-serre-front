import React, { useState } from 'react';
import Select from "react-select"

import classes from './Selected.module.css'

const Selected = (props) => {
	
	let options
	if (props.options.length > 1) {
		options = props.options.map(op => ({ value: op, label: op }))
	} else {
		const maxOptions = props.options
		options = new Array(maxOptions).fill().map((op, i) => ({ value: i, label: i }))
		console.log('pero que tambien pichea : ', options)
	}

	const [selected, setSelected] = useState(options[0])

	return (
		<div className={classes.SelectedWrapper}>
			<div className={classes.Label}>{props.label}</div>
			<Select
				className={classes.Selected}
				classNamePrefix={classes.InnerSelected}
				onChange={setSelected}
				defaultValue={selected}
				options={options} />
		</div>
	)
}

export default Selected
