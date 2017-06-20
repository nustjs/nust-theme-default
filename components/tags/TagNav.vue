<template>
<div class="tagnav">
  <div class="tagnav-hd">
    <button class="btn btn-primary btn-small btn-showtags" @click="toggleTags" v-if="collapsable">
      <span class="btn-inner">{{ $t('text.tag_all') }}</span>
    </button>
    <div class="tagnav-tip" v-html="$t('text.tag_post_tip', tag)" v-if="tag"></div>
    <div class="tagnav-tip" v-html="$t('text.tag_count_tip', {total})" v-if="!tag"></div>
  </div>
  <transition name="tags" enter-active-class="animated fadeInDown" leave-active-class="animated foldUp">
  <nav class="tags" v-if="visibleTags">
    <ul class="tag-menu">
      <li class="tag-menu-item" v-for="item in items">
        <nuxt-link class="tag-menu-link" :to="item.route" :exact="item.exact">
          <span class="tag-menu-txt">{{ item.title }}</span>
        </nuxt-link>
      </li>
    </ul>
  </nav>
  </transition>
</div>
</template>

<script>
export default {
  props: {
    tag: {
      type: Object,
      default: {}
    },
    items: {
      type: Array,
      default: []
    },
    collapsable: {
      type: Boolean,
      default: true
    }
  },
  components: {
  },
  data () {
    return {
      showTags: false
    }
  },
  computed: {
    total () {
      return this.items.length
    },
    visibleTags () {
      return !this.collapsable || this.showTags
    }
  },
  methods: {
    toggleTags () {
      this.showTags = !this.showTags
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/base/_base.styl';
.tags
  font-size: 16px
  padding: ($fgs-gutter - 5)
  background: #fff
  position: relative
  z-index: 1
  overflow: hidden
  border-top: 1px solid $color-border
  &::-webkit-scrollbar
      display: none

.tag-menu
  clearfix()
  position: relative
  display: flex
  flex-wrap: wrap
  align-items: baseline
  justify-content: space-between
  letter-spacing: 0.02em
  &::-webkit-scrollbar
    display: none
  &-item
    display: flex
    align-items: center
  &-link
    line-height: 1
    display: flex
    align-items: center
    padding: 15px
    border-radius: 2px
    font-size: 16px
    &.nuxt-link-active
      background: $color-grey-lite
      font-weight: 400
      color: $color-link
      cursor: default
      &:hover
        color: $color-link

.tagnav
  margin-left: $fgs-gutter
  margin-bottom: $fgs-gutter
  box-shadow: 0 1px 2px rgba(0,0,0,0.1)
  overflow: hidden
  &-hd
    background: #fff
    padding: 10px ($fgs-gutter - 5)
    font-weight: 400
    position: relative
    z-index: 2
  &-tip
    height: 36px
    line-height: 36px
    .label
      margin: 0 3px
.btn-showtags
  float: right
</style>
