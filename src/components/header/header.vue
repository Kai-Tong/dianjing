<template>
  <div>
    <div class="header">
      <div class="header_box">
        <div class="header_logo">
          <a href="">
            <img src="../image/logo@2x.png" alt="" />
          </a>
        </div>
        <div class="header_nav">
          <div class="navfenge"></div>
          <a href="http://dev.qubodianjing.com/">
            <div class="header_home"></div>
          </a>
          <div class="navfenge"></div>
          <a href="http://dev.qubodianjing.com/live">
            <div class="Schedule"></div>
          </a>
          <div class="navfenge"></div>
          <a href="http://dev.qubodianjing.com/news">
            <div class="advisory"></div>
          </a>
          <div class="navfenge"></div>
          <a href="http://dev.qubodianjing.com/forum">
            <div class="header_forum"></div>
          </a>
          <div class="navfenge"></div>
        </div>
        <div class="header_search">
          <div class="headerseles">{{pickSearch}}</div>
          <div class="headerseles_img" @click="showsearchList()"></div>
          <input type="text" id="headersearch" v-model="searchmsg" />
          <div class="header_search_img" @click="gotosearch()"></div>
          <div class="headerseles_more_div" v-show="showsearchData">
            <div
              class="headerseles_more"
              v-for="(item, index) in searchData"
              :key="index"
              @click="changesearchtype(item.text, item.type)"
            >
              {{ item.text }}
            </div>
          </div>
        </div>
        <div class="headerlogin_div" v-show="!tokenflag">
          <img src="../image/ic-login@2x.png" alt="" />
          <span onclick="showlogin()"> 登录 </span>
          /
          <span onclick="showregistered()"> 注册 </span>
        </div>
        <div class="headerlogin_divok" v-if="tokenflag">
          <div class="headerlogin_div_center">
            <img :src="user_info.user_pic" alt="" class="Avatar" />
            <div class="user_name ov">
              {{ user_info.user_nickname || user_info.user_name }}
            </div>
            <img
              src="../image/forum/down.png"
              alt=""
              class="header_xiala"
              onclick="showuser()"
            />
            <div class="login_exit" onclick="loginexit()">退出</div>
          </div>
          <div class="header_showsuer" style="display: none">
            <div class="" @click="toperson">个人主页</div>
            <div class="" @click="tosettings">设置</div>
            <div class="" @click="topost">我的帖子</div>
            <div class="" @click="tohelp">帮助</div>
          </div>
        </div>
        <div class="navfenge"></div>
        <div class="headerdown">
          <div class="headerdown_img"></div>
          <div class="headerapptext">
            <a href=""> APP下载 </a>
          </div>
        </div>
        <div class="navfenge1"></div>
        <div class="header_collection" onclick="_addFavorite()">
          <div class="headercollection_img"></div>
          <div class="headercollection_text">收藏</div>
        </div>
      </div>
    </div>
    <!-- 登录 -->
    <div id="login" style="display: none" onclick="closelogin()">
      <div class="login" onclick="evenlogin()">
        <div class="login_header cl">
          <div class="dxlogin left"></div>
          <div class="zhlogin right" onclick="changezllogin()">
            <div>账号密码登录</div>
            <div class="zhlogin_icon"></div>
          </div>
        </div>
        <div class="login_header1 cl" style="display: none">
          <div class="dxlogin1 left"></div>
          <div class="zhlogin right" onclick="changedxlogin()">
            <div>短信登录</div>
            <div class="zhlogin_icon"></div>
          </div>
        </div>
        <div class="login_gang"></div>
        <div class="dxInputDiv">
          <div class="iphonenum">
            <div class="left iphonenum_label">手机号</div>
            <div class="left iphonenum_input">
              <div class="iphonenum_input_86">+86</div>
              <input
                type="text"
                placeholder="请输入11位手机号"
                value=""
                id="iphonenum_input_login"
              />
            </div>
          </div>
          <div class="verification">
            <div class="left iphonenum_label">验证码</div>
            <div class="left verification_input">
              <!-- <div class="verification_img">
                            
                        </div> -->

              <img
                src="../image/ic验证码@2x.png"
                alt=""
                class="verification_img"
              />
              <input type="text" placeholder="请输入验证码" id="vccode_dx" />
            </div>
            <div class="getverification" onclick="getverification()">
              获取验证码
            </div>
          </div>
        </div>
        <div class="zhInputDiv" style="display: none">
          <div class="iphonenum">
            <div class="left iphonenum_label">平台账号</div>
            <div class="left iphonenum_input1">
              <img src="../image/ic-账户@2x.png" alt="" />
              <input
                type="text"
                placeholder="请输入用户名、手机号或邮箱"
                id="zhnum_login"
              />
            </div>
          </div>
          <div class="iphonenum">
            <div class="left iphonenum_label">平台密码</div>
            <div class="left iphonenum_input2">
              <img src="../image/ic密码@2x.png" alt="" />
              <input
                type="password"
                placeholder="请输入登录密码"
                id="pwd_login"
              />
              <img
                :src="showpwdsimg"
                alt=""
                class="showpwd"
                @click="showpwds($event)"
              />
            </div>
          </div>
        </div>
        <div class="cl dengluxuanxiang">
          <div class="left centerimg clickdenglu">
            <div class="loginradio left" onclick="loginradio()"></div>
            <span>自动登录</span>
          </div>
          <div class="right forgetpswd">
            <a href="">忘记密码</a>
            /
            <a href="javascript:void(0)" onclick="showregistered()">注册账户</a>
          </div>
        </div>
        <div class="loginBtn" onclick="loginfn()">登录</div>
        <div class="login3div">第三方登录方式</div>
        <div class="centerimg sanfang">
          <div class="qq"></div>
          <div class="wechat"></div>
          <div class="weibo"></div>
        </div>
      </div>
    </div>

    <!-- 注册 -->
    <div id="registered" style="display: none" onclick="closeregistered()">
      <div class="registered" onclick="evenregistered()">
        <div class="registered_header cl">
          <div>
            <img src="../image/注册@2x.png" alt="" />
          </div>
        </div>
        <div class="login_gang"></div>
        <div class="dxInputDiv_registered">
          <div class="iphonenum">
            <div class="left iphonenum_label">用户名</div>
            <div class="left iphonenum_input">
              <img src="../image/ic-账户@2x.png" alt="" />
              <input
                type="text"
                placeholder="请输入3-20个数字、字母或字符"
                id="registered_name"
              />
            </div>
          </div>
          <div class="iphonenum">
            <div class="left iphonenum_label">设置密码</div>
            <div class="left iphonenum_input">
              <img src="../image/ic密码@2x.png" alt="" />
              <input
                type="password"
                placeholder="至少含2种字母、数字、标点符号，6~16个字符的组合"
                id="registered_pwd"
              />
              <img
                :src="showpwdsimg"
                alt=""
                class="showpwd"
                @click="showpwds($event)"
              />
            </div>
          </div>
          <div class="iphonenum">
            <div class="left iphonenum_label">确认密码</div>
            <div class="left iphonenum_input">
              <img src="../image/ic密码@2x.png" alt="" />
              <input
                type="password"
                placeholder="请再次输入密码"
                id="registered_pwd2"
              />
              <img
                :src="showpwdsimg"
                alt=""
                class="showpwd"
                @click="showpwds($event)"
              />
            </div>
          </div>
          <div class="iphonenum">
            <div class="left iphonenum_label">手机号</div>
            <div class="left iphonenum_input">
              <div class="iphonenum_input_86">+86</div>
              <input
                type="text"
                placeholder="请输入11位手机号"
                id="registered_iphoenum"
              />
            </div>
          </div>
          <div class="verification">
            <div class="left iphonenum_label">验证码</div>
            <div class="left verification_input">
              <!-- <div class="verification_img">
                            
                        </div> -->

              <img
                src="../image/ic验证码@2x.png"
                alt=""
                class="verification_img"
              />
              <input
                type="text"
                placeholder="请输入验证码"
                id="verificationregistered"
              />
            </div>
            <div
              class="getverification"
              onclick="getverificationregistered()"
              id="getverificationregistered"
            >
              获取验证码
            </div>
          </div>
        </div>
        <div class="readdiv">
          <div class="registeredradio left"></div>
          <div>已阅读并同意</div>
          <div class="gotouserxieyi">
            <a href=""> 《PC电竞用户协议》 </a>
          </div>
        </div>
        <div class="loginBtn" onclick="registered()">注册</div>
        <div class="havegotologin">
          <div>已有账户，</div>
          <div>
            <a href="javascript:void(0)" onclick="showlogin()"> 立即登录 </a>
          </div>
        </div>
        <div class="centerimg helpdiv">
          <div>
            <a href=""> 帮助 </a>
          </div>
          <div class="headerfootergang">/</div>
          <div>
            <a href=""> 隐私 </a>
          </div>
          <div class="headerfootergang">/</div>
          <div>
            <a href=""> 条款 </a>
          </div>
        </div>
      </div>
    </div>
    <div class="toast_box">
      <p id="toast"></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tokenflag: false,
      showpwdsimg: require("../image/login/ic-nosee@2x.png"),
      showpwdsimg1: require("../image/login/ic-see@2x.png"),
      searchData: [
        {
          text: "资讯",
          type: 1,
        },
        {
          text: "帖子",
          type: 2,
        },
        {
          text: "用户",
          type: 3,
        },
      ],//搜索框Data
      showsearchData:false,//是否展开搜索框
      pickSearch:"资讯",//选中类型
      searchmsg:"",//搜索内容
    };
  },
  methods: {
    showsearchList(){//展开搜索选项框
      this.showsearchData = !this.showsearchData
    },
    changesearchtype(text, type) {//选中搜索切换类型
      this.showsearchData = false
      this.pickSearch = text
       this.$emit('searchtype',type)
      localStorage.setItem("searchtype", type);
    },
    showpwds(e) {
      //修改密码框显示隐藏
      let borObj = e.currentTarget.previousElementSibling.type;
      if (borObj == "password") {
        e.path[0].src = this.showpwdsimg1;
        e.currentTarget.previousElementSibling.type = "text";
      } else {
        e.path[0].src = this.showpwdsim;
        e.currentTarget.previousElementSibling.type = "password";
      }
    },
    showtoken() {
      let token = localStorage.getItem("pctoken");
      if (token != null) {
        let user_info = JSON.parse(localStorage.getItem("user_info"));
        this.tokenflag = true;
        this.user_info = user_info;
      } else {
        this.tokenflag = false;
      }
      console.log(token != null, this.tokenflag);
    },
    gotosearch() {//跳转或者搜索内容
      if(this.$route.path == "/search"){
        this.$emit("searchmsg",this.searchmsg)
      }else{
        this.$router.push("/search");
      }
    },
    toperson() {
      this.$router.push({
        name: "person",
        params: { user_uid: localStorage.getItem("user_uid") },
      });
    },
    tosettings() {
      this.$router.push("/settings");
    },
    topost() {
      this.$router.push({
        name: "article",
        params: { user_uid: localStorage.getItem("user_uid") },
      });
    },
    tohelp() {
      this.$router.push("/helps");
    },
  },
  created() {
    this.showtoken();
  },
};
</script>

<style lang="less">
@import url("../css/header");
@import url("../css/index");
@import url("../css/login");
@import url("../css/registered");
</style>