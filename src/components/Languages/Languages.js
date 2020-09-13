import React from 'react';
import { useTranslation } from 'react-i18next';

import classes from './Languages.module.css'

const Languages = (props) => {

	const { t, i18n } = useTranslation();

	const changeLanguage = e => i18n.changeLanguage(e.target.textContent)

	const style = props.capitalize
		? [classes.Option, classes.Capitalize]
		: [classes.Option, classes.Uppercase]

	const options = props.lang.map(lang => <span key={lang} onClick={changeLanguage} className={`${style.join(' ')} ${lang == i18n.language ? classes.Selected : ""}`}>{lang}</span>)
	options.splice(1, 0, <span className={classes.Separator}>/</span>);
	return (
		<div className={classes.Languages}>{options}</div>
	)
}

export default Languages
