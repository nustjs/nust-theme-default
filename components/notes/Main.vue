<template>
  <div class="main-inner fixed-header sticky-footer">
    <section class="sticky-footer-main">
      <div class="grid">
        <div class="row">
          <div class="posts clearfix">
            <template v-for="item in items">
              <post-mini :post="item"></post-mini>
            </template>
          </div>
        </div>
      </div>
    </section>
    <app-footer/>
  </div>
</template>

<script>
import AppFooter from '~components/Footer.vue'
import PostMini from '~components/post/Mini.vue'
export default {
  props: {
    items: {
      type: Array,
      required: true,
      default: []
    }
  },
  computed: {},
  methods: {},
  components: {
    AppFooter,
    PostMini
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/base/_base.styl';
.posts
  +tablet()
    margin-right $fgs-gutter
</style>