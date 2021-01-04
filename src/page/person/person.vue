<template>
  <div id="home">
    <div class="head">
      <!-- <home_herder
        @changetype="parentEvent"
        :headerKey="headerKey"
      ></home_herder> -->
      <Homeheader />
    </div>
    <div class="home_top cl">
      <div class="person_home">
          <div class="person_left">
            <div class="person_head">
                <div class="person_head_bg"></div>
                <div class="avator_con"><img :src="profile.user_pic" alt="" v-if="profile.user_pic"></div>
                <div class="person_username">{{profile.user_name}}</div>
                <div class="person_link">
                  <span>de个人主页</span>
                  http://dev.qubodianjing.com/user/person/homeperson/{{uid}}
                  <button class="tag-read" :data-clipboard-text="person_src" @click="copy">
                    <i class="el-icon-copy-document copy"></i>
                  </button>
                </div>
                <div class="attention" v-if="!isme">
                  <el-button v-if="flag == 1" class="attentionbtn" size="mini" type="primary" @click="follow" v-preventReClick>+ 加关注</el-button>
                  <el-button v-if="flag == 2" class="attentionbtn" size="mini" type="primary" @click="follow" v-preventReClick>取消关注</el-button>
                </div>
            </div>
            <!-- <personhead /> -->
            <div class="person_board">
              <ul>
                <router-link
                  tag="li"
                  active-class="active"
                  v-for="(item, index) in personNav"
                  :to="'/person/' + item.id +'/'+`${uid}`"
                  :key="index"
                >
                  {{ item.title }}
                  <!-- <div class="line"></div> -->
                </router-link>
              </ul>
            </div>
            <router-view></router-view>
          </div>
          <div class="person_right">
            <div class="newpost">
                    <div class="title_tag">
                        <img src="../../image/newpost.png" alt="" v-if="!isme">
                        <img src="../../image/mypost.png" alt="" v-if="isme">
                        <a href="#">
                            <div class="hot_bisai_more"></div>
                        </a>
                    </div>
                    <div class="post_detail"
                    v-for="(item,index) in articleList" 
                    :key="index"
                    @click="toPostDetail(item)"
                    >
                        <div class="detail_post_title">
                            <img :src="item.ch_logo" alt="">
                            <div><a href="#">{{item.ch_name}}</a></div>
                        </div>
                        <div class="post_con">
                            {{item.forum_title}}
                        </div>
                        <div class="post_con2">
                            <div class="post_con3" v-html="item.forum_body">
                                <!-- 资讯摘要：记得上帝是街坊邻居佛龛for几个人开盘高开 -->
                            </div>
                            <div class="post_img">
                            </div>
                            <div class="post_video">
                            </div>
                        </div>
                    </div>
                    <div class="nopost_detail" v-if="articleList.length == 0 && !isme">
                        他的资料不可见
                    </div>
                </div>
          </div>
      </div>
      
    </div>
    <div class="margin50">
      <Footer></Footer>
    </div>
    <!-- <i class="iconfont icon-wangluo"></i> -->
  </div>
</template>
<script>
import Homeheader from '../../components/home/homeheader.vue';
const Footer = () => import("../../components/footer/footer");
import Clipboard from 'clipboard';
export default {
  name: "Person",
  components: {
    Footer,
    Homeheader,
  },
  data() {
    return {
      isme:'',
      flag:'',//关注1,取消关注2
      profile:{},
      uid:this.$route.params.user_uid,
      person_src:"http://localhost:8080/front/person/homeperson/" + this.$route.params.user_uid,
      articleList: [],
      personNav: [
        {
          title: "主页",
          id: "homeperson",
          icon: "icon-caiyouduo_wode-gerenzhuye",
        },
        {
          title: "帖子",
          id: "article",
          icon: "icon-fatie",
        },
        {
          title: "回贴",
          id: "replyarticle",
          icon: "icon-fatie",
        },
        {
          title: "收藏",
          id: "attention",
          icon: "icon-guanzhu",
        },
        // {
        //   title: "粉丝",
        //   id: "fans",
        //   icon: "icon-wodeguanzhu",
        // },
        {
          title: "资料",
          id: "information",
          icon: "icon-wodeguanzhu",
        },
      ],
    };
  },
  methods: {
    toPostDetail(item){
      window.location.href = this.JuheHOST+ '/forum/' + item.ch_columnm_key + '/' + item.ch_key + '/' + item.id + '.html'
    },
    //获取个人信息
      getInfo(){
          this.$axios({
              url:`${this.$api.myprofile}/${this.$route.params.user_uid}`,
              method: "get",
              timeout: 3000
          })
          .then(res => {
            console.log(res);
              if (res.data.code == 1) {
                  // this.$message({
                  //     type: 'error', // warning、success
                  //     message: res.data.msg 
                  // })
                  this.articleList = [];
                  this.profile = {}
              } else if (res.data.code == 0) {
                  this.profile = res.data.params.profile;
                  this.articleList = res.data.params.my_forum.slice(-6);
                   if(res.data.params.profile.is_followed == 1){
                        this.flag = 2;
                    }else{
                        this.flag = 1;
                    }
                  // console.log(this.articleList);
              } else if (res.data.code == -1) {
                  this.$message({
                      type: 'success', // warning、success
                      message: '身份验证过期，请重新登录' 
                  })
                  window.location.href = this.JuheHOST
              }
          })
          .catch(error => {
              console.log(error);
          });
      },
    //点击关注
      follow(){
          // if(this.$route.params.uname){
          //     this.uid = this.$route.params.uname;
          // }else{
          //     this.uid = localStorage.getItem('otherId')
          // }
          this.$axios({
              url:`${this.$api.httppost.follow()}/${this.flag}/${this.$route.params.user_uid}`,
              method: "post",
              data: {
                  uid: this.$route.params.user_uid,
                  type: this.flag,
              },
              timeout: 3000
          })
          .then(res => {
              // console.log(res);
                  if (res.data.code == 1) {
                      this.$message({
                          type: 'error', // warning、success
                          message: res.data.msg 
                      }) 
                  } else if (res.data.code == 0) {
                      this.$message({
                          type: 'success', // warning、success
                          message: '成功！' 
                      })
                      if(this.flag == 1){
                          this.flag = 2
                      }else if(this.flag == 2){
                          this.flag = 1
                      }
                      // console.log(this.flag);                
                  } else if (res.data.code == -1) {
                      this.$message({
                          type: 'success', // warning、success
                          message: '登录过期，请重新登录' 
                      })
                      window.location.href = this.JuheHOST
                  }
          })
          .catch(error => {
              console.log(error);
          });
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
  mounted(){
    this.getInfo();
    console.log(this.$route.params.user_uid);
    if(this.$route.params.user_uid == localStorage.getItem("user_uid")){
        this.isme = true
    }else{
        this.isme = false
    }
  },
  watch: {
    '$route' (to, from) {
      this.getInfo();
      console.log(this.$route.params.user_uid);
        // if (to.name === 'homeperson') {
          // this.getInfo();
          this.uid = this.$route.params.user_uid    // 在此调用函数
          this.person_src = "http://dev.qubodianjing.com/user/person/homeperson/" + this.$route.params.user_uid;
          if(this.$route.params.user_uid == localStorage.getItem("user_uid")){
              this.isme = true
          }else{
              this.isme = false
          }
          console.log(this.isme);
        }
      // }
  }
};
</script>
<style lang="less" scoped>
#home{
    width: 100%;
    height: 100%;
    position: fixed;
    // top: 0;
    left: 0;
    overflow: scroll;
}
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
.person_home{
  width: 1500px;
  margin: auto;
  margin-top: 20px;
}
.person_left {
  width: 1070px;
  float: left;
  text-align: center;
  background: rgba(0,0,0,.5);
}
.person_right {
  width: 420px;
  // height: 920px;
  float: right;
  background: rgba(0,0,0,.5);
}
.person_head{
  width: 1029px;
  height: 150px;
  margin: auto;
  margin-top: 20px;
}
.person_head_bg{
  width: 1029px;
  height: 100px;
  background: url("../../image/person_head_bg.png") no-repeat;
  background-size: 100%;
}
.avator_con{
  width: 98px;
  height: 98px;
  display: inline-block;
  float: left;
  position: relative;
  left: 57px;
  top: -49px;
}
.avator_con img{
  width: 98px;
  height: 98px;
  border-radius: 50%;
}
.person_username{
  // width: 700px;
  height: 50px;
  line-height: 50px;
  display: inline-block;
  text-align: left;
  float: left;
  margin-left: 60px;
  color: #FFFFFE;
  font-size: 22px;
}
.person_link{
  height: 50px;
  line-height: 50px;
  width: auto;
  display: inline-block;
  float: left;
  color: #0279fe;
  font-size: 14px;
}
.person_link span{
  color: #828282;
  margin: 0 5px;
}
.tag-read{
  border: none;
  background: rgb(30, 36, 43,0.5);
  color: #FFF;
  cursor: pointer;
}
.person_board {
  width: 1039px;
  height: 55px;
  margin: auto;
  margin-top: 30px;
  border-bottom: 1px solid #334162;
  li {
    width: 90px;
    height: 45px;
    line-height: 45px;
    float: left;
    margin-right: 20px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    color: #828282;
    box-sizing: border-box;
  }
}
.person_board li.active,
.person_board li:hover {
  border-radius: 2px;
  border: 1px solid #f0d390;
  color: #f0d390;
}
.title_tag{
    /* width: 2.7rem; */
    height: 23px;
    margin: 20px;
}
.title_tag img{
    display: block;
    width: 117px;
    height: 23px;
    float: left;
}
.nopost_detail{
  text-align: center;
  color: #828282;
  font-size: 18px;
  margin: 20px;
}
.post_detail{
    height: 130px;
    padding-top: 10px;
    box-sizing: border-box;
    border-bottom: 1px solid #1D3748;
}
.detail_post_title{
    width: 100%;
    height: 22px;
}
.detail_post_title img{
    width: 20px;
    height: 20px;
    float: left;
    margin-left: 20px;
}
.detail_post_title div{
  display: inline-block;
    cursor: pointer;
    width: 370px;
    height: 20px;
    line-height: 20px;
    float: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 22px;
    color: #828282;
}
.post_con{
    width: 400px;
    margin-left: 24px;
    margin-top: 19px;
    font-size: 16px;
    color: #FFF;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.post_con2{
    width: 400px;
    margin-left: 24px;
    margin-top: 11px;
}
.post_con3{
    width: 300px;
    float: left;
    font-size: 16px;
    color: #FFF;
    height: 20px;
    // overflow: hidden;
    // text-overflow: ellipsis;
    // white-space: nowrap;
    overflow: hidden;
}
.post_con2 img{
    width: 20px;
    height: 20px;
    float: left;
    margin-left: 10px;
}
.post_img{
    width: 20px;
    height: 20px;
    float: left;
    margin-left: 10px;
    background: url("../../image/post_img.png") no-repeat;
    background-size: 100%;
}
.post_video{
    width: 20px;
    height: 20px;
    float: left;
    margin-left: 10px;
    margin-top: 2px;
    background: url("../../image/post_video.png") no-repeat;
    background-size: 100%;
}
.post_detail:hover{
    background-color: #0B1119;
}
.post_detail:hover .post_con,.post_detail:hover .post_con3{
    color: #f0d38f;
}
.post_detail:hover .post_video{
    background: url("../../image/post_video_bg.png") no-repeat;
    background-size: 100%;
}
.post_detail:hover .post_img{
    background: url("../../image/post_img_bg.png") no-repeat;
    background-size: 100%;
}
.post_detail:hover .detail_post_title div a{
    color: #FFF;
}
.hot_bisai_more{
    width: 19px;
    height: 16px;
    margin-top: 4px;
    cursor: pointer;
    float: right;
    background: url("../../image/more.png") no-repeat;
    background-size: 100%;
}
.hot_bisai_more:hover{
    background: url("../../image/more_bg.png") no-repeat;
    background-size: 100%;
}
a{
    text-decoration:none;
    color:inherit;
}
.attention{
  width: 100px;
  float: right;
}
.attentionbtn{
    width: 100px;
    border-radius: 20px;
    color: #756B5D;
    background-color: #242D42;
    border: 1px solid #756B5D;
}
.attentionbtn:hover{
  color: #f0d38f;
}
</style>
<style scoped>
.post_con3 >>> img{
    width: 115px;
    height: 73px;
    display: none;
}
.post_con3 >>> p{
    width: 100%;
    height: 20px;
    line-height: 20px;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    overflow: hidden;
}
.post_con3 >>> a{
    pointer-events:none;
}
</style>