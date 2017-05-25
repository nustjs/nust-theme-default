<template>
<div class="fixed-header sticky-footer main-inner">
  <section class="sticky-footer-main">
    <div class="grid">
      <post-aside :post="post"></post-aside>
      <post-detail :post="post"></post-detail>
    </div>
  </section>
  <app-footer/>
</div>
</template>

<style lang="stylus" scoped>
.sticky-footer-main
  padding-top 0
</style>

<script>
import AppFooter from '~components/Footer.vue'
import PostAside from '~components/post/Aside.vue'
import PostDetail from '~components/post/Detail.vue'
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    toc () {
      return this.post.tocData
    }
  },
  methods: {},
  components: {
    PostDetail,
    PostAside,
    AppFooter
  }
}
</script>