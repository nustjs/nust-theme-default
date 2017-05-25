<template>
  <nav class="nav" :class="{'nav--hidden': !visible}">
    <div class="nav-search">
      <nuxt-header-nav-search/>
    </div>
    <div class="nav-menu">
      <nuxt-header-nav-menu/>
    </div>
    <div class="nav-lang">
      <nuxt-header-nav-lang/>
    </div>
  </nav>
</template>

<script>
import NuxtHeaderNavSearch from '~components/HeaderNavSearch.vue'
import NuxtHeaderNavMenu from '~components/HeaderNavMenu.vue'
import NuxtHeaderNavLang from '~components/HeaderNavLang.vue'

export default {
  computed: {
    visible () { return this.$store.state.visibleHeader }
  },
  components: {
    NuxtHeaderNavSearch,
    NuxtHeaderNavMenu,
    NuxtHeaderNavLang
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/base/_base.styl';
.nav
  display: block
  position: fixed
  z-index: 995
  top: 60px
  left: 0
  right: 0
  bottom: 0
  overflow-y: auto
  background-color: #fff
  +desktop()
    display: flex
    flex: 1
    top: 0
    flex-wrap: nowrap
    overflow-y: visible
    position: relative
  &--hidden
    display: none
    +desktop()
      display: flex
  &-search
    width: 100%
    height: 60px
    display: flex
    flex: 3
    border-bottom: 1px solid $header-bd-color
    +desktop()
      order: 1
      height: inherit
      border-bottom: none
  &-lang
    width: 100%
    display: flex
    +desktop()
      width: 80px
      padding: 0 15px
  &-menu
    width: 100%
    display: flex
    flex: 4
    border-bottom: 1px solid $header-bd-color
    +desktop()
      order: 2
      border-bottom: none
</style>
