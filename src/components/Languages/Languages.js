import React, { useState } from 'react';

import classes from './Languages.module.css'

const Languages = (props) => {

	const [t, seti18n] = useState('fr');
	const changeLanguage = e => {
		seti18n(e.target.textContent)
		props.changeLang(e.target.textContent)
	}


	const style = props.capitalize
		? [classes.Option, classes.Capitalize]
		: [classes.Option, classes.Uppercase]

	const options = props.lang.map(lang => <span key={lang} onClick={changeLanguage} className={`${style.join(' ')} ${lang === t ? classes.Selected : ""}`}>{lang}</span>)
	options.splice(1, 0, <span key={'separator'} className={classes.Separator}>/</span>);

	return (
		!props.drawer ?
		<div className={classes.Languages}>{options}</div>
		: <div className={classes.LanguagesDrawer}>{options}</div>
	)

}

export default Languages
