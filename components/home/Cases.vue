<template>
<div class="aside-sec cases">
  <div class="aside-tit">{{$t('titles.cases')}}</div>
  <ul class="caselist">
    <li v-for="li in items">
      <a :href="li.link" target="_blank" :title="li.desc">{{li.name}}</a>
    </li>
  </ul>
</div>
</template>

<style lang="stylus" scoped>
@import '~assets/css/base/_base.styl';
.cases
  display none
  +tablet()
    display block
</style>

<script>
export default {
  computed: {
    items () {
      return this.$store.getters['xdata/getData']('cases')
    }
  }
}
</script>