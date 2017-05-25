<template>
  <div class="dropdown">
    <div class="dropdown-title" @click="show = !show" :class="{'dropdown-title--mobile': show}">
      {{ more }}
    </div>
    <ul class="dropdown-list" :class="{ 'dropdown-list--visible': show }">
      <li class="dropdown-item" v-for="item in list">
        <a class="dropdown-link" :href="item.path" :target="item.target || '_self'">
          {{ item.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  },
  computed: {
    more () {
      let navData = this.$store.getters['xdata/getData']('nav')
      return navData.more.name
    },
    list () {
      let navData = this.$store.getters['xdata/getData']('nav')
      return navData.more.items
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/base/_vars.styl';
.dropdown
  width: 100%
  display: flex
  flex-direction: column
  position: relative
  @media (min-width: 991px)
    &:hover
      .dropdown-list
        display: block
  &-title
    height: 60px
    width: 100%
    display: flex
    cursor: pointer
    justify-content: center
    align-items: center
    color: #35495e
    font-size: 16px
    text-decoration: none
    letter-spacing: 0.25px
    @media (min-width: 991px)
      height: 100%
      padding-right: 15px
    &:after
      content: " "
      width: 0
      height: 0
      top: 2px
      right: -10px
      position: relative
      border-right: 6px solid transparent
      border-top: 6px solid #35495e
      border-left: 6px solid transparent
      @media (min-width: 991px)
        top: 33px
        right: 0
        position: absolute
    &:hover, &:focus
      color: #41b883
      &:after
        border-top: 6px solid #41b883
    &--mobile
      color: #41b883
      &:after
        border-top: 6px solid #41b883
      @media (min-width: 991px)
        color: #35495e
        &:after
          border-top: 6px solid #35495e
  &-list
    width: 100%
    display: none
    flex-wrap: wrap
    position: relative
    padding: 0
    margin: 0
    list-style: none
    @media (min-width: 991px)
      min-width: 100%
      position: absolute
      background-color: #fff
      border: 1px solid $header-bd-color
      border-top: none
      top: 100%
      right: 0
      &::before
        display: block
        position: absolute
        content: ""
        width: 14px
        height: 14px
        background: #fff
        z-index: 2
        top: -7px
        border-top: 1px solid #d9d9d9
        border-right: 1px solid #d9d9d9
        -webkit-transform: rotate(-45deg)
        transform: rotate(-45deg)
        border-radius: 2px
        left: 45%
    &--visible
      display: flex
      @media (min-width: 991px)
        display: none
  &-item
    width: 100%
    display: flex
    height: 50px
    border-top: 1px solid $header-bd-color
  &-link
    width: 100%
    display: flex
    color: #35495e
    padding: 12px 0
    font-size: 15px
    text-decoration: none
    letter-spacing: 0.25px
    align-items: center
    justify-content: center
    &:hover
      color: #41b883
</style>
