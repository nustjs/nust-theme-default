<template>
  <div class="search">
    <input class="search-ipt" type="text" name="search" id="algolia" :placeholder="$t('text.search')"/>
  </div>
</template>

<script>
let scriptInjected = false
let callbacks = []
let onScriptLoaded = (cb) => callbacks.push(cb)
let scriptLoaded = () => callbacks.forEach((cb) => cb())

export default {
  mounted () {
    onScriptLoaded(() => this.addInstantSearch())
    if (scriptInjected) return
    const script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('src', '//cdn.jsdelivr.net/docsearch.js/2/docsearch.min.js')
    document.getElementsByTagName('body')[0].appendChild(script)
    script.onload = scriptLoaded
    scriptInjected = true
  },
  methods: {
    addInstantSearch () {
      window.docsearch({
        apiKey: process.env.docSearchApiKey,
        indexName: 'nustjs',
        inputSelector: '#algolia',
        algoliaOptions: { 'facetFilters': [`tags:${this.$store.state.i18n.curKey}`] },
        debug: true // Set debug to true if you want to inspect the dropdown
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/base/_base.styl';
.search
  width: 100%
  height: 100%
  position: relative
  &-ipt
    width: 100%
    display: block
    border: none
    font-weight: 400
    height: 100%
    font-size: 16px
    padding: 0 15px
    letter-spacing: 0.5px
    &::-webkit-input-placeholde
      color #666
    +desktop()
      padding: 0 30px
      border-left: 1px solid $header-bd-color
      border-right: 1px solid $header-bd-color
      &:focus, &:visited, &:active
        border-left: 1px solid $header-bd-color
        border-right: 1px solid $header-bd-color
</style>
