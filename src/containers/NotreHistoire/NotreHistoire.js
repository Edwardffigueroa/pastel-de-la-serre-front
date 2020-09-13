import React, { useEffect } from 'react'
import classes from './NotreHistoire.module.css'

import Button from '../../components/UI/Button/Button'


import { a } from 'react-spring'
import InfiniteSlider from '../../components/Silder/Slider'
import items from '../../components/Silder/items'
import { NavLink } from 'react-router-dom'
import sponsor from '../../assets/logo_sponsors.svg'
import sample from '../../assets/Pastel.mp4'
import poster from '../../assets/images/notre_histoire/DJI_0002.png'
import { Trans, useTranslation } from 'react-i18next'


const NotreHistoire = props => {

    const { t, i18n } = useTranslation();

    const changeLang = (language) => {
        i18n.changeLanguage(language);
    }

    let video = window.innerWidth > 500 ? true : false;


    return (

        <div className={classes.Wrapper} >


            {video ?

                <video className={classes.background} loop autoPlay playsInline muted={true} poster={poster}>
                    <source src={sample} type="video/mp4" />
                    <source src={sample} type="video/ogg" />
            Your browser does not support the video tag.
            </video>
                : <>

                </>}
            {/* <button onClick={() => changeLang('en')}>EN</button>
            <button onClick={() => changeLang('fr')}>FR</button> */}

            <section className={classes.textPpal}>

                <div className={classes.TitleWrapper}>
                    <h1>{t("title.part1")} <br /> {t("title.part2")} <br /> {t("title.part3")}</h1>
                    <p>{t("description")}</p>
                    <a href="/visitez-nous">
                        <Button type="First">
                            {t("main_button")}
                        </Button>
                    </a>
                </div>

            </section>
            <section className={classes.SectionSliderWrapper}>


                {/* <InfiniteSlider  items={items} visible={3}>
                    {({ css }, i) => (
                        <div className={classes.Content}>
                            <span className={classes.Marker}>{String(i).padStart(2, '0')}</span>
                            <a.div className={classes.Image} style={{ backgroundImage: css }} ></a.div>
                        </div>
                    )}
                </InfiniteSlider> */}

            </section>

            <div className={classes.copyInfo} >

                <img src={sponsor} placeholder="sponsors" />
                <p className="copy">{t("text_footer")}</p>
            </div>


        </div>
    );
}

export default NotreHistoire
