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
      var gitment = new Gitment(opts)
      gitment.render('comments')
    })
  },
  methods: {}
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/base/_base.styl';
.comments
  border-top: 1px solid lighten($color-border, 10%)
  margin-top: $fgs-section-mb
</style>
