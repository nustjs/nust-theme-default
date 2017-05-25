<template>
  <affix :offset="offset">
    <div class="affix-sec" v-if="toc">
      <h3 class="affix-title">{{ $t('text.toc') }}</h3>
      <post-toc :toc="toc"></post-toc>
    </div>
    <div class="affix-sec" v-if="tags.length > 0">
      <h3 class="affix-title">{{ $t('text.postTags') }}</h3>
      <div class="affix-ct">
        <ul class="post-tags">
          <li v-for="item in tags" class="post-tag">
            <a target="_blank" :href="item.route" :title="item.title" class="post-tag-link" :class="'post-tag-w' + item.weight">#{{ item.title }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="affix-sec qrcode">
      <h3 class="affix-title">{{ $t('text.weeklyrss') }}</h3>
      <div class="affix-ct">
        <img class="aotuwx-qrcode" src="//aotu.io/img/qrcode.jpg" :alt="$t('text.weeklyrss')" />
      </div>
    </div>
  </affix>
</template>

<script>
import Affix from "~components/affix/Affix.vue"
import PostToc from "~components/post/TOC.vue"
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      offset: 70
    }
  },
  computed: {
    tags () {
      return this.post.tags
    },
    toc () {
      return this.post.tocData
    }
  },
  components: {
    Affix,
    PostToc
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/base/_base.styl';
.post-tags
  display: flex
  flex-wrap: wrap
  align-items: baseline
  justify-content: space-between
  text-transform: uppercase
  letter-spacing: 0.02em
.post-tag
  display: flex
  align-items: center
  &-link
    transition: all .3s ease
    border: 1px solid #ddd
    padding: 4px 15px
    margin-bottom: 10px
    &:hover
      border-color: #999
</style>
