import React, { useState, useEffect } from 'react'
import classes from './VisitezNous.module.css'

import Shadow from '../../components/UI/Shadow/Shadow'
import Button from '../../components/UI/Button/Button'

import InfiniteSlider from '../../components/Silder/InfiniteSlider'
import RowsNavigation from '../../components/Navigation/RowsNavigation/RowsNavigation'

import DetailView from '../../components/DetailView/DetailView'
import GoToDetails from '../../utils/GoToDetails'
import { Route } from "react-router-dom";

const VisitezNous = ({ match }) => {

    const [items, setItems] = useState([])
    const [itemSelected, setItemSelected] = useState(false);
    const [cssStyles, setCssStyles] = useState(classes.Wrapper)


    useEffect(() => {
        fetch('../../data/home.json')
            .then(res => res.json())
            .then(data => {
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
                    <h1>Parcourez <br /> l’histoire<br /> du Pastel</h1>
                    <p>Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit.
                    Nunc pulvinar finibus erat.
                    Vestibulum in nulla et quam gravida blandit.
                    Donec iaculis metus ullamcorper nisl consequat, in vulputate ante congue.
                    Nulla at rhoncus turpis. Aliquam molestie ex quam.</p>
                    <Button >Découvrez Notre Domaine</Button>
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
                        description={itemSelected.description} />)} />
        </div>
    );
}

export default VisitezNous
