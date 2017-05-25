<template>
  <div class="wrap">
    <navbar></navbar>
    <div class="main" :class="{'App--hidden': visible}">
      <nuxt/>
    </div>
  </div>
</template>

<script>
import Navbar from '~components/Header.vue'

export default {
  watch: {
    $route: 'setStore'
  },
  computed: {
    visible () { return this.$store.state.visibleHeader }
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
      htmlAttrs: { lang: this.$store.state.i18n.curKey },
      link: [
        { rel: 'canonical', href: canonical },
        { rel: 'alternate', hreflang: 'en', href: `${this.$store.state.urlRoot}en/${this.$route.path.substr(1).replace('en/', '')}` },
        { rel: 'alternate', hreflang: 'cn', href: `${this.$store.state.urlRoot}${this.$route.path.substr(1).replace('cn/', '')}` }
      ]
    }
  },
  components: {
    Navbar
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
