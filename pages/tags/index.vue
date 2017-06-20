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
          <tag-nav :items="items" :tag="null" :collapsable="false"></tag-nav>
        </div>
      </div>
    </section>
    <app-footer/>
  </div>
</template>

<script>
import axios from '~plugins/axios'
// common components
import AppFooter from '~components/Footer.vue'
// private components
import Banner from '~components/home/Banner.vue'
import TagNav from '~components/tags/TagNav.vue'
import QCode from '~components/home/QRCode.vue'
import FavLink from '~components/home/FavLinks.vue'
import Cases from '~components/home/Cases.vue'

export default {
  components: {
    AppFooter,
    Banner,
    TagNav,
    QCode,
    FavLink,
    Cases
  },
  async asyncData ({store, params}) {
    let langKey = store.state.i18n.curKey
    let res = await axios.get(`tag/list/${langKey}`)
    return res.data
  },
  computed: {
  },
  head () {
    return {
      title: `${this.$t('homepage.meta.title')} | ${this.$t('text.tag_all')}`,
      meta: [
        { name: 'description', hid: 'description', content: this.$t('homepage.meta.description') },
        // Open Grapg
        { name: 'og:title', content: this.$t('homepage.meta.title') },
        { name: 'og:description', content: this.$t('homepage.meta.description') },
        { name: 'og:type', content: 'website' },
        { name: 'og:url', content: 'https://nustjs.com' },
        { name: 'og:image', content: 'https://i.imgur.com/PzEm5j2.png' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', content: '@o2circle' },
        { name: 'twitter:title', content: this.$t('homepage.meta.title') },
        { name: 'twitter:description', content: this.$t('homepage.meta.description') },
        { name: 'twitter:image', content: 'https://i.imgur.com/PzEm5j2.png' },
        { name: 'twitter:image:alt', content: 'Nust Logo' }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/base/_base.styl';
</style>
