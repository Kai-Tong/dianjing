<template>
  <div>
    <!-- <home_herder @changetype="parentEvent" :headerKey="headerKey"></home_herder> -->
    <homeheader />
    <div class="home_top">
      <div class="inset">
        <!-- <div class="line"></div> -->
        <div class="info_head">
          <div class="info_head_con">
            <div class="font1">设置</div>
            <div><img src="../../../image/set_arrow.png" alt=""></div>
            <div class="font1">账号信息</div>
            <div><img src="../../../image/set_arrow.png" alt=""></div>
            <div class="font2">{{routeAddress}}</div>
          </div>
          <div class="backset">
            <el-button
              type="primary"
              class="back"
              size="small"
              plain
              @click="backSet('second')"
              >返回</el-button
            >
          </div>
        </div>
        <div class="info_con">
          <component :is="iscomponent" :infoParams="infoList"></component>
        </div>
      </div>
    </div>

    <div class="margin50">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
const homeheader = () => import("@/components/home/homeheader");
const Footer = () => import("@/components/footer/footer");
const changename = () => import("./changename");
const changephone = () => import("./changephone");
const changemail = () => import("./changemail");
const changepass = () => import("./changepass");
const authentication = () => import("./authentication");
export default {
  components: {
    homeheader,
    changename,
    changephone,
    changemail,
    changepass,
    authentication,
    Footer
  },
  data() {
    return {
      // iscomponent:"",
      routeAddress: "",
      changename: changename,
      changephone: changephone,
      changemail: changemail,
      changepass: changepass,
      authentication: authentication,
      infoList: {
        id: "",
        name: localStorage.getItem("user_name"),
        password: "xxxx",
        email: "",
        phone: "",
      },
    };
  },
  computed: {
    iscomponent() {
      switch (this.$route.params.compontentName) {
        case "changename":
          this.routeAddress = "修改昵称";
          localStorage.setItem('routeAddress',this.routeAddress)
          return this.changename;

          break;
        case "changephone":
          this.routeAddress = "修改绑定手机号";
          localStorage.setItem('routeAddress',this.routeAddress)
          return this.changephone;
          break;
        case "changemail":
          this.routeAddress = "修改邮箱地址";
          localStorage.setItem('routeAddress',this.routeAddress)
          return this.changemail;
          break;
        case "changepass":
          this.routeAddress = "修改密码";
          localStorage.setItem('routeAddress',this.routeAddress)
          return this.changepass;
          break;
        case "authentication":
          this.routeAddress = "身份认证";
          localStorage.setItem('routeAddress',this.routeAddress)
          return this.authentication;
          break;
        default:
          switch(localStorage.getItem('routeAddress')){
            case "修改绑定手机号":
              this.routeAddress = "修改绑定手机号";
              return this.changephone;
              break;
            case "修改邮箱地址":
              this.routeAddress = "修改邮箱地址";
              return this.changemail;
              break;
            case "修改密码":
              this.routeAddress = "修改密码";
              return this.changepass;
              break;
            case "身份认证":
              this.routeAddress = "身份认证";
              return this.authentication;
              break;
          }
          break;
      }
    },
  },
  methods: {
    backSet(value) {
      this.$router.push({ name: "settings", params: { name: value } });
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.home_top{
    width: 100%;
    height: 817px;
    /* z-index: 10; */
    font-family: 'SourceHanSansCN-Regular';
    overflow: auto;
    background: url('../../../image/home_top.png') no-repeat;
    background-size: 100% 100%;
    background-position-y: 0px;
}
.inset{
  width: 1500px;
  height: 750px;
  margin: auto;
  margin-top: 50px;
  border: 1px solid #121733;
  background: rgba(0,0,0,.3);
}
.info_con {
  width: 1500px;
  margin: auto;
  margin-top: 120px;
}
.info_head{
  width: 100%;
  height: 88px;
  font-size: 24px;
  position: relative;
}
.info_head_con{
  width: 1400px;
  height: 88px;
  margin: auto;
  position: relative;
  border-bottom: 1px solid #344163;
}
.info_head_con div{
  display: inline-block;
  font-size: 24px;
  height: 88px;
  line-height: 88px;
  margin-left: 20px;
}
.info_head_con div img{
  width: 28px;
  height: 19px;
  margin-top: 34.5px;
}
.font1{
  color: #7c705f;
}
.font2{
  color:#EEE8BF;
}
.backset {
  position: absolute;
  right: 89px;
  top: 30.5px;
  .back {
    border-radius: 2px;
    font-size: 20px;
    color: #7c705f;
    border: 1px solid #7c705f;
    background-color: rgb(16, 21, 46, 0.3);
  }
}
</style>
