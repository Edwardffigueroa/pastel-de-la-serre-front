import React from 'react';

import classes from './Languages.module.css'

const Languages = (props) => {

	const changeLanguage = e => console.log(e.target)

	const style = props.capitalize
		? [classes.Option, classes.Capitalize]
		: [classes.Option, classes.Uppercase]

	const options = props.lang.map(lang => <span onClick={changeLanguage} className={style.join(' ')}>{lang}</span>)

	return (
		<div className={classes.Languages}>{options}</div>
	)
}

export default Languages
