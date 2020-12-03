import React from 'react';
import Card from '../UI/Card/Card';
import classes from './CardList.module.css'

const CardList = (props) => {

	const goToTop = event => {
		window.scrollTo({
			top: 100,
			left: 0,
			behavior: 'smooth'
		})
	}

	const list = props.items.map((item, i) => (
		i < 4 ?
			<div onClick={goToTop} key={i} className={classes.CardWrapper}>
				<Card
					noFlag
					index={i}
					active={0}
					id={item.id}
					title={item.title1 + " " + item.title2}
					image={item.cover_image.url}
					clicked={props.goCardHandler}
					detailView>
				</Card>
			</div> : null
	))
	return (
		<div className={classes.CardList}>
			{list}
		</div>
	)
}

export default CardList
