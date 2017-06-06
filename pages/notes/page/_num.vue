<template>
  <post-list :items="items"></post-list>
</template>

<style lang="stylus" scoped>
</style>

<script>
import axios from '~plugins/axios'
import PostList from '~components/post/List.vue'
export default {
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
    PostList
  }
}
</script>
