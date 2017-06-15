<template>
  <div class="search" id="search">
    <input class="search-ipt" type="text" name="search" id="searcher" :placeholder="$t('text.search')" @keyup="doSearch"/>
    <transition enter-active-class="animated fadeInDown">
    <div class="search-rs" id="searchResult" v-if="total > 0 && !hide">
      <ul class="search-ls">
        <li v-for="obj in items">
          <a :href="obj.item.route" class="search-lnk" :class="{'search-lnk_a': obj.item.cover}">
            <div class="search-lnk-cover" v-if="obj.item.cover">
              <img :src="obj.item.cover" :alt="obj.item.title"/>
            </div>
            <div class="search-lnk-bd">
              <div class="search-lnk-title" v-html="title(obj.item)"></div>
              <div class="search-lnk-meta">
                <span class="search-lnk-author" v-if="obj.item.author && obj.item.author.github_name" v-html="author(obj.item)"></span>
                <span class="search-lnk-other">
                   {{ $t('text.postedIn') }} <span class="search-lnk-time">{{ obj.item.time }}</span>
                </span>
              </div>
            </div>
          </a>
        </li>
      </ul>
      <div class="search-btn-next" :title="$t('text.next_batch')" @click.stop="paginate" v-if="total > 1">
        <i class="iconfont icon-tihuan"></i>
      </div>
      <div class="search-pager" v-if="total > 1">
        <span v-for="n in total" class="search-pager-dot" :class="{'search-pager-dot_a': n === page}"></span>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
import Fuse from 'fuse.js'
import axios from 'axios'
import EventListener from '../utils/EventListener'
import Dom from '../utils/Dom'

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
    EventListener.listen(document.body, 'click', this.onPageClick)
  },
  data () {
    return {
      timer: null,
      page: 1,
      pageSize: 5,
      rawItems: [],
      hide: false,
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
      let items = this.matchedItems.slice((this.page - 1) * this.pageSize, this.page * this.pageSize)
      return items
    }
  },
  methods: {
    doSearch (evt) {
      clearTimeout(this.timer)
      this.page = 1
      this.matchedItems = []
      this.hide = false
      this.timer = setTimeout(() => {
        this.matchedItems = this.highlight(fuse.search(ipt.value))
        // console.log(this.matchedItems) // eslint-disable-line
      }, 200)
    },
    paginate (evt) {
      if (this.page === this.total) {
        this.page = 1
      } else {
        this.page ++
      }
    },
    onPageClick (evt) {
      this.hide = !Dom.getParentWithID(evt.target, 'search')
    },
    highlight (items) {
      let keys = ['title', 'author.github_name']
      items.forEach(o => {
        delete o.item.title1
        if (o.item.author) {
          delete o.item.author.github_name1
        }
        o.matches.forEach(o1 => {
          // we only highlight title and github_name
          if (keys.indexOf(o1.key) === -1) return
          let parts = []
          if (o1.key === 'title') {
            parts = Array.from(o.item.title)
          } else if (o1.key === 'author.github_name') {
            parts = Array.from(o.item.author.github_name)
          }
          o1.indices.forEach(o2 => {
            for (let i = o2[0]; i <= o2[1]; i++) {
              parts[i] = `<span class="search-hl">${parts[i]}</span>`
            }
          })
          if (o1.key === 'title') {
            o.item.title1 = parts.join('')
          } else if (o1.key === 'author.github_name') {
            o.item.author.github_name1 = parts.join('')
          }
        })
      })
      return items
    },
    title (item) {
      return item.title1 || item.title
    },
    author (item) {
      return item.author.github_name1 || item.author.github_name
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
  &-btn-next
    position: absolute
    top: 2px
    right: 0
    width: 32px
    height: 32px
    text-align: center
    line-height: 32px
    cursor: pointer
    .iconfont
      font-size: 24px
    &:hover
      color: $color-accent
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
      padding: 0 $fgs-gutter
      border-left: 1px solid $header-bd-color
      border-right: 1px solid $header-bd-color
      &:focus, &:visited, &:active
        border-left: 1px solid $header-bd-color
        border-right: 1px solid $header-bd-color
  &-rs
    position: relative
    background: #fff
    font-size: 15px
    border: 1px solid $header-bd-color
  &-lnk
    clearfix()
    display: flex
    align-items: flex-start
    transition: all .2s ease
    padding: 7px 15px
    +desktop()
      padding: 7px $fgs-gutter
    &:hover
      color: $color-link
      background: $header-bd-color
    &-cover
      width: 80px
      height: 80px
      overflow: hidden
      margin-right: 10px
    &-bd
      flex: 1
    &-title
      font-weight: 400
      line-height: 1.5
      max-height: 45px
      overflow: hidden
    &-meta
      font-size: 14px
      margin-top: 5px
    img
      height: 80px
      width: auto
      max-width: none
  li
    &:last-child
      .search-lnk
        padding-bottom: 15px
    &:first-child
      .search-lnk
        padding-top: 15px
  &-pager
    height: 2px
    position: absolute
    left: 0
    top: 0
    width: 100%
    display: flex
    &-dot
      display: block
      flex: 1
      height: 2px
      margin: 0 1px
      background: rgba(0,0,0,.2)
      &_a
        background: $color-accent
</style>
