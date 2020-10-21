import React, { useState, useEffect } from 'react'
import classes from './VisitezNous.module.css'

import Shadow from '../../components/UI/Shadow/Shadow'
import Button from '../../components/UI/Button/Button'

import InfiniteSlider from '../../components/Silder/InfiniteSlider'
import RowsNavigation from '../../components/Navigation/RowsNavigation/RowsNavigation'

import DetailView from '../../components/DetailView/DetailView'
import GoToDetails from '../../utils/GoToDetails'
import { Route, useRouteMatch } from "react-router-dom";

const VisitezNous = ({ match }) => {

    const [items, setItems] = useState([])
    const [itemSelected, setItemSelected] = useState({})
    const [indexSelected, setIndexSelected] = useState(0)
    const innerMatch = useRouteMatch(`${match.path}/detail/:id`)

    useEffect(() => {
        fetch('../../data/home.json')
            .then(res => res.json())
            .then(data => {
                setItems(data)
            })
    }, [])


    const myClasses = innerMatch
        ? [classes.Wrapper, classes.WrapperOnTop].join(' ')
        : [classes.Wrapper].join('')


    const goToDetail = (e, history, id) => {
        const _index = items.findIndex(item => item._id === id)
        const selected = items.find(item => item._id === id)
        setItemSelected(selected)
        setIndexSelected(_index)
        GoToDetails(e, history, id)
    }

    const changeItemHandler = direction => {

        let _i = indexSelected
        if (direction === 'back') {
            _i = _i === 1 ? (items.length - 1) : (indexSelected - 1)
        } else {
            _i = _i === (items.length - 1) ? 0 : indexSelected + 1
        }
        setItemSelected(items[_i])
        setIndexSelected(_i)
    }


    return (<div className={myClasses}>
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
                    description={itemSelected.description}
                    changeItemHandler={changeItemHandler} />)} />
    </div>)


}

export default VisitezNous
