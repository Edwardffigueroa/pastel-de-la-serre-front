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

        const prevClient = getPersistance(CONSTANTS.CLIENT)
        const prevProducts = getPersistance(CONSTANTS.PRODUCTS)
        const prevTours = getPersistance(CONSTANTS.TOURS)
        const prevPrice = getPersistance(CONSTANTS.PRICE)


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

        if (prevPrice) {
            this.totalPrice = prevPrice
        } else {
            savePersistance(CONSTANTS.PRICE, this.totalPrice)
        }

    }

    setProducts(products, totalPrice) {
        this.products = products
        this.totalPrice = totalPrice
        savePersistance(CONSTANTS.PRODUCTS, this.products)
        savePersistance(CONSTANTS.PRICE, this.totalPrice)
    }

    getProducts() {
        return this.products || []
    }

    getPrice() {
        return this.totalPrice || 0
    }

    increaseItem(prodId, size) {
        const found = this.products.find(p => p.id === prodId)
        found.amount[size]++
        const updatedProds = this.products.map(p => p.id === prodId ? found : p)
        this.products = updatedProds
        this.totalPrice = this.totalPrice + found.price
        savePersistance(CONSTANTS.PRICE, this.totalPrice)
        savePersistance(CONSTANTS.PRODUCTS, updatedProds)
    }

    decreaaseItem(prodId, size) {

        const found = this.products.find(p => p.id === prodId)

        if (found.amount[size] <= 1) {
            delete found.amount[size]
        } else {
            found.amount[size]--
        }

        let updatedProds
        if (Object.keys(found.amount).length > 0) {
            updatedProds = this.products.map(p => p.id === prodId ? found : p)
        } else {
            updatedProds = this.products.filter(p => p.id !== prodId)
        }

        this.products = updatedProds
        this.totalPrice = this.totalPrice - found.price
        savePersistance(CONSTANTS.PRICE, this.totalPrice)
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
        const _price = found.amount[size] * found.price

        delete found.amount[size]
        let updatedProds
        if (Object.keys(found.amount).length > 0) {
            updatedProds = this.products.map(p => p.id === prodId ? found : p)
        } else {
            updatedProds = this.products.filter(p => p.id !== prodId)
        }

        this.products = updatedProds
        this.totalPrice = this.totalPrice - _price
        savePersistance(CONSTANTS.PRICE, this.totalPrice)
        savePersistance(CONSTANTS.PRODUCTS, updatedProds)
    }

    addItem(product, cb) {

        const prodSize = Object.keys(product.amount)[0]
        const quantity = Object.values(product.amount)[0]
        const _price = product.price * quantity

        const _exist = this.getItem(product.id)

        if (!_exist) {
            this.products.push(product)
            this.totalPrice = +this.totalPrice + _price
            savePersistance(CONSTANTS.PRODUCTS, this.products)
            savePersistance(CONSTANTS.PRICE, this.totalPrice)
            cb(this.products)
            return
        }

        const _sizeExist = Object.keys(_exist.amount).find(size => size === prodSize)

        if (_sizeExist) {
            _exist.amount[_sizeExist] += quantity
            this.totalPrice = +this.totalPrice + _price
            savePersistance(CONSTANTS.PRODUCTS, this.products)
            savePersistance(CONSTANTS.PRICE, this.totalPrice)
            cb(this.products)
            return
        }

        _exist.amount[prodSize] = quantity
        this.totalPrice = +this.totalPrice + _price
        savePersistance(CONSTANTS.PRODUCTS, this.products)
        savePersistance(CONSTANTS.PRICE, this.totalPrice)
        cb(this.products)
        return
    }

}

const instance = new Cart()
export default instance