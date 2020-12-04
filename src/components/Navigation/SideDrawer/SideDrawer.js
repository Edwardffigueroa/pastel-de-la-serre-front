import React from 'react'

import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'

import closeX from '../../../assets/images/nav/close.svg'
import Languages from '../../Languages/Languages'

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close]
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }



    const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

    function preventDefault(e) {
        e.preventDefault();
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    // modern Chrome requires { passive: false } when adding event
    const supportsPassive = false;
    try {
        window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
            get: function () { return supportsPassive }
        }));
    } catch (e) { }

    const wheelOpt = supportsPassive ? { passive: false } : false;
    const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

    // call this to Disable
    const disableScroll = () => {
        window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
        window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
        window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
        window.addEventListener('keydown', preventDefaultForScrollKeys, false);
        document.documentElement.style.overflow = 'hidden';
        document.body.scroll = "no";
    }

    // call this to Enable
    const enableScroll = () => {
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
        window.removeEventListener('touchmove', preventDefault, wheelOpt);
        window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
        document.documentElement.style.overflow = 'scroll';
        document.body.scroll = "yes";
    }

    if (props.open) {
        disableScroll()
    } else {
        enableScroll()
    }

    return (
        <div >
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <nav className={classes.NavigationItems}>
                    <NavigationItems options={props.options} goSection={props.goSectionHandler} clicked={props.closed} height="70%" />
                    <span onClick={props.closed}>
                        <img className={classes.closeX} src={closeX} alt="close" />
                    </span>
                    <Languages drawer={true} lang={['fr', 'en']} changeLang={props.languageHandler} />
                </nav>
            </div>
        </div>
    )
}

export default sideDrawer