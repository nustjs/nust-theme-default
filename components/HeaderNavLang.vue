<template>
  <div class="lang">
    <div class="lang-current" @click="show = !show">
      <div class="flag " :class="flag"></div>
    </div>
    <ul class="lang-list" :class="{ 'lang-list--visible': show }">
      <li class="lang-item" v-for="lang in langs" v-if="lang.iso !== $store.state.i18n.curKey">
        <a class="flag " :class="lang.class" :href="lang.url + $route.path"></a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return { show: false }
  },
  computed: {
    flag () { return 'flag-' + this.$store.state.i18n.curKey },
    langs () {
      return [
        { iso: 'cn', class: 'flag-cn', url: `${this.$store.state.urlRoot}` },
        { iso: 'en', class: 'flag-en', url: `${this.$store.state.urlRoot}en/` }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/base/_vars.styl';
.lang
  width: 100%
  display: flex
  flex-direction: column;
  @media (min-width: 991px)
    &:hover
      .lang-list
        display: flex
  &-current
    height: 60px
    display: flex
    cursor: pointer
    align-items: center
    justify-content: center
    border-bottom: 1px solid $header-bd-color
    @media (min-width: 991px)
      padding: 0;
      height: 100%;
      border-bottom: none;
  &-list
    display: none
    flex-direction: column
    list-style: none
    margin: 0
    padding: 0
    @media (min-width: 991px)
      width: 82px
      position: absolute
      top: 100%
      left: -1px
      background-color: #fff
      border-top: 1px solid $header-bd-color
      border-left: 1px solid $header-bd-color
      border-right: 1px solid $header-bd-color
    &--visible
      display: flex
      @media (min-width: 991px)
        display: none
  &-item
    height: 60px
    display: flex
    align-items: center
    justify-content: center
    border-bottom: 1px solid $header-bd-color
</style>
