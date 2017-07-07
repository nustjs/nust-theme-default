<template>
  <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading">
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
    },
    url: {
      type: String,
      default: 'notes/fragment/'
    }
  },
  data () {
    return {
      current: 1,
      timer: null
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
      const url = `${rootUrl}${this.url}${pageNum}`
      return url
    },
    async onInfinite () {
      clearTimeout(this.timer)
      if (this.current === this.size) {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
        this.$refs.infiniteLoading.$destroy()
        return
      }
      this.current++
      let url = this.apiUrl(this.current)
      let res = await axios.get(url)
      this.timer = setTimeout(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        document.querySelector('#posts').innerHTML += res.data
      }, 1000)
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
