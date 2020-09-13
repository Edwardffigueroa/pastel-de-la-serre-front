import React from 'react';
import GoToDetail from '../../utils/GoToDetails';
import Card from '../UI/Card/Card';
import { useHistory } from "react-router-dom";
import classes from './CardList.module.css'

const CardList = (props) => {

	const history = useHistory()
	const list = props.items.map((item, i) => (
		<div className={classes.CardWrapper}>
			<Card
				key={i}
				noFlag
				title={item.title}
				description={item.description}
				clicked={e => GoToDetail(e, history, i)}>
			</Card>
		</div>
	))
	return (
		<div className={classes.CardList}>
			{list}
		</div>
	)
}

export default CardList
