import ClientJS from 'clientjs'

const CONSTANTS = {
    CLIENT: 'CLIENT',
    DATE: 'DATE',
    PRODUCTS: 'PRODUCTS',
    TOURS: 'TOURS',
    PRICE: 'PRICE'
}

const savePersistance = (key, object) => {
    const _item = JSON.stringify(object)
    localStorage.setItem(key, _item)
}

const getPersistance = (key) => {
    let _item = localStorage.getItem(key)
    _item = JSON.parse(_item)
    return _item
}

class Cart {

    constructor() {
        this.client = ''
        this.tours = []
        this.products = []
        this.totalPrice = 0

        const prevClient = getPersistance(CONSTANTS.CLIENT) || null
        const prevProducts = getPersistance(CONSTANTS.PRODUCTS) || null
        const prevTours = getPersistance(CONSTANTS.TOURS) || null
        const prevPrice = getPersistance(CONSTANTS.PRICE) || null


        if (prevClient) {
            this.client = prevClient
        } else {
            let _client = new ClientJS().getResult()
            this.client = _client
            const date = Date.now()
            savePersistance(CONSTANTS.CLIENT, _client)
            savePersistance(CONSTANTS.DATE, date)
        }

        if (prevProducts) {
            this.products = prevProducts
        } else {
            savePersistance(CONSTANTS.PRODUCTS, this.products)
        }

        if (prevTours) {
            this.tours = prevTours
        } else {
            savePersistance(CONSTANTS.TOURS, this.tours)
        }

    }

    increaseItem(prodId, size) {
        const found = this.products.find(p => p.id === prodId)
        found.amount[size]++
        const updatedProds = this.products.map(p => p.id === prodId ? found : p)
        this.products = updatedProds
        savePersistance(CONSTANTS.PRODUCTS, updatedProds)
    }

    decreaaseItem(prodId, size) {
        const found = this.products.find(p => p.id === prodId)
        if (found.amount[size] < 1) {
            delete found.amount[size]
        } else {
            found.amount[size]--
        }
        const updatedProds = this.products.map(p => p.id === prodId ? found : p)
        this.products = updatedProds
        savePersistance(CONSTANTS.PRODUCTS, updatedProds)
    }


    addJourney(tour) {
        const found = this.tours.find(t => t.id === tour.id)
        if (found) {
            found.people += tour.people
        } else {
            this.tours.push(tour)
        }
        const updatedtours = this.tours.map(t => tour.id === t.id ? found : t)
        this.tours = updatedtours
        savePersistance(CONSTANTS.TOURS, updatedtours)
    }

    getItem(id) {
        const found = this.products.find(p => p.id === id)
        return found
    }

    deleteAll(prodId, size) {
        const found = this.products.find(p => p.id === prodId)
        delete found.amount[size]
        const updatedProds = this.products.map(p => p.id === prodId ? found : p)
        this.products = updatedProds
        savePersistance(CONSTANTS.PRODUCTS, updatedProds)
    }

    addItem(product) {

        const prodSize = Object.keys(product.amount)[0]
        const quantity = Object.values(product.amount)[0]
        const found = this.products.find(p => p.id === product.id)

        if (!found) {
            this.products.push(product)
        }

        if (found) {
            const _sizeExist = Object.keys(found.amount).find(size => size === prodSize)
            if (_sizeExist) {
                found.amount[_sizeExist] += quantity
            } else {
                found.amount[prodSize] = quantity
            }
            const updatedProds = this.products.map(p => (p.id === product.id ? found : p))
            this.products = updatedProds
        }

        savePersistance(CONSTANTS.PRODUCTS, this.products)
    }

}

const instance = new Cart()
export default instance