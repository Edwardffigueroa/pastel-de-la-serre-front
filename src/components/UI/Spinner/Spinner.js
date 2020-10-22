import React from 'react';

import logo from '../../../assets/images/logo.svg'
import classes from './Spinner.module.css'

const Spinner = (props) => {
	return (
		<div className={classes.Spinner}>
			<img src={logo} alt="Pastel de la serre" />
			<div class={classes.ldsEllipsis}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	)
}

export default Spinner
