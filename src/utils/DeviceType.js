const DeviceType = () => {

    const device = {
        type: '',
        width: window.screen.availWidth,
        height: window.screen.availHeight
    }

    switch (true) {
        case device.width < 375:
            device.type = 'smallest'
            break;
        case device.width < 768:
            device.type = 'small'
            break;
        case device.width < 1080:
            device.type = 'tablet'
            break;
        case device.width < 1280:
            device.type = 'desktop'
            break;
        case device.width >= 1280:
            device.type = 'large'
            break;
        default:
            device.type = 'desktop'
            break;
    }
    return device
}

export default DeviceType