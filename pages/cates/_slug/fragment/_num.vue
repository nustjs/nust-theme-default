<template>
  <div class="nust-fragment">
    <template v-for="item in items">
      <post-mini :post="item"></post-mini>
    </template>
  </div>
</template>

<style lang="stylus" scoped>
</style>

<script>
import axios from '~plugins/axios'
import PostMini from '~components/post/Mini.vue'
export default {
  layout: 'fragment',
  validate ({params, store}) {
    return store.utils.isAlphaNumDash(params.slug) && /^\d+$/.test(params.num)
  },
  async asyncData ({store, params}) {
    let langKey = store.state.i18n.curKey
    let pageNum = params.num
    let slug = params.slug
    let res = await axios.get(`cate/posts/${langKey}/${slug}/${pageNum}`)
    return res.data
  },
  components: {
    PostMini
  }
}
</script>
