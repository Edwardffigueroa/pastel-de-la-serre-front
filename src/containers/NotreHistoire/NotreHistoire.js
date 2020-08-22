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


const NotreHistoire = props => {
    

    useEffect(() => {        
        
        // var videod = document.getElementsByClassName("background");
        // videod.muted =true;


    }, []);


    return (
        
        <div className={classes.Wrapper}>
            <video className={classes.background} loop autoPlay playsInline muted={true} poster={poster}>
            <source src={sample} type="video/mp4"/>
            <source src={sample} type="video/ogg"/>
            Your browser does not support the video tag.
            </video>

            <div className={classes.copyInfo} >
            
            <img src={sponsor} placeholder="sponsors"/>
            <p className="copy">Made with love and kindness by LaTierra</p>
            </div>            

            <section>    
                           
                <div className={classes.TitleWrapper}>
                    <h1>Nous <br /> renouvelons<br /> notre site web</h1>
                    <p>Pendant cette période difficile, nous avons travaillé sur le renouvellement de notre site Web en explorant de nouvelles et différentes façons de communiquer au monde l’histoire et la richesse culturelle de notre région et notre engagement envers l’environnement à travers tous nos produits et techniques de teinture. En attendant, nous accueillons toujours tous nos visiteurs pour leur faire découvrir le merveilleux univers de Pastel. Cliquez simplement sur le lien ci-dessous pour réserver votre visite … nous serons ravis de partager cette expérience avec vous.</p>
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
