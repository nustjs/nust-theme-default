<template>
<div class="main-doc fixed-header sticky-footer main-inner">
  <section class="sticky-footer-main">
    <div class="grid">
      <doc-aside :outline="outline"></doc-aside>
      <doc-detail :post="item"></doc-detail>
    </div>
  </section>
</div>
</template>

<script>
import axios from '~plugins/axios'
import DocAside from '~components/doc/Aside.vue'
import DocDetail from '~components/doc/Detail.vue'
export default {
  data () {
    return {
      item: {}
    }
  },
  computed: {
    outline () {
      return {
        toc: this.item.outlineData,
        cate: this.$route.params.folder
      }
    }
  },
  async asyncData ({params, route, store, error}) {
    let folder = params.folder
    let slug = params.slug || 'index'
    let langKey = store.state.i18n.curKey

    const path = `/${langKey}/${folder}/${slug}`
    let res, data
    try {
      res = await axios.get(`page/find${path}`)
      data = res.data
      if (data.item) {
        data.item.srcLink = `https://github.com/nuxt/docs/blob/master${path}.md`
      }
    } catch (err) {
      if (err.response.status !== 404) {
        return error({ statusCode: 500, message: this.$t('text.an_error_occured') })
      }
      return error({ statusCode: 404, message: this.$t('text.api_page_not_found') })
    }
    return data
  },
  scrollToTop: true,
  head () {
    return {
      title: this.item.title,
      titleTemplate: `%s - ${this.$t('homepage.meta.title')}`,
      meta: [
        { hid: 'description', name: 'description', content: this.item.desc }
      ]
    }
  },
  components: {
    DocAside,
    DocDetail
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/base/_base.styl';
.sticky-footer-main
  padding-top: 0
</style>
