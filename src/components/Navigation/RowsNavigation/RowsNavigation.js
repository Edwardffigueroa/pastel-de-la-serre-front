import React from 'react';

import classes from './RowsNavigation.module.css'
import backwards from '../../../assets/backwards.svg'

const RowsNavigation = (props) => {
	return (
		<div className={classes.RowsNavigation}>
			<div>
				<img src={backwards} alt="go back" />
			</div>
			<div>
				<img src={backwards} alt="go back" />
			</div>
		</div>
	)
}

export default RowsNavigation
