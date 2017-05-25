<template>
  <header class="header">
    <div class="grid grid-h">
      <nuxt-link class="logo" to="/">
        <img src="/img/o2logo@2x.png" :alt="$t('homepage.meta.title')" srcset="/img/o2logo.png, /img/o2logo@2x.png 2x"/>
        <h1 class="logo-txt">{{ $t('homepage.meta.title') }}</h1>
      </nuxt-link>
      <div class="header-toggler">
        <div class="header-toggler-btn" @click="toggle">
          <div :class="{'icon menu': !visible, 'icon close': visible}"></div>
        </div>
      </div>
      <nuxt-header-nav/>
    </div>
  </header>

</template>

<script>
import NuxtHeaderNav from '~components/HeaderNav.vue'

export default {
  computed: {
    visible () { return this.$store.state.visibleHeader }
  },
  methods: {
    toggle () { this.$store.commit('toggle', 'visibleHeader') }
  },
  components: {
    NuxtHeaderNav
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/base/_base.styl';
.header
  position: fixed
  top: 0
  width: 100%
  height: $header-height-mobi
  z-index: 995
  padding: 0 15px
  background-color: rgba(255,255,255,.95)
  border-bottom: 1px solid $header-bd-color
  .grid-h
    display: flex
    flex-direction: row
  +desktop()
    height: $header-height
    padding: 0 30px
  &-toggler
    display: flex
    flex: 1
    align-items: center
    justify-content: flex-end
    +desktop()
      display: none
    &-btn
      display: flex
      width: 25px
      height: 20px
      cursor: pointer
.logo
  display: flex
  align-items: center
  +desktop()
    width: $header-logo-width
    border-right: 1px solid $header-bd-color
  &-txt
    margin: 0
    width: 0
    height: 0
    overflow: hidden
</style>
