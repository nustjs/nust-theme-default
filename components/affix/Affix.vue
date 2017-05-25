<template>
<div class="affix" :class="{ affixed: affixed }" :style="styles">
  <slot></slot>
</div>
</template>

<script>
import EventListener from '../utils/EventListener';
export default {
  props: {
    offset: {
      type: Number,
      default: 0,
    },
  },
  data () {
    return {
      affixed: false,
      styles: {},
    };
  },
  methods: {
    scrolling () {
      const scrollTop = this.getScroll(window, true);
      const offset = this.getOffset(this.$el);
      if (!this.affixed && scrollTop > offset.top - this.offset) {
        this.affixed = true;
        this.styles = {
          top: `${this.offset}px`,
          left: `${offset.left}px`,
          width: `${this.$el.offsetWidth}px`,
        };
      }
      if (this.affixed && scrollTop < this.initialTop - this.offset) {
        this.affixed = false;
        this.styles = {};
      }
    },
    getScroll (w, top) {
      let ret = w[`page${top ? 'Y' : 'X'}Offset`];
      const method = `scroll${top ? 'Top' : 'Left'}`;
      if (typeof ret !== 'number') {
        const d = w.document;
        ret = d.documentElement[method];
        if (typeof ret !== 'number') {
          ret = d.body[method];
        }
      }
      return ret;
    },
    getOffset (element) {
      let elm = element;
      let top = elm.offsetTop;
      let left = elm.offsetLeft;
      while (elm.offsetParent !== null) {
        elm = elm.offsetParent;
        top += elm.offsetTop;
        left += elm.offsetLeft;
      }
      return {
        top,
        left,
      };
    },
  },
  mounted () {
    // 获取初始 top 值，方便判断是否脱离 fixed 布局
    this.initialTop = this.getOffset(this.$el).top;
    this.scrollEvent = EventListener.listen(window, 'scroll', this.scrolling);
  },
  beforeDestory () {
    if (this.scrollEvent) {
      this.scrollEvent.remove();
    }
  },
};
</script>

<style>
.affixed {
  z-index: 100;
  position: fixed;
}
</style>