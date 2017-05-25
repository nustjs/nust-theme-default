<template>
  <notes-main :items="items"></notes-main>
</template>

<style lang="stylus" scoped>
</style>

<script>
import axios from '~plugins/axios'
import NotesMain from '~components/notes/Main.vue'
export default {
  async asyncData ({store}) {
    let langKey = store.state.i18n.curKey
    let pageNum = 1
    let res = await axios.get(`post/${langKey}/${pageNum}`)
    return res.data
  },
  components: {
    NotesMain
  }
}
</script>