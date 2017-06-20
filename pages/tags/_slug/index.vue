<template>
  <div class="posts-wrap">
    <tag-nav :items="tags" :tag="tag"></tag-nav>
    <div class="posts clearfix" id="posts">
      <template v-for="item in items">
        <post-mini :post="item"></post-mini>
      </template>
    </div>
    <infinite-loader :size="total" :url="url"></infinite-loader>
  </div>
</template>

<script>
import axios from '~plugins/axios'
// common components
import PostMini from '~components/post/Mini.vue'
import InfiniteLoader from '~components/pager/InfiniteLoader.vue'
import TagNav from '~components/tags/TagNav.vue'

export default {

  validate ({params, store}) {
    // it will throw 404 if return false
    return store.utils.isAlphaNumDashUDCN(params.slug)
  },
  components: {
    PostMini,
    InfiniteLoader,
    TagNav
  },
  async asyncData ({store, params}) {
    let langKey = store.state.i18n.curKey
    // must encode, or it will throws 'socket hang up' error for chinese chars.
    let slug = encodeURI(params.slug)
    let pageNum = 1
    let res = await axios.get(`tag/posts/${langKey}/${slug}/${pageNum}`)
    return res.data
  },
  computed: {
    tag () {
      return {title: this.title, cnt: this.weight}
    },
    url () {
      return `fragments/tag/${this.slug}/`
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
