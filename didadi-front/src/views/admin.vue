<template>
  <el-container class="v-admin">
    <a-header>admin</a-header>
    <router-view></router-view>
    <a-footer></a-footer>
  </el-container>
</template>

<script>
import { mapState } from "vuex";
import aHeader from "@/modules/admin/header";
import aFooter from "@/modules/admin/footer";
import Base64 from "@/util/Base64";
export default {
  name: "admin",
  components: {
    aHeader,
    aFooter
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
