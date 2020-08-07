import React from 'react'
import classes from './SideOptions.module.css'

import lupa from '../../../assets/images/nav/lupa.svg'
import cart from '../../../assets/images/nav/cart_bag.svg'

const SideOptions = () => {
    return (
        <section className={classes.Beside}>
            <label htmlFor="search">
                <input name="search" type="text" placeholder="search" />
                <img src={lupa} alt="search" />
            </label>
            <span>
                <img src={cart} alt="cart bag" />
            </span>
        </section>
    );
}

export default SideOptions;
