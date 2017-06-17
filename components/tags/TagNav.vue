<template>
<div class="tagnav">
  <div class="tagnav-hd">
    <button class="btn btn-primary">
      <span>显示其他标签</span>
    </button>
    <div class="tagnav-tip" v-html="$t('text.tag_post_tip', tag)"></div>
  </div>
  <nav class="tags">
    <ul class="tag-menu">
      <li class="tag-menu-item" v-for="item in items">
        <nuxt-link class="tag-menu-link" :to="item.route" :exact="item.exact">
          <span class="tag-menu-txt"># {{ item.title }}</span><span class="tag-menu-lbl">{{ item.weight }}</span>
        </nuxt-link>
      </li>
    </ul>
  </nav>
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
    }
  },
  components: {
  },
  computed: {
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/base/_base.styl';
.tags
  font-size: 16px
  margin-bottom $fgs-section-mb
  margin-left ($fgs-gutter - 5)
  margin-right ($fgs-gutter - 5)
  box-shadow: 0 1px 2px rgba(0,0,0,0.1)
  &::-webkit-scrollbar
      display: none
  +tablet()
    margin-left 0
    margin-right 0
    box-shadow: none
    height 92px
    overflow hidden

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
  &-txt
    margin-left: 15px

</style>
