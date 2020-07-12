<template>
  <div class="v-index clearFix">
    <i-header></i-header>
    <div class="i-container-warp clearFix">
      <router-view></router-view>
    </div>
    <i-footer></i-footer>
  </div>
</template>

<script>
import { mapState } from "vuex";
import iHeader from "@/modules/index/header";
import iFooter from "@/modules/index/footer";
import Base64 from "@/util/Base64";
import("@/styles/index.scss");
export default {
  name: "index",
  components: {
    iHeader,
    iFooter
  },
  props: {},
  computed: mapState({}),
  data: function() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {},
  watch: {}
};
</script>
