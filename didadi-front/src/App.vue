<template>
  <div id="app" ref="appBox">
    <lang></lang>
    <div class="app-view" ref="appView">
      <router-view></router-view>
    </div>
    <scroll-bar :refMaps="refMaps"></scroll-bar>
  </div>
</template>

<script>
import Lang from "@/components/lang.vue";
import ScrollBar from "@/components/scrollBar.vue";
export default {
  name: "app",
  components: {
    Lang,
    ScrollBar
  },
  data() {
    return {
      refMaps: null
    };
  },
  mounted() {
    this.refMaps = this.$refs;
  }
};
</script>
