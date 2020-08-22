import React from 'react';
import classes from './DotNav.module.css'
import { useHistory } from 'react-router-dom'

const DotNav = () => {

    const history = useHistory()
    const location = history.location.pathname

    const dotClickHandler = e => {
        const nextURl = e.target.id
        const currentActive = document.querySelector(`#${nextURl}`)
        
        history.push(`/${nextURl}`)
    }

    return (
        // <div className={classes.DotNav}>
        //     <div onClick={dotClickHandler} id="notre-histoire" className={classes.Dot}></div>
        //     <div onClick={dotClickHandler} id="visitez-nous" className={classes.Dot}></div>
        //     <div onClick={dotClickHandler} id="boutique" className={classes.Dot}></div>
        // </div>
        <></>
    );
}

export default DotNav;
