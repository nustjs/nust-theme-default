const Dom = {
  getOuterHeight (el) {
    // Get the DOM Node if you pass in a string
    el = (typeof el === 'string') ? document.querySelector(el) : el
    let styles = window.getComputedStyle(el)
    let margin = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom'])

    return Math.ceil(el.offsetHeight + margin)
  },
  getParents (el) {
    let els = []
    while (el) {
      els.unshift(el)
      el = el.parentNode
    }
    return els
  },
  getParentWithID (el, ...ids) {
    let els = Dom.getParents(el)
    el = els.find(o => {
      return ids.indexOf(o.id) > -1
    })
    return el
  }
}

export default Dom
