<template>
  <div class="backtop" id="backTop" v-show="visible" @click="scrollToTopEaseInOut(500)">
    <i class="iconfont icon-c"></i>
  </div>
</template>

<script>
import EventListener from '~components/utils/EventListener.js'
import Debounce from '~components/utils/Debounce.js'
export default {
  props: {
    offset: {
      type: Number,
      default: 100
    }
  },
  data () {
    return {
      visible: false,
      timer: null
    }
  },
  computed: {
  },
  methods: {
    scrolling () {
      const scrollTop = this.getScroll(window, true)
      if (scrollTop > this.offset) {
        this.visible = true
      } else {
        this.visible = false
      }
    },
    getScroll (w, top) {
      let ret = w[`page${top ? 'Y' : 'X'}Offset`]
      const method = `scroll${top ? 'Top' : 'Left'}`
      if (typeof ret !== 'number') {
        const d = w.document
        ret = d.documentElement[method]
        if (typeof ret !== 'number') {
          ret = d.body[method]
        }
      }
      return ret
    },
    scrollToTop (scrollDuration, evt) {
      clearInterval(this.timer)
      let scrollStep = -window.scrollY / (scrollDuration / 15)
      this.timer = setInterval(() => {
        if (window.scrollY !== 0) {
          window.scrollBy(0, scrollStep)
        } else {
          clearInterval(this.timer)
        }
      }, 15)
    },
    scrollToTopEaseInOut (scrollDuration, evt) {
      let cosParameter = window.scrollY / 2
      let scrollCount = 0
      let oldTimestamp = performance.now()
      function step (newTimestamp) {
        scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp))
        if (scrollCount >= Math.PI) window.scrollTo(0, 0)
        if (window.scrollY === 0) return
        window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)))
        oldTimestamp = newTimestamp
        window.requestAnimationFrame(step)
      }
      window.requestAnimationFrame(step)
      // https://stackoverflow.com/questions/21474678/scrolltop-animation-without-jquery
      /*
        Explanations:
        - pi is the length/end point of the cosinus intervall (see above)
        - newTimestamp indicates the current time when callbacks queued by requestAnimationFrame begin to fire.
          (for more information see https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
        - newTimestamp - oldTimestamp equals the duration

          a * cos (bx + c) + d                      | c translates along the x axis = 0
        = a * cos (bx) + d                          | d translates along the y axis = 1 -> only positive y values
        = a * cos (bx) + 1                          | a stretches along the y axis = cosParameter = window.scrollY / 2
        = cosParameter + cosParameter * (cos bx)    | b stretches along the x axis = scrollCount = Math.PI / (scrollDuration / (newTimestamp - oldTimestamp))
        = cosParameter + cosParameter * (cos scrollCount * x)
      */
    }
  },
  components: {
  },
  mounted () {
    this.scrollEvent = EventListener.listen(window, 'scroll', Debounce(this.scrolling, 100))
  },
  beforeDestory () {
    if (this.scrollEvent) {
      this.scrollEvent.remove()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/base/_base.styl';
.backtop
  position: fixed
  bottom: 20px
  right: 15px
  z-index: 999
  width: 38px
  height: 38px
  background: rgba(0, 0, 0, .7)
  color: #fff
  text-align: center
  line-height: 38px
  cursor: pointer
  &:hover
    color: $color-theme
  .iconfont
    font-size: 18px
</style>
