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
  validate ({params}) {
    // must be int
    return /^\d+$/.test(params.num)
  },
  async asyncData ({store, params}) {
    let langKey = store.state.i18n.curKey
    let pageNum = params.num
    let res = await axios.get(`post/list/${langKey}/${pageNum}`)
    return res.data
  },
  components: {
    PostMini
  }
}
</script>
