<template>
  <div class="wrap">
    <navbar></navbar>
    <div class="main" :class="{'App--hidden': visible}">
      <nuxt/>
    </div>
    <backtop></backtop>
  </div>
</template>

<script>
import Navbar from '~components/Header.vue'
import Backtop from '~components/common/Backtop.vue'

export default {
  watch: {
    $route: 'setStore'
  },
  computed: {
    visible () { return this.$store.state.visibleHeader },
    langAttr () {
      let key = this.$store.state.i18n.curKey
      return key
    }
  },
  methods: {
    setStore () {
      if (this.$store.state.visibleHeader) this.$store.commit('toggle', 'visibleHeader')
      if (this.$store.state.visibleAffix) this.$store.commit('toggle', 'visibleAffix')
    }
  },
  head () {
    let canonical = `${this.$store.state.urlRoot}${this.$route.path.substr(1)}`
    return {
      htmlAttrs: { lang: this.langAttr },
      link: [
        { rel: 'canonical', href: canonical },
        { rel: 'alternate', hreflang: 'en', href: `${this.$store.state.urlRoot}en/${this.$route.path.substr(1).replace('en/', '')}` },
        { rel: 'alternate', hreflang: 'cn', href: `${this.$store.state.urlRoot}${this.$route.path.substr(1).replace('cn/', '')}` }
      ]
    }
  },
  components: {
    Navbar,
    Backtop
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/base/_base.styl';
.App
  &--hidden
    display: none
    +desktop()
      display: block
</style>
