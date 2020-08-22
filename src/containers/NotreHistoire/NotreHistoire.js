import React from 'react'
import classes from './NotreHistoire.module.css'

import Button from '../../components/UI/Button/Button'


import { a } from 'react-spring'
import InfiniteSlider from '../../components/Silder/Slider'
import items from '../../components/Silder/items'
import sample from '../../assets/Pastel_09.mp4'
import { NavLink } from 'react-router-dom'
import sponsor from '../../assets/logo_sponsors.svg'


const NotreHistoire = props => {

    return (
        
        <div className={classes.Wrapper}>
            <div className={classes.copyInfo} >
            
            <img src={sponsor} placeholder="sponsors"/>
            <p className="copy">Made with love and kindness by LaTierra</p>
            </div>            

            <section>    
                           
                <div className={classes.TitleWrapper}>
                    <h1>We’re <br /> renewing<br /> our website</h1>
                    <p>During this hard times we’ve been working on renewing our website exploring new and different ways communicate to the world the history and cultural richness of our region and our commitment with the environment trough all our products and dyeing techniques. In the meantime we still welcoming all our visitors to walk them through the marvelous universe of Pastel. Just click on the link below to book your visit… we will be so happy to share this experience with you.</p>
                    <a href="/visitez-nous">
                        <Button type="First">                        
                            Réservez votre visite                            
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
            

        </div>
    );
}

export default NotreHistoire
