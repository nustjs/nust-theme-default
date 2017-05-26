<template>
<div class="aside-sec aotugg">
  <div class="aotuwx">
    <div class="aside-tit aotuwx-slogan">{{$t('titles.aotuwx')}}</div>
    <img class="aotuwx-qr" src="/img/qrcode.jpg" :alt="$t('titles.aotuwx')" />
  </div>
  <div class="liteo2">
    <div class="aside-tit liteo2-slogan">{{$t('titles.liteo2')}}</div>
    <a href="//app.aotu.io" target="_blank" class="liteo2-link" :title="$t('titles.liteo2')">
      <img class="liteo2-pic" src="/img/liteo2.png" :alt="$t('titles.liteo2')" />
      <img class="liteo2-qr" src="/img/liteo2-qr.png" :alt="$t('titles.liteo2')" />
    </a>
  </div>
</div>
</template>

<style lang="stylus" scoped>
  @import '~assets/css/base/_base.styl'
  .aotugg
    display none
    +tablet()
      display block
  .aotuwx
    margin-bottom $fgs-section-mb
  .liteo2
    &-link
      display block
    &-pic
      padding 2px
      margin-bottom 10px
</style>
