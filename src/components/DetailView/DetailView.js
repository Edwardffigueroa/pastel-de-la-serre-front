import React from 'react';

import timeIcon from '../../assets/detailView/time.svg'
import peopleIcon from '../../assets/detailView/people.svg'
import levelIcon from '../../assets/detailView/mountain.svg'
import classes from './DetailView.module.css'
import InfiniteSlider from '../Silder/InfiniteSlider';
import CardList from '../CardList/CardList';

import closeX from '../../assets/detailView/close.svg'
import Button from '../UI/Button/Button'
import RowsNavigation from '../Navigation/RowsNavigation/RowsNavigation';

import { useHistory } from 'react-router-dom'

const DetailView = (props) => {

	const history = useHistory()

	return (
		<div className={classes.DetailView}>
			<div className={classes.DetailWrapper}>
				<section className={classes.ImageWrapper}>
					<img src={props.img} alt={props.description} />
					<div className={classes.ImageCTA}>
						<Button isOverImage>Réservez</Button>
					</div>
				</section>
				<section className={classes.Content}>
					<div className={classes.TitleWrapper}>
						<h1 className={classes.Title}>Les Ateliers de Pastel</h1>
						<ul className={classes.Details}>
							<li>
								<img src={timeIcon} alt="Time" />
							</li>
							<li>
								<img src={peopleIcon} alt="People" />
							</li>
							<li>
								<img src={levelIcon} alt="Difficulty Level" />
							</li>
						</ul>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							Nunc pulvinar finibus erat. Vestibulum in nulla et quam gravida blandit.
							Donec iaculis metus ullamcorper nisl consequat, in vulputate ante congue.
							Nulla at rhoncus turpis. Aliquam molestie ex quam. Morbi laoreet a massa id fringilla.
							Nullam sagittis tellus nibh, vestibulum ullamcorper mauris ultrices quis.
							Nam malesuada congue ligula quis egestas. Cras mattis nunc porta
					</p>
					</div>
					<div className={classes.SimilarItems}>
						<CardList
							items={props.items} />
						<InfiniteSlider
							detailView
							items={props.items} />
					</div>
					<div className={classes.CTA}>
						<Button>Réservez</Button>
					</div>
					<div className={classes.Navigations}>
						<RowsNavigation />
					</div>
				</section>
				<span className={classes.Close}>
					<img src={closeX} alt="close" onClick={e => history.push('/')} />
				</span>
			</div>
		</div>
	)
}

export default DetailView
