import React from 'react';

import classes from './Spinner.module.css'

const Spinner = (props) => {
	return (
		<div class={classes.ldsEllipsis}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	)
}

export default Spinner
