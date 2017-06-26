<template>
  <affix :offset="offset">
    <div class="affix-sec is-expanded" v-if="toc">
      <button class="collapser" @click="collapse"></button>
      <h3 class="affix-title">{{ $t('text.toc') }}</h3>
      <post-toc :toc="toc"></post-toc>
    </div>
    <div class="affix-sec is-expanded" v-if="tags.length > 0">
      <button class="collapser" @click="collapse"></button>
      <h3 class="affix-title">{{ $t('text.postTags') }}</h3>
      <div class="affix-ct">
        <ul class="post-tags">
          <li v-for="item in tags" class="post-tag" :key="item.route">
            <a :href="item.route" :title="item.title" class="post-tag-link" :class="'post-tag-w' + item.weight"># {{ item.title }}</a>
          </li>
        </ul>
      </div>
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
import Affix from '~components/affix/Affix.vue'
import PostToc from '~components/post/TOC.vue'
import Dom from '~components/utils/Dom.js'
import EventListener from '~components/utils/EventListener.js'
import Debounce from '~components/utils/Debounce.js'
export default {
  props: {
    post: {
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
    tags () {
      return this.post.tags
    },
    toc () {
      return this.post.tocData
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
    PostToc
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
.post-tags
  display: flex
  flex-wrap: wrap
  align-items: baseline
  justify-content: space-between
  text-transform: uppercase
  letter-spacing: 0.02em
.post-tag
  display: flex
  align-items: center
  &-link
    transition: all .3s ease
    padding: 4px 0
    margin-bottom: 10px
</style>
