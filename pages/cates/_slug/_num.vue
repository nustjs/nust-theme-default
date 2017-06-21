<template>
  <div class="posts-wrap">
    <div class="posts clearfix" id="posts">
      <template v-for="item in items">
        <post-mini :post="item"></post-mini>
      </template>
    </div>
    <pager :currentPage="page" :lastPage="total" :urlRoot="pagerUrl"></pager>
  </div>
</template>

<script>
import axios from '~plugins/axios'
// common components
import PostMini from '~components/post/Mini.vue'
import Pager from '~components/pager/Pager.vue'

export default {
  validate ({params, store}) {
    return store.utils.isAlphaNumDash(params.slug) && /^\d+$/.test(params.num)
  },
  components: {
    PostMini,
    Pager
  },
  async asyncData ({store, params}) {
    let langKey = store.state.i18n.curKey
    let slug = params.slug
    let pageNum = params.num
    let res = await axios.get(`cate/posts/${langKey}/${slug}/${pageNum}`)
    return res.data
  },
  computed: {
    pagerUrl () {
      return `/cates/${this.slug}`
    }
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
