<template>
  <div class="app-scroll-bar" ref="scrollBar" v-if="showScrollBar">
    <div class="scroll-bar-box clearFix" ref="scrollBarBox">
      <div class="scroll-bar-item" ref="scrollBarItem"></div>
    </div>
  </div>
</template>

<script>
import("@/styles/scrollBar.scss");
export default {
  name: "scrollBar",
  components: {},
  props: {
    refMaps: Object
  },
  computed: {},
  data: function() {
    return {
      showScrollBar: false
    };
  },
  methods: {
    init() {
      let appBoxHeight = this.refMaps.appBox.offsetHeight;
      let appBoxScrollHeight = this.refMaps.appBox.scrollHeight;
      if (appBoxScrollHeight > appBoxHeight) {
        this.showScrollBar = true;
      }
      console.log("this.refMaps", this.refMaps);
    }
  },
  created() {
    console.log("q");
  },
  mounted() {},
  watch: {
    refMaps(newVal) {
      if (newVal) {
        this.init();
      }
    }
  }
};
</script>
