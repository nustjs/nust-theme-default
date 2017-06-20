<template>
  <div class="main-tags fixed-header sticky-footer">
    <banner></banner>
    <section class="sticky-footer-main">
      <div class="grid grid-h">
        <div class="aside">
          <q-code></q-code>
          <cases></cases>
          <fav-link></fav-link>
        </div>
        <div class="col-size-flex">
          <nuxt-child/>
        </div>
      </div>
    </section>
    <app-footer/>
  </div>
</template>

<script>
// common components
import AppFooter from '~components/Footer.vue'
// private components
import Banner from '~components/home/Banner.vue'
import QCode from '~components/home/QRCode.vue'
import FavLink from '~components/home/FavLinks.vue'
import Cases from '~components/home/Cases.vue'

export default {
  components: {
    AppFooter,
    Banner,
    QCode,
    FavLink,
    Cases
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/base/_base.styl';
</style>
