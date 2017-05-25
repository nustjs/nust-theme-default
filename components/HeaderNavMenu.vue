<template>
  <ul class="menu">
    <li class="menu-item" v-for="item in list">
      <a v-if="isExternal(item.path)" :href="item.path" class="menu-link" :target="item.target ? '_blank' : null">{{ item.name }}</a>
      <nuxt-link class="menu-link" :to="item.path" v-else>
        {{ item.name }}
      </nuxt-link>
    </li>
    <li class="menu-item">
      <nuxt-header-nav-menu-dropdown/>
    </li>
  </ul>
</nav>
</template>

<script>
import NuxtHeaderNavMenuDropdown from '~components/HeaderNavMenuDropdown.vue'

export default {
  components: {
    NuxtHeaderNavMenuDropdown
  },
  computed: {
    list () {
      return this.$store.getters['xdata/getData']('nav').items
    }
  },
  methods: {
    isExternal (url) {
      return url.indexOf('http') > -1
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/base/_base.styl';
.menu
  width: 100%
  margin: 0
  padding: 0
  display: flex
  flex-wrap: wrap
  list-style: none
  justify-content: space-between
  +desktop()
    flex: 1
    flex-wrap: nowrap
    padding-left: 15px
  &-item
    width: 100%
    display: flex
    border-bottom: 1px solid #dbdfe1
    +desktop()
      border-bottom: none
    &:last-child
      border-bottom: none
    .nuxt-link-active, .nuxt-link-active:hover
      color: $color-link
      font-weight: 400
  &-link
    height: 60px
    display: flex
    width: 100%
    align-items: center
    justify-content: center
    font-size: 16px
    text-decoration: none
    letter-spacing: 0.25px
    +desktop()
      height: 100%
</style>
