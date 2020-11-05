import React from 'react'
import closeX from '../../assets/detailView/close.svg'
import logo from '../../assets/images/logo.svg'
import classes from './Modal.module.css'

const Modal = ({ confirmed, close, back }) => {

	window.scrollTo(0, 0)

	return confirmed ? (
		<div className={classes.ModalWrapper}>
			<div className={classes.Modal}>
				<span onClick={back} className={classes.Close}><img src={closeX} alt="close" /></span>
				<div className={classes.ImageWrapper}>
					<img src={logo} alt="Pastel de la serre" />
				</div>
				<div className={classes.Message}>
					<h1>Merci d'avoir acheté <br /> revenez bientôt!</h1>
					<p>votre colis arrivera à l'adresse indiquée <br />  dans les 10 prochains jours</p>
				</div>
				<div className={classes.ButtonWrapper}>
					<button onClick={close}> Revenir </button>
				</div>
			</div>
		</div>
	) : null
}

export default Modal
