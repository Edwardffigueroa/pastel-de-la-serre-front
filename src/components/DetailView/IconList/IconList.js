import React from 'react';

import timeIcon from '../../../assets/detailView/time.svg'
import peopleIcon from '../../../assets/detailView/people.svg'
import levelIcon from '../../../assets/detailView/mountain.svg'
import recycleIcon from '../../../assets/recycle.svg'
import organicIcon from "../../../assets/organic.svg"
import handICon from "../../../assets/hand.svg"

import classes from './IconList.module.css'

const IconList = ({ isShop }) => {
	return (
		<ul className={classes.Details}>
			<li>
				{
					isShop ?
						<img src={recycleIcon} alt="Recycle" />
						: <img src={timeIcon} alt="Time" />

				}
				{

				}
			</li>
			<li>
				{
					isShop ?
						<img src={organicIcon} alt="Organic %" />
						: <img src={peopleIcon} alt="People" />

				}
			</li>
			<li>
				{
					isShop ?
						<img src={handICon} alt="Hand Made" />
						: <img src={levelIcon} alt="Level" />

				}
			</li>
		</ul>
	)
}

export default IconList
