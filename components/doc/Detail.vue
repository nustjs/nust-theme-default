<template>
<article class="post typo" :class="{'post-has-affix': !!post.tocData}">
  <div class="post-inner">
    <div class="post-cover" v-if="post.cover"><img :src="post.cover" :alt="post.title" /></div>
    <header class="post-hd">
      <h1 class="post-tit">{{ post.title }}</h1>
      <div class="post-meta" v-if="hasMeta">
        {{ $t('text.postedBy') }} <a target="_blank" :href="authorUrl" class="post-author">{{ authorNick }}</a> {{ $t('text.postedAt') }} <span class="post-time">{{ post.timeFromNow }}</span>
        <template v-if="cate">
        {{ $t('text.postedIn') }} <a :href="cate.route" class="post-cate">{{ cate.title }}</a> {{ $t('text.cate') }}
        </template>
      </div>
    </header>
    <div class="post-content">
      <html-parser :content="post.body"></html-parser>
      <div class="post-announce" v-if="post.coeditor">{{copyrightCoEditor}}</div> 
      <div class="post-announce" v-else>{{copyright}}</div> 
      <div class="post-revision">
        <i class="iconfont icon-clock"></i> <time class="post-updated" :datetime="post.updated">{{ $t('text.post_lastupdated') }} {{post.updated}}</time>
      </div>
    </div>
    <div class="post-contribute" v-if="post.srcLink">{{ $t('guide.contribute') }} <a :href="post.srcLink" target="_blank">{{ $t('guide.edit_on_github') }}</a></div>
    <gitment :post="post"></gitment>
  </div>
</article>
</template>

<style lang="stylus" scoped>
@import '~assets/css/base/_base.styl';
.post
  padding-top: $fgs-section-mb
  &-inner
    background: #fff
    padding: $fgs-section-mb
  &-content
    margin-bottom: $fgs-section-mb
  +tablet()
    width: $post-width-tablet
    padding-left $fgs-gutter
    float: right
  +desktop()
    width: $post-width-desktop
  +widescreen()
    width: $post-width-widescreen
  +hd()
    width: $post-width-hd
  +fhd()
    width: $post-width-fhd
</style>

<script>
import HtmlParser from '~components/HtmlParser.vue'
import Gitment from '~components/post/Gitment.vue'
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    authorUrl () {
      if (!this.post.author) return false
      return this.post.author.url || `https://github.com/${this.post.author.github_name}`
    },
    authorNick () {
      if (!this.post.author) return false
      return this.post.author.nick || this.post.author.github_name
    },
    copyrightCoEditor () {
      if (!this.post.coeditor) return false
      return this.$t('text.post_copyright1', {
        editorUrl: this.post.coeditor.url,
        editorName: this.post.coeditor.name,
        postUrl: this.post.url
      })
    },
    cate () {
      return this.post.cate
    },
    hasMeta () {
      return this.cate || this.authorUrl
    },
    copyright () {
      return this.$t('text.post_copyright0', {
        postUrl: this.post.url || this.post.route
      })
    }
  },
  methods: {},
  components: {
    HtmlParser,
    Gitment
  }
}
</script>
