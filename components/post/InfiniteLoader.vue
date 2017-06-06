<template>
  <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading" v-if="hasNext">
    <span slot="no-more">{{ $t('text.noMorePage') }}</span>
  </infinite-loading>
</template>

<script>
// https://github.com/PeachScript/vue-infinite-loading/issues/18
import InfiniteLoading from 'vue-infinite-loading/src/components/Infiniteloading.vue'
import axios from '~plugins/axios'
export default {
  props: {
    size: {
      type: Number,
      required: true,
      default: 1
    }
  },
  data () {
    return {
      current: 1,
      pages: {}
    }
  },
  computed: {
    hasNext () {
      return (this.size > 1)
    }
  },
  methods: {
    apiUrl (pageNum) {
      const rootUrl = this.$store.state.urlRoot
      const url = `${rootUrl}notes/page/${pageNum}`
      return url
    },
    async onInfinite () {
      if (this.current === this.size) {
        this.$refs.infiniteLoading.$destroy()
        return
      }
      this.current ++
      let url = this.apiUrl(this.current)
      let res = await axios.get(url)
      console.log(res.data) // eslint-disable-line
    }
  },
  components: {
    InfiniteLoading
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/base/_base.styl';
</style>
