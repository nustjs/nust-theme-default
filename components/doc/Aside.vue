<template>
  <affix :offset="offset">
    <div class="affix-sec is-expanded" v-if="toc">
      <button class="collapser" @click="collapse"></button>
      <h3 class="affix-title">{{ $t('text.toc') }}</h3>
      <doc-toc :cate="cate" :list="toc"></doc-toc>
    </div>
    <div class="affix-sec is-expanded qrcode">
      <button class="collapser" @click="collapse"></button>
      <h3 class="affix-title">{{ $t('text.weeklyrss') }}</h3>
      <div class="affix-ct">
        <img class="aotuwx-qrcode" src="//aotu.io/img/qrcode.jpg" :alt="$t('text.weeklyrss')" >
      </div>
    </div>
  </affix>
</template>

<script>
import Affix from '~components/common/Affix.vue'
import DocToc from '~components/doc/Outline.vue'
import Dom from '~components/utils/Dom.js'
import EventListener from '~components/utils/EventListener.js'
import Debounce from '~components/utils/Debounce.js'
export default {
  props: {
    outline: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      offset: 70
    }
  },
  computed: {
    cate () {
      return this.outline.cate
    },
    toc () {
      return this.outline.toc
    }
  },
  methods: {
    collapse (evt) {
      evt.target.parentNode.classList.toggle('is-expanded')
    },
    resizing () {
      let secs = document.querySelectorAll('.affix-sec')
      secs.forEach(sec => {
        if (Dom.hasOutsideWindow(sec)) {
          sec.classList.remove('is-expanded')
        }
      })
    }
  },
  components: {
    Affix,
    DocToc
  },
  mounted () {
    this.resizeEvent = EventListener.listen(window, 'resize', Debounce(this.resizing, 100))
    this.loadEvent = EventListener.listen(window, 'load', this.resizing)
  },
  beforeDestory () {
    if (this.resizeEvent) {
      this.resizeEvent.remove()
    }
    if (this.loadEvent) {
      this.loadEvent.remove()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/base/_base.styl';
</style>
