import React from 'react';

import timeIcon from '../../assets/detailView/time.svg'
import peopleIcon from '../../assets/detailView/people.svg'
import levelIcon from '../../assets/detailView/mountain.svg'
import classes from './DetailView.module.css'
import InfiniteSlider from '../Silder/InfiniteSlider';

const DetailView = (props) => {
	return (
		<div className={classes.DetailView}>
			<section className={classes.ImageWrapper}>
				<img src={props.url} alt={props.description} />
			</section>
			<section>
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
				<div>
					<InfiniteSlider
						items={props.items} />
				</div>
			</section>
			<span>close X </span>
		</div>
	)
}

export default DetailView
