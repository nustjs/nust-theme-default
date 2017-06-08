<template>
  <el-pagination
    small
    layout="prev, pager, next"
    :page-count="size"
    :current-page="current"
    @current-change="onPageChange"
    v-if="hasNext">
  </el-pagination>
</template>

<script>
export default {
  props: {
    current: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      required: true,
      default: 1
    }
  },
  computed: {
    hasNext () {
      return (this.size > 1)
    }
  },
  methods: {
    getUrl (pageNum) {
      const rootUrl = this.$store.state.urlRoot
      const url = `${rootUrl}notes/page/${pageNum}`
      return url
    },
    onPageChange (val) {
      val = this.getUrl(val)
      console.log(val) // eslint-disable-line
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/base/_base.styl';
</style>
