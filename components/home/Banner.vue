<template>

<div class="banner">
    <transition appear appear-to-class="animated fadeInDown">
    <div class="banner-inner">
        <div class="banner-ball banner-ball-2"></div>
        <div class="banner-pic">
            <img src="/img/banner.png" :alt="$t('homepage.meta.title')"/>
        </div>
    </div>
    </transition>
</div>

</template>

<style lang="stylus" scoped>
@import '~assets/css/base/_base.styl';
.banner
  position:relative
  &-inner 
    z-index: 3
    position: relative
    background-color: $bg-primary
    overflow: hidden
    &:after
      content: " "
      position: absolute
      z-index: 1
      top:0
      left: 0
      right: 0
      bottom: 0
      background: url("/img/ball_1408.png") no-repeat
      background-size: cover
      background-position: center 80%
      opacity: 0.02
  &-ball 
    z-index: 2
    position: absolute
    &-1 
      height: 195px
      width: 195px
      background: url("/img/ball_195.png") center center no-repeat
      background-size: cover
      top: 50%
      margin-top: -95px
      left: - 95px
      +mobile()
        height: 130px
        width: 130px
        margin-top: -65px
        left: -65px

    &-2 
      width: 100px
      height: 100px
      background: url("/img/ball_1408.png") center center no-repeat
      background-size: cover
      top: -50px
      right: 0
      opacity: .8
  &-pic
    position: relative
    z-index: 5
    display: flex
    align-items: center
    justify-content: center
    height: 250px
    img 
      max-width: 100%
    +mobile()
      height: 200px

</style>

<script>
export default {
  data () {
    return {
      hide: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.hide = true
      }, 2000)
    })
  }
}
</script>