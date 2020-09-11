const GoToDetail = (e, history, id) => {
    if (e.target.className) {
        let targetClasses = e.target.className
        targetClasses = targetClasses.includes('Selected') | targetClasses.includes('Title')
        if (targetClasses) {
            const _path = history.location.pathname === '/' ? '/notre-histoire' : history.location.pathname
            history.push(_path + '/detail/' + id)
        }
    }
}

export default GoToDetail