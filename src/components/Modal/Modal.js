import React from 'react'
import closeX from '../../assets/detailView/close.svg'
import logo from '../../assets/images/logo.svg'
import classes from './Modal.module.css'

const Modal = ({ confirmed,
	close,
	back,
	approved,
	approvedTitle,
	approvedDescription,
	declineTitle,
	declineDescription,
	button }) => {

	window.scrollTo(0, 0)

	return confirmed ? (
		<div className={classes.ModalWrapper}>
			<div className={classes.Modal}>
				<span onClick={back} className={classes.Close}><img src={closeX} alt="close" /></span>
				<div className={classes.ImageWrapper}>
					<img src={logo} alt="Pastel de la serre" />
				</div>
				<div className={classes.Message}>
					<h1>{approved ? approvedTitle : declineTitle}</h1>
					<p>{approved ? approvedDescription : declineDescription}</p>
				</div>
				<div className={classes.ButtonWrapper}>
					<button onClick={close}> {button}</button>
				</div>
			</div>
		</div>
	) : null
}

export default Modal
