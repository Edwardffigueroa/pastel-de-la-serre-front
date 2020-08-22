import React, { useEffect } from 'react'
import classes from './VisitezNous.module.css'

import Button from '../../components/UI/Button/Button'

import { a } from 'react-spring'
import InfiniteSlider from '../../components/Silder/Slider'
import items from '../../components/Silder/items'

const VisitezNous = props => {

    // useEffect(() => {
    //     const script = document.createElement('script');
      
    //     script.src = "https://booking.addock.co/widget.js";
    //     // script.async = true;
      
    //     document.body.appendChild(script);
      
    //     return () => {
    //       document.body.removeChild(script);
    //     }
    //   }, []);

    return (
        <>
        
        <div className="reserv">
            <div class="easyloisirs_module" data-hash="44c0b316a69a286fb40cf81166f64328d4353cb0"></div>
            </div>
            
        {/* <div className={classes.Wrapper}>
            
            <section>
                <div className={classes.TitleWrapper}>
                    <h1>Parcourez <br /> l’histoire<br /> du Pastel</h1>
                    <p>Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit.
                    Nunc pulvinar finibus erat.
                    Vestibulum in nulla et quam gravida blandit.
                    Donec iaculis metus ullamcorper nisl consequat, in vulputate ante congue.
                    Nulla at rhoncus turpis. Aliquam molestie ex quam.
                    Morbi laoreet a massa id fringilla. Nullam sagittis tellus nibh,
                    vestibulum ullamcorper mauris ultrices quis.
                      Nam malesuada congue ligula quis egestas. Cras mattis nunc porta</p>
                    <Button type="First">Découvrez Notre Domaine!</Button>
                </div>
            </section>
            <section className={classes.SectionSliderWrapper}>

                <InfiniteSlider items={items} visible={3}>
                    {({ css }, i) => (
                        <div className={classes.Content}>
                            <span className={classes.Marker}>{String(i).padStart(2, '0')}</span>
                            <a.div className={classes.Image} style={{ backgroundImage: css }} ></a.div>
                        </div>
                    )}
                </InfiniteSlider>

            </section> 
        </div>*/}
        </>
    );
}

export default VisitezNous
