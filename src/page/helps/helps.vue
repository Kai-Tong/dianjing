<template>
  <div>
    <headerlogin />
    <div class="home_top">
        <div class="content">
            <div class="title_tag">
                <img src="../../image/help.png" alt="">
            </div>
            <div class="question">
              <el-collapse v-model="activeNames" @change="handleChange">
                <!-- <el-collapse-item name="1">
                  <template slot="title">
                    热门问题<img style="width:23px;height:31px;margin-left:10px" src="../../image/imgs/hot.png" alt="">
                  </template>
                  <div class="question_title" @click="questionOne()"><img src="../../image/ic2x.png" alt="">账号无法登录？</div>
                  <div class="question_title" @click="questionTwo()"><img src="../../image/ic2x.png" alt="">忘记密码怎么办？</div>
                  <div class="question_title" @click="questionThree()"><img src="../../image/ic2x.png" alt="">收不到验证码？</div>
                </el-collapse-item> -->
                <el-collapse-item title="问题分类1" name="2">
                  <div class="question_title" @click="questionOne()"><img src="../../image/ic2x.png" alt="">账号无法登录？</div>
                  
                </el-collapse-item>
                <el-collapse-item title="问题分类2" name="3">
                  <div class="question_title" @click="questionTwo()"><img src="../../image/ic2x.png" alt="">忘记密码怎么办？</div>
                  <div class="question_title" @click="questionThree()"><img src="../../image/ic2x.png" alt="">收不到验证码？</div>
                </el-collapse-item>
              </el-collapse>
              <div class="customer">
                  在线客服<i class="el-icon-s-custom"></i><img src="../../image/more.png" alt="">
              </div>
            </div>
            <div class="question_content">
                <div v-if="question1">
                  <div class="question1_title">
                      账号无法登录?
                  </div>
                  <div class="question_step"><img src="../../image/ic2x.png" alt="">是否账号有误请重新输入，忘记密码请尝试找回密码！</div>
                  <div class="question_img">
                    <img src="../../image/ex.png" alt="">
                  </div>
                </div>
                <div v-if="question2">
                  <div class="question1_title">
                      忘记密码怎么办?
                  </div>
                  <div class="question_step"><img src="../../image/ic2x.png" alt="">尝试找回密码！</div>
                  <div class="question_img">
                    <img src="../../image/ex.png" alt="">
                  </div>
                </div>
                <div v-if="question3">
                  <div class="question1_title">
                      收不到验证码？
                  </div>
                  <div class="question_step"><img src="../../image/ic2x.png" alt="">请稍后再试！或联系客服！</div>
                </div>
            </div>
            <div class="aboutus">
              <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item name="1">
                  <template slot="title">
                    热门问题<img style="width:23px;height:31px;margin-left:10px" src="../../image/imgs/hot.png" alt="">
                  </template>
                  <div class="question_title" @click="questionOne()"><img src="../../image/ic2x.png" alt="">账号无法登录？</div>
                  <div class="question_title" @click="questionTwo()"><img src="../../image/ic2x.png" alt="">忘记密码怎么办？</div>
                  <div class="question_title" @click="questionThree()"><img src="../../image/ic2x.png" alt="">收不到验证码？</div>
                </el-collapse-item>
              </el-collapse>
                <div class="question1_title">关注我们</div>
                <div class="netname">网站名称：仅为荣耀，一往无前</div>
                <div class="netname">版本号：v.11</div>
                <div class="netname">关注我们：</div>
                <div class="contact"><img src="../../image/wechat.png" alt="">电竞君</div>
                <div class="contact"><img src="../../image/QQ.png" alt="">电竞君</div>
                <div class="contact"><img src="../../image/sina.png" alt="">电竞君</div>
                <div class="contact"><img src="../../image/Facebook.png" alt="">电竞君</div>
                <div class="netname">联系我们：</div>
                <div class="contactus">
                  <img src="../../image/ic2x.png" alt="">
                    258964571@qq.com
                    <button class="tag-read" data-clipboard-text="258964571@qq.com" @click="copy"><i class="el-icon-copy-document copy"></i></button>
                </div>
                
            </div>
        </div>
    </div>
    <div class="margin50">
      <Footer></Footer>
    </div>
  </div>
</template>
<script>
const headerlogin = () => import("@/components/header/header");
const Footer = () => import("../../components/footer/footer");
import Clipboard from 'clipboard';
export default {
  name: "Person",
  components: {
    headerlogin,
    Footer
  },
  data() {
    return {
      activeNames: ['1'],
      question1:true,
      question2:false,
      question3:false,
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
      
    },
    questionOne(){
      this.question1 = true
      this.question2 = false
      this.question3 = false
    },
    questionTwo(){
      this.question1 = false
      this.question2 = true
      this.question3 = false
    },
    questionThree(){
      this.question1 = false
      this.question2 = false
      this.question3 = true
    },
     copy() {
      var clipboard = new Clipboard('.tag-read')
      clipboard.on('success', e => {
        this.$message({
          type: 'success', // warning、success
          message: '复制成功！' 
        }) 
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        this.$message({
          type: 'error', // warning、success
          message: '该浏览器不支持复制！' 
        }) 
        // 释放内存
        clipboard.destroy()
      })
    }
  },
};
</script>
<style lang="less" scoped>
.home_top{
   width: 100%;
    // height: 100%;
    // height: 899px;
    /* z-index: 10; */
    font-family: 'SourceHanSansCN-Regular';
    overflow: auto;
    background: url('../../image/home_top.png') no-repeat;
    background-size: 100% 899px;
}
.content{
    width: 1500px;
    height: 750px;
    margin: auto;
    margin-top: 50px;
    border: 1px solid #121733;
    background: rgba(0,0,0,.5);
}
.title_tag{
    width: 1420px;
    height: 23px;
    margin: 20px 40px;
}
.title_tag img{
    display: block;
    width: 117px;
    height: 23px;
    float: left;
}
.question{
  width: 370px;
  // height: 100%;
  margin-left: 40px;
  float: left;
  background: rgba(0,0,0,.5);
}
// 左
.question_title{
  width: 320px;
  height: 20px;
  line-height: 20px;
  font-size: 18px;
  color: #828282;
  cursor: pointer;
  margin: auto;
  margin-top: 10px;
}
.question_title:hover{
  color: #d6cece;
}
.question_title img{
  width: 12px;
  height: 12px;
  margin-top: 4px;
  margin-right: 4px;
}
.customer{
  background-color: #3E4D7B;
  width: 100%;
  height: 48px;
  line-height: 48px;
  font-size: 20px;
  text-indent: 20px;
  color: #DCDFE7;
  cursor: pointer;
}
.customer img{
  width: 19px;
  height: 16px;
  display: inline-block;
  float: right;
  margin-top: 16px;
  margin-right: 10px;
}
// 中间
.question_content{
  width: 620px;
  margin-left: 30px;
  float: left;
  border: 1px solid #4A5479;
}
.question1_title{
  background-color: #3E4D7B;
  width: 100%;
  height: 48px;
  line-height: 48px;
  font-size: 20px;
  text-indent: 20px;
  color: #DCDFE7;
  border-top: 1px solid #DCDFE7;
}
.question_step{
  width: 95%;
  height: 20px;
  line-height: 20px;
  font-size: 16px;
  color: #828282;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
}
.question_step img{
  width: 12px;
  height: 12px;
  margin-top: 4px;
  margin-right: 4px;
}
.question_img{
  width: 400px;
  height: 200px;
  margin: auto;
}
.question_img img{
  width: 400px;
  height: 200px;
}
// 右
.aboutus{
  width: 370px;
  margin-left: 30px;
  padding-bottom: 20px;
  box-sizing: border-box;
  float: left;
  border: 1px solid #4A5479;
}
.netname{
  font-size: 18px;
  color: #828282;
  text-align: center;
  margin: 20px 20px;
}
.contact{
  width: 90%;
  height: 26px;
  line-height: 26px;
  font-size: 16px;
  color: #828282;
  text-align: center;
  margin: auto;
  margin-top: 10px;
  img{
    width: 26px;
    height: 26px;
    margin-right: 10px;
  }
}
.contactus{
  width: 90%;
  height: 26px;
  line-height: 26px;
  font-size: 16px;
  color: #828282;
  text-align: center;
  margin: auto;
  margin-top: 10px;
  img{
    width: 12px;
    height: 12px;
    margin-top: 7px;
    margin-right: 10px;
  }
}
.copy:hover{
  color: #DCDFE7;
  cursor: pointer;
}
.tag-read{
  border: none;
  background: rgba(0,0,0,.3);
  color: #FFF;
}
/deep/.el-collapse-item__header{
  font-size: 20px;
  text-indent: 20px;
  color: #DCDFE7;
  background-color: #3E4D7B;
}
/deep/.el-collapse-item__arrow.is-active{
  margin-top: -10px;
}
/deep/.el-collapse-item__wrap{
  background: rgba(0,0,0,.3);
}

</style>