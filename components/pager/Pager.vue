<template>
    <bulma-pagination
      v-if="visible"
      :currentPage="currentPage"
      :lastPage="lastPage"
      :displayPage="displayPage"
      :modifiers="modifiers"
      :prev="prevText"
      :next="nextText"
      :urlPrefix="urlRoot">
    </bulma-pagination>
</template>
<script>
import BulmaPagination from '~components/pager/BulmaPagination.vue'
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    lastPage: Number,
    displayPage: {
      type: Number,
      default: 4
    },
    modifiers: {
      type: String,
      default: ''
    },
    urlRoot: {
      type: String,
      required: true
    }
  },
  methods: {
  },
  computed: {
    prevText () {
      return this.$t('text.pager_prev')
    },
    nextText () {
      return this.$t('text.pager_next')
    },
    visible () {
      return (this.lastPage > 1)
    }
  },
  components: {
    BulmaPagination
  }
}
</script>
