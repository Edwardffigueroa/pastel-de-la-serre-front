import React from 'react';

import timeIcon from '../../../assets/detailView/time.svg'
import peopleIcon from '../../../assets/detailView/people.svg'
import levelIcon from '../../../assets/detailView/mountain.svg'
import recycleIcon from '../../../assets/recycle.svg'
import organicIcon from "../../../assets/organic.svg"
import handICon from "../../../assets/hand.svg"

import classes from './IconList.module.css'

const IconList = ({ isShop, time, people, organic, recycle, madeof, level }) => {


	const timeOrRecycle = !time && !recycle ? null : (
		<div className={classes.Icon}>
			{ isShop ? <img src={recycleIcon} alt="Recycle" /> : <img src={timeIcon} alt="Time" />}
			<span> {time ? time : recycle}</span>
		</div>
	)


	const peopleOrOrganic = !people ? (
		<div className={classes.Icon}>
			{isShop ? <img src={organicIcon} alt="Organic %" /> : <img src={peopleIcon} alt="People" />}
			<span>{organic}</span>
		</div>
	) : (
			<div className={classes.Icon}>
				{isShop ? <img src={organicIcon} alt="Organic %" /> : <img src={peopleIcon} alt="People" />}
				<span>{people}</span>
			</div>
		)


	const madeOrLevel = !level ?
		(
			<div className={classes.Icon}>
				{isShop ? <img src={handICon} alt="Hand Made" /> : <img src={levelIcon} alt="Level" />}
				<span>{madeof}</span>
			</div>
		) : (
			<div className={classes.Icon}>
				{isShop ? <img src={handICon} alt="Hand Made" /> : <img src={levelIcon} alt="Level" />}
				<span>{level}</span>
			</div>
		)

	return (
		<ul className={classes.Details}>
			<li>{timeOrRecycle}</li>
			<li>{peopleOrOrganic}</li>
			<li>{madeOrLevel}</li>
		</ul>
	)
}

export default IconList
