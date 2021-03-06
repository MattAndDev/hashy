

export default class Hashy {
  constructor (options) {
    // ===========================================================================
    // Managing the options
    // ===========================================================================

    if (!options) {
      options = {}
    }

    this.itemClass = options.itemClass || '.hashy-item'
    this.itemAttr = options.itemAttr || 'data-hash'
    this.triggerClass = options.triggerClass || '.hashy-go'
    this.triggerAttr = options.triggerAttr || 'href'
    this.averageSpeed = options.averageSpeed || 50
    this.offset = options.offset || 0


    //  Raf runtime
    this.runtime = function () {}
    this.Hash = null
    this.Elems = [].slice.call(document.querySelectorAll(this.itemClass))
    this.TriggerElems = document.querySelectorAll(this.triggerClass)
    this.ScrollOffset = 0
    this.SelectedElem = null
    this.IsScrolling = null

    // checks if offset is class and set value
    this.GlobalOffset = this.checkOffset(this.offset)


    // Repeat the check after resize
    var resizeTimeout
    this.doneResize = () => {
      this.GlobalOffset = this.checkOffset(this.offset)
      this.ScrollOffset = document.documentElement.scrollTop || document.body.scrollTop
    }

    window.onresize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(this.doneResize, 100)
    }

    window.onpopstate = (event) => {
      cancelAnimationFrame(this.runtime)
      event.preventDefault()
      if (event.state != null) {
        this.go(event.state.hash, false)
      }
      else {
        let cleanHash = window.location.hash.replace('#', '')
        this.go(cleanHash, false)
      }
      return false
    }

    window.onhashchange = (event) => {
      event.preventDefault()
    }

    this.init()
  }


  init () {
    this.bind(this.TriggerElems)
    if (!this.history) {
      this.history = window.history
    }
    if (window.location.hash.length && window.location.hash !== 'undefined') {
      let cleanHash = window.location.hash.replace('#', '')
      if (window.history) {
        this.history = window.history
      }
      this.go(cleanHash, false)
    }
    else {
      this.scrollListener()
    }
  }
  // TODO: addoption for data title _> push state


  scrollListener = () => {
    this.ScrollOffset = window.pageYOffset || window.scrollTop
    if (this.ScrollOffset == null) {
      this.ScrollOffset = 0
    }

    var elemArray = this.Elems

    elemArray.forEach((elem) => {
      var elemOffset = elem.offsetTop + this.GlobalOffset
      var elemHeight = elem.offsetHeight || elem.clientHeight
      var height = window.innerHeight || document.documentElement.clientHeight
      if (this.ScrollOffset + height > elemOffset && this.ScrollOffset > elemOffset && this.ScrollOffset < elemOffset + elemHeight) {
        if (elem !== this.SelectedElem) {
          this.SelectedElem = elem
          this.setHash(this.SelectedElem.getAttribute(this.itemAttr), true)
        }
      }
    })

    this.runtime = requestAnimationFrame(this.scrollListener)
  }


  bind (elems) {
    for (var i = 0; i < elems.length; i++) {
      var elem = elems[i]
      var attr
      if (this.triggerAttr) {
        attr = this.triggerAttr
      }
      else {
        attr = href
      }
      elem.onclick = (e) => {
        e.preventDefault ? e.preventDefault() : (e.returnValue = false)
        cancelAnimationFrame(this.runtime)
        this.go(e.target.getAttribute(attr), true)
      }
    }
  }

  go (hash, saveToHistory) {
    let elem = document.querySelector('[' + this.itemAttr + '="' + hash + '"]')
    this.scrollTo(elem, hash, () => {
      this.setHash(hash, saveToHistory, () => {
        setTimeout(() => {
          this.scrollListener()
        }, 200)
      })
    })
  }


  setHash (hash, saveToHistory, callback) {
    if (this.history && saveToHistory && this.Hash !== hash || this.history && this.Hash == null) {
      console.log('pushing to history')
      this.history.pushState({hash: hash}, null, '#' + hash)
      this.Hash = hash
      if (callback) callback()
    }
    else if (window.location.hash !== '#' + hash && this.Hash !== hash && !this.history) {
      this.Hash = hash
      window.location.hash = hash
      if (callback) callback()
    }
    else {
      if (callback) callback()
    }
  }

  checkOffset (offset) {
    var calcOffset
    if (typeof offset === 'string') {
      calcOffset = this.getHeight(offset)
    }
    else {
      calcOffset = offset
    }
    calcOffset = calcOffset * -1
    return calcOffset
  }

  getHeight (className) {
    var element = document.querySelectorAll(className)[0]
    var height = window.getComputedStyle(element).height
    height = height.replace('px')
    height = parseInt(height)
    return height
  }

  scrollTo (elem, hash, callback) {
    cancelAnimationFrame(this.runtime)
    this.IsScrolling = true
    var elemPos
    if (elem.offsetTop < (this.GlobalOffset * -1)) {
      elemPos = elem.offsetTop + 1
    }
    else {
      elemPos = elem.offsetTop + 1 + this.GlobalOffset
    }
    var i = this.ScrollOffset
    var y = elemPos
    var diff, interval
    if (elemPos > this.ScrollOffset) {
      diff = y - i
    }
    else {
      diff = i - y
    }
    this.scroller = () => {
      if (i < y - diff / this.averageSpeed) {
        i = Math.round(i + diff / this.averageSpeed)
        document.body.scrollTop = i
        document.documentElement.scrollTop = i
        this.ScrollOffset = i
      }
      else if (i > y + diff / this.averageSpeed) {
        i = Math.round(i - diff / this.averageSpeed)
        document.body.scrollTop = i
        document.documentElement.scrollTop = i
        this.ScrollOffset = i
      }
      else {
        document.documentElement.scrollTop = elemPos
        document.body.scrollTop = elemPos
        this.ScrollOffset = elemPos
        this.SelectedElem = elem
        this.IsScrolling = false
        callback()
        cancelAnimationFrame(this.runtime)
        return false
      }
      this.runtime = requestAnimationFrame(this.scroller)
    }

    this.scroller()
  }

}
