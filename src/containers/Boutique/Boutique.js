import React, { useState, useEffect } from 'react'
import classes from './Boutique.module.css'

import Button from '../../components/UI/Button/Button'
import InfiniteSlider from '../../components/Silder/InfiniteSlider'

import Shadow from '../../components/UI/Shadow/Shadow'


const Boutique = () => {

    const [items, setItems] = useState([])

    useEffect(() => {
        fetch('https://picsum.photos/v2/list?page=1&limit=10')
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setItems(data)
            })
    }, [])

    return (
        <div className={classes.Wrapper}>
            <Shadow />
            <section>
                <div className={classes.TitleWrapper}>
                    <h1>Des produits <br /> Organiques & <br /> Recyclables</h1>
                    <p>Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit.
                    Nunc pulvinar finibus erat.
                    Vestibulum in nulla et quam gravida blandit.
                    Donec iaculis metus ullamcorper nisl consequat, in vulputate ante congue.
                    Nulla at rhoncus turpis. Aliquam molestie ex quam.
                    Morbi laoreet a massa id fringilla. Nullam sagittis tellus nibh,
                    vestibulum ullamcorper mauris ultrices quis.
                          Nam malesuada congue ligula quis egestas. Cras mattis nunc porta</p>
                    <Button type="First">Visitez Notre Boutique!</Button>
                </div>
            </section>
            <section className={classes.SectionSliderWrapper}>

                <InfiniteSlider items={items} />
            </section>
        </div>
    );
}

export default Boutique
