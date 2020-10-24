import React from 'react';

import classes from './Histoire.module.css'

const Histoire = ({ text }) => {
	return (
		<div className={classes.Histoire}>{text}</div>
	)
}

export default Histoire
