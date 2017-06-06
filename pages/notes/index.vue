<template>
  <post-list :items="items" :total="total"></post-list>
</template>

<style lang="stylus" scoped>
</style>

<script>
import axios from '~plugins/axios'
import PostList from '~components/post/List.vue'
export default {
  async asyncData ({store}) {
    let langKey = store.state.i18n.curKey
    let pageNum = 1
    let res = await axios.get(`post/${langKey}/${pageNum}`)
    return res.data
  },
  components: {
    PostList
  }
}
</script>
