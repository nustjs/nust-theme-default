<template>
<div class="aside-sec favlinks">
  <div class="aside-tit">{{$t('titles.favlink')}}</div>
  <ul class="favlist">
    <li v-for="li in links">
      <a :href="li.link" target="_blank" :title="li.desc">{{li.name}}</a>
    </li>
  </ul>
</div>
</template>

<style lang="stylus" scoped>
@import '~assets/css/base/_base.styl';
.favlinks
  display none
  +tablet()
    display block
</style>

<script>
export default {
  computed: {
    links () {
      return this.$store.getters['xdata/getData']('links')
    }
  }
}
</script>