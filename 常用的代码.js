const log = console.log.bind(console)

const e = function(selector) {
    let element = document.querySelector(selector)
    if (element === null) {
        let s = `选择器 ${selector} 写错了, 请仔细检查并且复习三种基本的选择器`
        alert(s)
        return null
    } else {
        return element
    }
}

const es = function(selector) {
    let elements = document.querySelectorAll(selector)
    if (elements.length === 0) {
        let s = `选择器 ${selector} 写错了, 请仔细检查并且复习三种基本的选择器`
        alert(s)
        return []
    } else {
        return elements
    }
}
// const appendHtml = function(element, html) {
//     element.insertAdjacentHTML('beforeend', html)
// }
const appendHtml = (element, html) => element.insertAdjacentHTML('beforeend', html)


const bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

const removeClassAll = function(className) {
    let selector = '.' + className
    let elements = es(selector)
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        e.classList.remove(className)
    }
}

const bindAll = function(selector, eventName, callback) {
    let elements = es(selector)
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

const find = function(element, selector) {
    let e = element.querySelector(selector)
    if (e === null) {
        let s = `选择器 ${selector} 写错了, 请仔细检查并且复习三种基本的选择器`
        alert(s)
        return null
    } else {
        return e
    }
}


const closestClass = function(element, className) {
    let child = e('.child')
    let parent = e('.parent')
    let e1 = closestClass(child, 'parent')
    let e2 = closestClass(child, 'grand')
    ensure(e1 === parent, 'closestClass test 1')
    ensure(e2 === null, 'closestClass test 2')

    let e = element

    while (e !== null) {
        if (e.classList.contains(className)) {
            return e
        } else {
            e = e.parentElement
        }
    }

    return null
}

const closestId = function(element, idName) {

    let e = element

    while (e !== null) {
        if (e.id === idName) {
            return e
        } else {
            e = e.parentElement
        }
    }

    return null
}

const closestTag = function(element, tagName) {

    let e = element

    while (e !== null) {
        if (e.tagName.toUpperCase() === tagName.toUpperCase()) {
            return e
        } else {
            e = e.parentElement
        }
    }

    return null
}

const closest = function(element, selector) {
    let c = selector[0]
    if (c === '.') {
        // class 选择器
        let className = selector.slice(1)
        return closestClass(element, className)
    } else if (c === '#') {
        // id 选择器
        let idName = selector.slice(1)
        return closestId(element, idName)
    } else {
        // 元素选择器
        let tagName = selector
        return closestTag(element, tagName)
    }
}
