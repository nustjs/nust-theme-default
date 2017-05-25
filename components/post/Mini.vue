<template>
  <article class="mpost" itemscope itemtype="http://schema.org/Article">
    <a :href="post.route" itemprop="url" :title="post.title" class="mpost-link">
      <div class="mpost-cover" itemscope itemtype="http://schema.org/ImageObject">
        <img :src="post.cover" :alt="post.title" itemprop="contentUrl"/>
      </div>
      <div class="mpost-info">
        <h3 class="mpost-tit" itemprop="name headline">{{ post.title }}</h3>
        <p class="mpost-desc" itemprop="about">{{ post.desc }}</p>
      </div>
    </a>
  </article>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {},
  methods: {}
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/base/_base.styl';
.mpost
  box-sizing: border-box
  margin-bottom: $fgs-section-mb

  &-link
    display: block
    background: rbga(255, 255, 255, .9)
    margin: 0 ($fgs-gutter - 5) 0 ($fgs-gutter - 5)
    transition: all .2s ease
    box-shadow: 0 1px 2px rgba(0,0,0,0.1)
    &:hover
      background: rbga(255, 255, 255, 1)
      box-shadow: 0 0 5px rgba(0,0,0,.15)
      .mpost-desc
        color: $color-default
  &-cover
    position:relative
    display: block
    width: 100%
    height: auto
    overflow: hidden
    background: #f8f8f8
    img
      display: block
      width: 100%
      
  &-info
    padding: 10px 15px
    +tablet()
      padding 10px
    
  &-tit
    height: 24px
    margin-bottom: 5px
    margin-top: 5px
    overflow: hidden
    line-height: 24px
    font-size 1.2em
    font-weight: 400
    white-space: nowrap
    text-overflow: ellipsis
    transition: color 200ms
    
  &-desc
    height: 40px
    line-height: 20px
    overflow: hidden
    text-overflow: ellipsis
    display: -webkit-box
    -webkit-line-clamp: 2
    -webkit-box-orient: vertical
    word-wrap: break-word
    transition: color 200ms
  /*
  &:nth-child(odd)
    .mpost-link
      +desktop()
        margin-left: 0
  &:nth-child(0n+3)
    .mpost-link
      +desktop-hd()
        margin-left: 0
  */

  +tablet()
    float: left
    width 50%
    &-cover
      height 150px
    &-link
      margin-left $fgs-gutter
      margin-right 0
      box-shadow none
  +desktop()
    width: 33.33333%
    &-cover
      height: 130px
  +widescreen()
    &-cover
      height 160px
  +hd()
    width 25%
    &-cover
      height 150px
  +fhd()
    width: 20%
    &-cover
      height 140px
</style>
