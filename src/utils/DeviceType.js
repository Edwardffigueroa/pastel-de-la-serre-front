window.addEventListener('resize', () => DeviceType())
const DeviceType = () => {

    const device = {
        type: '',
        width: window.innerWidth,
        height: window.innerHeight
    }

    switch (true) {
        case device.width < 375:
            device.type = 'smallest'
            device.width = 168
            device.height = 215
            break;
        case device.width < 768:
            device.type = 'small'
            device.width = 187
            device.height = 215
            break;
        case device.width < 1080:
            device.type = 'tablet'
            device.width = 224
            device.height = 339
            break;
        case device.width < 1920:
            device.type = 'desktop'
            device.width = 202
            device.height = 305
            break;
        case device.width >= 1920:
            device.type = 'large'
            device.width = 363
            device.height = 550
            break;
        default:
            device.type = 'desktop'
            device.width = 202
            device.height = 305
            break;
    }

    return device
}

export default DeviceType