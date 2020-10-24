import React from 'react';
import classes from './RowsNavigation.module.css'
import backwards from '../../../assets/backwards.svg'
import foward from '../../../assets/foward.svg'

const RowsNavigation = (props) => {

	const myclasses = props.isDetailView ? [classes.RowsNavigation, classes.Detail].join(' ') : classes.RowsNavigation

	return (
		<div className={myclasses}>
			<div onClick={props.isDetailView ? e => props.changeItem('back') : e => props.goHandler('back')}>
				<img src={backwards} alt="go back" />
			</div>
			<div onClick={props.isDetailView ? e => props.changeItem('foward') : e => props.goHandler('foward')}>
				<img src={foward} alt="gp forward" />
			</div>
		</div>
	)
}

export default RowsNavigation
