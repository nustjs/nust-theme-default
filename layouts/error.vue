<template>
  <div class="main-error fixed-header sticky-footer">
    <div class="sticky-footer-main">
      <section class="err">
        <div class="err-bd">
          <img src="~static/triangles.png" alt="Logo nuxt" class="err-img"/>
          <h1 class="err-title">
            {{ error.statusCode }}
          </h1>
          <h2 class="err-stitle">
            {{ $t(`errCodes.E${error.statusCode}`, error.message) }}
          </h2>
        </div>
      </section>
    </div>
    <nuxt-footer></nuxt-footer>
  </div>
</template>

<script>
import NuxtFooter from '~components/Footer.vue'

export default {
  props: ['error'],
  components: {
    NuxtFooter
  }
}
</script>

<style lang="stylus" scoped>
.sticky-footer-main
  display flex
.err
  display flex
  flex 1
  align-items center
  justify-content center
  text-align: center
  &-title
    font-weight: 300
    letter-spacing: 1px
    margin: 20px 0
    color: #35495e
    font-size: 128px
    line-height: 100px
  &-stitle
    letter-spacing: 1px
    line-height: normal
    margin: 20px 0
    color: #35495e
</style>
