<template>
<footer class="footer" id="footer">
  <div class="grid">
    <ul class="footer-links">
      <li><a href="/atom.xml"><i class="iconfont icon-rss"></i></a></li>
      <li><a href="https://github.com/o2team/o2team.github.io"target="_blank"><i class="iconfont icon-github"></i></a></li>
    </ul>
    <div class="footer-sec footer-copyright">
      <p>Designed by <a href="https://aotu.io" target="_blank">凹凸实验室</a> @<a target="_blank" href="https://jdc.jd.com">京东用户体验设计部</a></p>
      <p>Copyright &copy; {{ new Date().getFullYear() }}. All Rights Reserved.</p>
      <p><a href="http://www.miibeian.gov.cn/" target="_blank">粤ICP备15077732号-2</a></p>
    </div>
  </div>
</footer>
</template>

<style lang="stylus" scoped>
@import '~assets/css/base/_base.styl';
.footer
    margin-top: 30px
    background: #f8f8f8
    padding: 20px 0
    text-align: center
    border-top: 1px solid #eee
    +mobile()
        margin-top: 0
    &-links li
        width:32px
        height:32px
        line-height:32px
        text-align: center
        display: inline-block
        background-color: #f1f1f1
        border-radius: 50%
        margin: 0 5px
    &-copyright
        margin: 10px 0
        font-size: 12px
        & p
            margin-bottom: 5px
</style>
