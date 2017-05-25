const Dom = {
  getOuterHeight (el) {
    // Get the DOM Node if you pass in a string
    el = (typeof el === 'string') ? document.querySelector(el) : el
    let styles = window.getComputedStyle(el)
    let margin = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom'])

    return Math.ceil(el.offsetHeight + margin)
  }
}

export default Dom
