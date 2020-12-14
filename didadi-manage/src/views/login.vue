<template>
  <el-container>
    <div class="filter-background">
      <img src="../assets/images/bg-1.jpg" class="filter-img" alt />
    </div>
    <el-main>
      <el-row class="login">
        <el-col class="login-title" :span="24">{{this.$t('pages.login')}}</el-col>
        <el-col class="login-form" :span="24">
          <el-form
            label-width="100px"
            :model="loginForm"
            status-icon
            :rules="rules"
            ref="loginForm"
            class="loginForm"
            @keypress.enter.native="submitForm('loginForm')"
          >
            <el-form-item prop="account" :label="this.$t('label.account') + ':'">
              <el-input v-model.number="loginForm.account" prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item prop="password" :label="this.$t('label.password') + ':'">
              <el-input
                type="password"
                v-model="loginForm.password"
                autocomplete="off"
                prefix-icon="el-icon-lock"
              ></el-input>
            </el-form-item>
            <el-col class="form-item-submit">
              <el-button
                type="primary"
                class="login-submit"
                @click="submitForm('loginForm')"
              >{{this.$t('button.submit')}}</el-button>
            </el-col>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
import Base64 from "@/util/Base64";
import filterBackground from "@/assets/images/bg-1.jpg";
import { mapState } from "vuex";
export default {
  name: "login",
  props: {},
  computed: mapState({
    userInfo: state => state.user.userInfo
  }),
  data: function() {
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入账号"));
      }
      setTimeout(() => {
        if (!/^\w{4,16}$/.test(value)) {
          callback(new Error("请输入正确的账号格式"));
        } else {
          callback();
        }
      }, 1000);
    };
    var checkPassword = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入密码"));
      }
      setTimeout(() => {
        if (!/^\w{8,20}$/.test(value)) {
          callback(new Error("请输入正确的密码格式"));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      filterBackground: "background: url(" + filterBackground + ");",
      loginForm: {
        account: "",
        password: ""
      },
      rules: {
        account: [{ validator: checkAccount, trigger: "blur" }],
        password: [{ validator: checkPassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = Object.assign({}, this.loginForm);
          data.password = Base64.encode(data.password);
          this.$store
            .dispatch("loginByInfo", data)
            .then(result => {
              console.log(result);
              if (result) {
                this.$router.push({ path: "index" });
              }
            })
            .catch(() => {});
        }
      });
    }
  },
  created() {
    this.$store.dispatch("logout");
  },
  mounted() {},
  watch: {
    userInfo() {}
  }
};
</script>

<style scoped lang="scss">
.el-container {
  width: 100%;
  height: 100%;
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
}
.filter-background {
  background: linear-gradient(
    to bottom,
    rgb(244, 229, 213),
    rgb(255, 255, 255),
    rgb(0, 199, 193)
  );
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  .filter-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.el-main {
  display: flex;
  justify-content: center;
  align-items: center;
}
.login {
  width: 540px;
  height: auto;
  min-height: 300px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.8);
  overflow: hidden;
}
.login-title {
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-size: 30px;
  color: #fff;
  background: linear-gradient(
    to right bottom,
    rgb(5, 217, 255),
    rgb(166, 58, 255)
  );
}
.login-form {
  min-height: 240px;
  padding: 30px;
  .el-form-item {
    height: 40px;
  }
  .form-item-submit {
    .login-submit {
      width: 100%;
    }
  }
}
</style>
