
const general = async () => {
    const res = await fetch('https://pastel-de-la-serre-backend.uc.r.appspot.com/general')
    const data = await res.json()
    return data
}


const history = async () => {
    const res = await fetch('https://pastel-de-la-serre-backend.uc.r.appspot.com/history')
    const data = await res.json()
    return data
}


const visit = async () => {
    const res = await fetch('https://pastel-de-la-serre-backend.uc.r.appspot.com/visit')
    const data = await res.json()
    return data
}

const boutique = async () => {
    const res = await fetch('https://pastel-de-la-serre-backend.uc.r.appspot.com/boutique')
    const data = await res.json()
    return data
}


export const products = async () => {
    const res = await fetch('https://pastel-de-la-serre-backend.uc.r.appspot.com/products/')
    const data = await res.json()
    return data
}

const checkout = async () => {
    const res = await fetch('https://pastel-de-la-serre-backend.uc.r.appspot.com/checkout')
    const data = await res.json()
    return data
}


const wrapPromise = (promise) => {
    let status = 'pending'
    let result
    let suspender = promise.then(
        res => {
            status = 'success'
            result = res
        },
        err => {
            status = 'error'
            result = err
        })

    return {
        read() {
            if (status === 'pending') {
                throw suspender
            } else if (status === 'error') {
                throw result
            } else if (status === 'success') {
                return result
            }
        }
    }
}

export const fetchAll = () => {

    const _general = general()
    const _history = history()
    const _visit = visit()
    const _boutique = boutique()
    const _products = products()
    const _checkout = checkout()

    return {
        general: wrapPromise(_general),
        history: wrapPromise(_history),
        visit: wrapPromise(_visit),
        boutique: wrapPromise(_boutique),
        products: wrapPromise(_products),
        checkout: wrapPromise(_checkout)
    }
}




