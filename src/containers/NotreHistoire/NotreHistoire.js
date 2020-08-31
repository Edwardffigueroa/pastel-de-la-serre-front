import React, { useState, useEffect } from 'react'
import classes from './NotreHistoire.module.css'

import Button from '../../components/UI/Button/Button'
import Card from '../../components/UI/Card/Card'

import { a } from 'react-spring'
import InfiniteSlider from '../../components/Silder/Slider'
// import items from '../../components/Silder/items'

const NotreHistoire = props => {

    const [items, setItems] = useState([])

    useEffect(() => {
        fetch('https://picsum.photos/v2/list?page=1&limit=10',)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setItems(data)
            })
    }, [])

    return (
        <div className={classes.Wrapper}>
            <section>
                <div className={classes.TitleWrapper}>
                    <h1>Plongez <br /> dans le pays<br /> de Cocagne</h1>
                    <p>Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit.
                    Nunc pulvinar finibus erat.
                    Vestibulum in nulla et quam gravida blandit.
                    Donec iaculis metus ullamcorper nisl consequat, in vulputate ante congue.
                    Nulla at rhoncus turpis. Aliquam molestie ex quam.
                    Morbi laoreet a massa id fringilla. Nullam sagittis tellus nibh,
                    vestibulum ullamcorper mauris ultrices quis.
                          Nam malesuada congue ligula quis egestas. Cras mattis nunc porta</p>
                    <Button type="First">Je le veux!</Button>
                </div>
            </section>
            <section className={classes.SectionSliderWrapper}>

                <InfiniteSlider items={items} visible={10}>
                    {(item, i) => {
                        console.log(item.download_url)
                        return (
                            <div className={classes.Content}>
                                <span className={classes.Marker}>{String(i).padStart(2, '0')}</span>
                                <a.div className={classes.Image}>
                                    <Card image={item.download_url} >
                                    </Card>
                                </a.div>
                            </div>
                        )
                    }}
                </InfiniteSlider>

            </section>
        </div>
    );
}

export default NotreHistoire
