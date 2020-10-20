import React from 'react';

import { useHistory } from 'react-router-dom'
import classes from './RowsNavigation.module.css'
import backwards from '../../../assets/backwards.svg'
import foward from '../../../assets/foward.svg'

const RowsNavigation = (props) => {

	const history = useHistory()
	const myclasses = props.isDetailView ? [classes.RowsNavigation, classes.Detail].join(' ') : classes.RowsNavigation

	const goHandler = direction => {
		const currentLocation = history.location.pathname
		if (!currentLocation.includes('detail/')) {
			routingContainers(direction, currentLocation)
		} 
	}
	const routingContainers = (direction, currentLocation) => {
		switch (currentLocation) {
			case '/notre-histoire':
				if (direction === 'foward') {
					history.push('/visitez-nous')
				}
				if (direction === 'back') {
					history.push('/boutique')
				}
				break;
			case '/visitez-nous':
				if (direction === 'foward') {
					history.push('/boutique')
				}
				if (direction === 'back') {
					history.push('/notre-histoire')
				}
				break;
			case '/boutique':
				if (direction === 'foward') {
					history.push('/notre-histoire')
				}
				if (direction === 'back') {
					history.push('/visitez-nous')
				}
				break;
			default:
				if (direction === 'foward') {
					history.push('/visitez-nous')
				}
				if (direction === 'back') {
					history.push('/boutique')
				}
				break;
		}
	}

	return (
		<div className={myclasses}>
			<div onClick={props.isDetailView ? e => props.changeItem('back') : e => goHandler('back')}>
				<img src={backwards} alt="go back" />
			</div>
			<div onClick={props.isDetailView ? e => props.changeItem('foward') : e => goHandler('foward')}>
				<img src={foward} alt="gp forward" />
			</div>
		</div>
	)
}

export default RowsNavigation
