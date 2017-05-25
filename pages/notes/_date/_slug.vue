<template>
  <post :post="item"></post>
</template>

<style lang="stylus" scoped>
</style>

<script>
import axios from '~plugins/axios'
import Post from '~components/Post.vue'
export default {
  data () {
    return {
      item: {}
    }
  },
  validate ({params, store}) {
    let date = params.date
    let slug = params.slug
    let isValid = store.utils.isDate(date) && slug
    // must be int
    return isValid
  },
  async asyncData ({params, store, app}) {
    let date = params.date
    let slug = params.slug
    let langKey = store.state.i18n.curKey
    let res = await axios.get(`post/find/${langKey}/${date}/${slug}`)
    return res.data
  },
  components: {
    Post
  }
}
</script>