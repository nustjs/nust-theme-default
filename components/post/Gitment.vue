<template>
  <div class="comments" id="comments"></div>
</template>

<script>
import Gitment from 'gitment'
import configs from '../../configs/nust.js'
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    id () {
      return this.post.route
    },
    title () {
      return this.post.title
    }
  },
  mounted () {
    this.$nextTick(() => {
      let opts = configs.gitment
      opts.id = this.id
      opts.title = this.title
      console.log(opts)
      var gitment = new Gitment(opts)
      gitment.render('comments')
    })
  },
  methods: {}
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/base/_base.styl';
</style>
