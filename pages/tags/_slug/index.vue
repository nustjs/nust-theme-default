<template>
  <div class="page-tags fixed-header sticky-footer">
    <banner></banner>
    <section class="sticky-footer-main">
      <div class="grid grid-h">
        <div class="aside">
          <tag-nav></tag-nav>
          <q-code></q-code>
          <cases></cases>
          <!-- 标签选择面板 -->
          <fav-link></fav-link>
        </div>
        <div class="col-size-flex">
          <div class="posts clearfix" id="posts">
            <template v-for="item in items">
              <post-mini :post="item"></post-mini>
            </template>
          </div>
          <infinite-loader :size="total"></infinite-loader>
          <!--<pager :currentPage="page" :lastPage="total"></pager>-->
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
import PostMini from '~components/post/Mini.vue'
import InfiniteLoader from '~components/pager/InfiniteLoader.vue'
// import Pager from '~components/pager/Pager.vue'
// private components
import Banner from '~components/home/Banner.vue'
import CateNav from '~components/home/CateNav.vue'
import QCode from '~components/home/QRCode.vue'
import FavLink from '~components/home/FavLinks.vue'
import Cases from '~components/home/Cases.vue'

export default {
  validate ({params, store}) {
    return store.utils.isAlphaNumDash(params.slug)
  },
  components: {
    AppFooter,
    Banner,
    CateNav,
    PostMini,
    InfiniteLoader,
    // Pager,
    QCode,
    FavLink,
    Cases
  },
  async asyncData ({store, params}) {
    let langKey = store.state.i18n.curKey
    let slug = params.slug
    let pageNum = 1
    let res = await axios.get(`tag/posts/${langKey}/${slug}/${pageNum}`)
    return res.data
  },
  head () {
    return {
      title: `${this.$t('homepage.meta.title')} | ${this.title}`,
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
