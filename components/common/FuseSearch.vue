<template>
  <div class="search">
    <input class="search-ipt" type="text" name="search" id="searcher" :placeholder="$t('text.search')"/>
    <div class="search-rs" id="searchResult">
      <ul class="search-ls">
        <li v-for="item in items">
          {{ item.item.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Fuse from 'fuse.js'
import axios from 'axios'
import EventListener from '../utils/EventListener'

let fuse, ipt

export default {
  async mounted () {
    let res = await axios.get(`${this.$store.state.urlRoot}data/fuse.json`)
    this.rawItems = res.data
    fuse = new Fuse(this.rawItems, {
      includeMatches: true,
      threshold: 0.3,
      keys: ['title', 'desc', 'author.github_name', 'tags']
    })
    ipt = document.querySelector('#searcher')
    EventListener.listen(ipt, 'keyup', this.doSearch)
  },
  data () {
    return {
      timer: null,
      page: 1,
      pageSize: 10,
      rawItems: [],
      matchedItems: []
    }
  },
  computed: {
    total () {
      let cnt = this.matchedItems.length
      if (cnt === 0) return 0
      let total = Math.floor(cnt / this.pageSize) + (cnt % this.pageSize > 0 ? 1 : 0)
      return total
    },
    items () {
      if (this.total === 0) return []
      return this.matchedItems.slice((this.page - 1) * this.pageSize, this.pageSize)
    }
  },
  methods: {
    doSearch () {
      clearTimeout(this.timer)
      this.page = 1
      this.matchedItems = []
      this.timer = setTimeout(() => {
        this.matchedItems = fuse.search(ipt.value)
        console.log(this.matchedItems) // eslint-disable-line
      }, 200)
    },
    paginage (page) {
      this.page = page
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/base/_base.styl';
.search
  width: 100%
  height: 100%
  position: relative
  &-ipt
    width: 100%
    display: block
    border: none
    font-weight: 400
    height: 100%
    font-size: 16px
    padding: 0 15px
    letter-spacing: 0.5px
    &::-webkit-input-placeholde
      color #666
    +desktop()
      padding: 0 30px
      border-left: 1px solid $header-bd-color
      border-right: 1px solid $header-bd-color
      &:focus, &:visited, &:active
        border-left: 1px solid $header-bd-color
        border-right: 1px solid $header-bd-color
</style>
