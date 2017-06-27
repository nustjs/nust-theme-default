<template>
  <div class="toc" :class="{'toc-hidden': !visible}">
    <div class="toc-toggler" :class="{'toc-toggler-hidden': visible}" @click="toggle">
      <div class="icon more-vertical"></div>
    </div>
    <ul class="toc-list">
      <li v-for="(content, index) in finalToc" class="toc-list-item">
        <a :href="path + content.to"
            @click.prevent="scrollTo(content.to)"
            class="toc-list-link"
            :class="{'toc-list-link-active': current === index}">
          {{ content.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    toc: {
      type: Array,
      required: true
    }
  },
  mounted () {
    let self = this
    this.$nextTick(function () {
      window.addEventListener('scroll', self.scrolled)
      if (self.$route.hash.length) {
        self.scrollTo(self.$route.hash)
      }
    })
  },
  data () {
    return {
      headerHeight: 70,
      bodyMarginTop: 25,
      current: -1,
      setInter: null
    }
  },
  computed: {
    visible () { return this.$store.state.visibleTOC },
    path () { return this.$route.path.slice(-1) === '/' ? this.$route.path.slice(0, -1) : this.$route.path },
    contents () {
      var c = []
      this.finalToc.forEach((l) => {
        var el = document.getElementById(l.to.slice(1))
        if (el) {
          c.push(el.offsetTop)
        }
      })
      // git comments
      return c
    },
    bodyOffsetTop () {
      return (this.headerHeight + this.bodyMarginTop)
    },
    finalToc () {
      let toc = this.toc.slice()
      // gitment
      toc.push({
        name: this.$t('text.comment'),
        to: '#comments'
      })
      return toc
    }
  },
  methods: {
    toggle () { this.$store.commit('toggle', 'visibleTOC') },
    scrolled () {
      // var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      var doc = document.documentElement
      var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
      var el = this.contents.find((pos) => {
        return pos > top + this.bodyOffsetTop
      })
      this.current = (el ? this.contents.indexOf(el) : this.contents.length) - 1
    },
    scrollTo (id) {
      this.toggle()
      this.$nextTick(() => {
        var el = document.getElementById(id.slice(1))
        if (!el) return
        var to = el.offsetTop - this.bodyOffsetTop
        var doc = document.documentElement
        var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
        var diff = (to > top ? to - top : top - to) / 25
        var i = 0
        window.clearInterval(this.setInter)
        this.setInter = window.setInterval(() => {
          top = (to > top) ? top + diff : top - diff
          window.scrollTo(0, top)
          i++
          if (i === 25) {
            window.clearInterval(this.setInter)
          }
        }, 10)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/base/_base.styl';
</style>
