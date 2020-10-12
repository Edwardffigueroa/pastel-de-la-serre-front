import React, { useState, useEffect } from 'react'
import classes from './Boutique.module.css'

import Button from '../../components/UI/Button/Button'
import InfiniteSlider from '../../components/Silder/InfiniteSlider'

import Shadow from '../../components/UI/Shadow/Shadow'
import RowsNavigation from '../../components/Navigation/RowsNavigation/RowsNavigation'

import DetailView from '../../components/DetailView/DetailView'
import GoToDetails from '../../utils/GoToDetails'
import { Route } from 'react-router-dom'


const Boutique = ({ match }) => {

    const [items, setItems] = useState([])
    const [itemSelected, setItemSelected] = useState(false)
    const [cssStyles, setCssStyles] = useState(classes.Wrapper)

    useEffect(() => {
        fetch('../../data/shop.json')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setItems(data)
            })
    }, [])

    useEffect(() => {
        const myClasses = itemSelected && !match.isExact
            ? [classes.Wrapper, classes.WrapperOnTop].join(' ')
            : [classes.Wrapper]
        setCssStyles(myClasses)
    }, [match, itemSelected])


    const goToDetail = (e, history, id) => {
        const selected = items.find(item => item._id === id)
        setItemSelected(selected)
        GoToDetails(e, history, id)
    }


    return (
        <div className={cssStyles}>
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
                    <Button isShop >Visitez Notre Boutique!</Button>
                </div>
            </section>
            <section className={classes.SectionSliderWrapper}>
                <InfiniteSlider
                    items={items}
                    goToDetail={goToDetail} />
                <RowsNavigation />
            </section>
            <Route
                path={`${match.path}/detail/:id`}
                render={() => (
                    <DetailView
                        items={items}
                        img={itemSelected.picture}
                        title={itemSelected.title}
                        time={itemSelected.time}
                        people={itemSelected.people}
                        level={itemSelected.level}
                        price={itemSelected.price}
                        productSizes={itemSelected.sizes}
                        productStock={itemSelected.stock}
                        description={itemSelected.description} />
                )} />
        </div>
    );
}

export default Boutique
