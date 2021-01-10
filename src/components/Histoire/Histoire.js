import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm'
import classes from './Histoire.module.css'

const Histoire = ({ text }) => {
	return (
		<div className={classes.Histoire}>
			<ReactMarkdown plugins={[gfm]} allowDangerousHtml children={text} />
		</div>
	)
}

export default Histoire
