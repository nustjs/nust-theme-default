<template>
  <div class="toc" :class="{'toc-hidden': !visible}">
    <div class="toc-toggler" :class="{'toc-toggler-hidden': visible}" @click="toggle">
      <div class="icon more-vertical"></div>
    </div>
    <template v-for="group in list">
      <h3 class="toc-title">{{ group.title }}</h3>
      <ul class="toc-list">
        <li class="toc-item" v-for="link in group.links">
          <nuxt-link class="toc-link"
                     :class="{'toc-link-active': path ===  link.to}"
                     :to="link.to" exact>
            {{ link.name }}
          </nuxt-link>
          <ul v-if="path === link.to" class="toc-slist">
            <li v-for="(content, index) in link.toc" class="toc-sitem">
              <a :href="link.to + content.to"
                  @click.prevent="scrollTo(content.to)"
                  class="toc-slink"
                  :class="{'toc-slink-active': current === index}">
                {{ content.name }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true
    },
    cate: {
      type: String,
      required: true
    },
    urlPrefix: {
      type: String,
      default: '/docs/'
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
    return { current: 0, setInter: null }
  },
  computed: {
    visible () { return this.$store.state.visibleOutline },
    path () {
      let ret = this.$route.path.slice(-1) === '/' ? this.$route.path.slice(0, -1) : this.$route.path
      return ret.substr(ret.indexOf(this.urlPrefix) + this.urlPrefix.length - 1)
    },
    toc () {
      var c = []
      this.list.forEach((group) => {
        if (group.links && !c.length) {
          var l = group.links.find((link) => {
            return this.path === link.to
          })
          if (l && l.toc) {
            l.toc.forEach((content) => {
              var el = document.getElementById(content.to.slice(1))
              if (el) {
                c.push(el.offsetTop)
              }
            })
          }
        }
      })
      return c
    }
  },
  methods: {
    toggle () { this.$store.commit('toggle', 'visibleOutline') },
    scrolled () {
      var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      var doc = document.documentElement
      var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
      var el = this.toc.find((pos) => {
        return pos > top + (h / 2)
      })
      this.current = (el ? this.toc.indexOf(el) : this.toc.length) - 1
    },
    scrollTo (id) {
      this.toggle()
      this.$nextTick(() => {
        var el = document.getElementById(id.slice(1))
        if (!el) return
        var to = el.offsetTop - 25
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
