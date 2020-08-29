<template>
  <div id="app" ref="appBox">
    <Lang></Lang>
    <div class="app-view" ref="appView">
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Lang from "@/components/lang.vue";
import Header from "@/components/header";
import Main from "@/components/main";
import Footer from "@/components/footer";
export default {
  name: "app",
  components: {
    Lang,
    Header,
    Main,
    Footer
  },
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>
