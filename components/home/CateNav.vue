<template>
<nav class="cates">
  <ul class="cate-menu">
    <li class="cate-menu-item" v-for="item in list">
      <nuxt-link class="cate-menu-link" :to="item.url">
        <i class="iconfont" :class="item.icon"></i>
        <span class="cate-menu-txt">{{ item.title }}</span>
      </nuxt-link>
    </li>
  </ul>
</nav>
</template>

<script>
export default {
  components: {
  },
  computed: {
    list () {
      return this.$store.getters['xdata/getData']('cates')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/base/_base.styl';
.cates
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

.cate-menu
  clearfix()
  position: relative
  &::-webkit-scrollbar
    display: none
  &-item
    display inline-block
    +tablet()
      display block
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
