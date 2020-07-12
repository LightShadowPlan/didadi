<template>
  <el-row :class="listShowState">
    <el-col :span="4" class="showListButton" @click.native="showList">L</el-col>
    <el-col :span="20">
      <el-select
        :filterable="true"
        @change="changeLanguages"
        @visible-change="autoHideList"
        @focus="cancleHide"
        size="mini"
        v-model="value"
        placeholder="请选择"
      >
        <el-option v-for="item in list" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-col>
  </el-row>
</template>

<script>
import languagesList from "@/i18n/languagesList";
export default {
  name: "lang",
  props: {},
  data: function() {
    return {
      list: languagesList.list,
      value: sessionStorage.lang,
      listShowState: "hideList",
      hideListTimer: 0
    };
  },
  methods: {
    changeLanguages(value) {
      sessionStorage.lang = value;
      window.location.reload();
    },
    showList() {
      this.listShowState =
        this.listShowState === "hideList" ? "showList" : "hideList";
      if (this.listShowState === "showList") {
        this.autoHideList(false);
      }
    },
    autoHideList(value) {
      if (!value) {
        this.cancleHide();
        this.hideListTimer = setTimeout(() => {
          this.listShowState = "hideList";
        }, 3000);
      }
    },
    cancleHide() {
      clearTimeout(this.hideListTimer);
    }
  },
  created() {},
  mounted() {},
  watch: {}
};
</script>

<style scoped lang="scss">
.el-row {
  width: 180px;
  height: 30px;
  position: fixed;
  top: 5px;
  right: -154px;
  z-index: 999;
  background: #333;
  border-radius: 3px;
  transition: 0.5s;
  &.hideList {
    right: -154px;
    opacity: 0.3;
  }
  &.showList {
    right: 5px;
    opacity: 1;
  }

  .showListButton {
    text-align: center;
    line-height: 30px;
    font-size: 20px;
    cursor: pointer;
    color: #fff;
    user-select: none;
  }
}
</style>
