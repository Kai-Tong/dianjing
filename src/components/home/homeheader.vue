<template>
    <div class="header">
            <div class="header_box">
                <div class="header_logo">
                    <a href="">
                        <img src="../../image/logo@2x.png" alt="">
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
                        <div class="header_forum1" v-if="this.$route.path == '/attentionset'"></div>
                        <div class="header_forum" v-else></div>
                    </a>
                    <div class="navfenge"></div>
                </div>
                <div class="header_search">
                    <!-- <div class="headerseles">帖子</div>
                    <div class="headerseles_img" onclick="showsearchList()"></div>
                    <input type="text" />
                    <div class="header_search_img" @click="gotosearch()"></div>
                    <div class="headerseles_more_div">
                        <div class="headerseles_more" onclick="changesearchtype()">
                        帖子
                        </div>
                        <div class="headerseles_more" onclick="changesearchtype()">
                        用户
                        </div>
                        <div class="headerseles_more" onclick="changesearchtype()">
                        资讯
                        </div>
                    </div> -->
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
                <div class="headerlogin_div">
                    <el-dropdown @command="gotosm">
                        <span class="el-dropdown-link cu">
                            <el-avatar
                            class="avatar"
                            :size="25"
                            :src="upic"
                            v-if="upic"
                            ></el-avatar>
                            <el-avatar v-else> {{ uname }} </el-avatar>
                            <span class="uname">{{ uname }}<i class="el-icon-arrow-down el-icon--right"></i></span>
                        </span>
                        <el-dropdown-menu slot="dropdown" :popper-append-to-body="false">
                            <el-dropdown-item
                            v-for="(item, index) in menuitem"
                            :key="index"
                            :command="item.src"
                            >{{ item.title }}</el-dropdown-item
                            >
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div class="exit left cu centerimg" @click="exit()">
                    退出
                </div>
                <div class="navfenge"></div>
                <div class="headerdown">
                    <div class="headerdown_img">
    
                    </div>
                    <div class="headerapptext">
                        <a href="">
                            APP下载
                        </a>
                    </div>
                </div>
                <div class="navfenge1"></div>
                <div class="header_collection" onclick="_addFavorite()">
                    <div class="headercollection_img">
    
                    </div>
                    <div class="headercollection_text" @click="collectip">
                        收藏
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    name:'',
    data(){
        return{
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
            menuitem: [
                {
                title: "账号设置",
                src: "/settings",
                },
                {
                title: "我的主页",
                src: "/person",
                },
                {
                title: "帮助",
                src: "/helps",
                },
            ],
            // upic:JSON.parse(localStorage.getItem('user_info')).user_pic,
            uname:JSON.parse(localStorage.getItem('user_info')).user_name
        }
    },
    methods:{
        showsearchList(){//展开搜索选项框
        this.showsearchData = !this.showsearchData
        },
        changesearchtype(text, type) {//选中搜索切换类型
        this.showsearchData = false
        this.pickSearch = text
        this.$emit('searchtype',type)
        localStorage.setItem("searchtype", type);
        },
         gotosearch() {//跳转或者搜索内容
            if(this.$route.path == "/search"){
                this.$emit("searchmsg",this.searchmsg)
            }else{
                this.$router.push("/search");
            }
        },
        gotosm(src) {
            console.log(src);
            let uid = localStorage.getItem("user_uid")
            if (src == "/person") {
                this.$router.push({
                    name: "person",
                    params: { user_uid: uid }
                });
            }else{
                this.$router.push(src);
            }
        },
        exit() {
        this.$api.loginout
            .useLoginout()
            .then((res) => {
            // console.log(res);
            if (res.data.code == 1) {
                this.$message({
                type: "error", // warning、success
                message: res.data.msg,
                });
            } else if (res.data.code == 0) {
                this.$message({
                showClose: true,
                type: "success", // warning、success
                message: "登出成功！",
                });
                // this.$store.commit("token", "");
                localStorage.setItem("user_name", "");
                localStorage.setItem("user_uid", "");
                localStorage.setItem("user_pic", "");
                localStorage.removeItem('token')
                localStorage.removeItem('user_info')
                window.location.href = this.JuheHOST
            } else if (res.data.code == -1) {
                window.location.href = this.JuheHOST
            }
            })
            .catch((error) => {
            console.log(error);
            this.$message("参数错误");
            });
        },
        collectip(){
            this.$message({
            offset:300,
            showClose: true,
            message: "您的浏览器不支持,请按 Ctrl+D 手动收藏!",
            });
        },
        tosearch(){
            // this.$router.push('/search')
        }
    },
    computed: {
        ...mapState(["upic"]),
    },
    mounted(){
        this.$store.commit("upic", JSON.parse(localStorage.getItem('user_info')).user_pic);
    }
}
</script>

<style scoped lang="less">
.header {
    width: 100%;
    position: fixed;
    z-index: 100;
    top: 0;
    background-image: url('../../image/header-bg@2x.png');
    background-size: 100%;
    background-repeat: no-repeat;
}

.header_box {
    display: flex;
    height: 75px;
    padding-bottom: 18px;
    align-items: center;
}

.header_logo {
    margin-left: 166px;
}

.header_logo img {
    width: 75px;
    height: 62px;
}

.header_nav {
    display: flex;
    align-items: center;
    margin-left: 22px;
}

.header_home {
    background-image: url('../../image/首页1@2x.png');
    background-size: 100%;
    background-repeat: no-repeat;
    width: 125px;
    height: 73px;
}

.header_home:hover {

    background-image: url('../../image/首页2@2x.png');
}

.header_home1 {
    background-image: url('../../image/首页2@2x.png');
}

.Schedule {
    background-image: url('../../image/赛程1@2x.png');
    background-size: 100%;
    background-repeat: no-repeat;
    width: 125px;
    height: 73px;
}

.Schedule:hover {
    background-image: url('../../image/赛程2@2x.png');
}

.Schedule1 {
    background-image: url('../../image/赛程2@2x.png');
}

.advisory {
    background-image: url('../../image/资讯1@2x.png');
    background-size: 100%;
    background-repeat: no-repeat;
    width: 125px;
    height: 73px;
}

.advisory:hover {
    background-image: url('../../image/资讯2@2x.png');
}

.advisory1 {
    background-image: url('../../image/资讯2@2x.png');
}

.header_forum {
    background-image: url('../../image/论坛1@2x.png');
    background-size: 100%;
    background-repeat: no-repeat;
    width: 125px;
    height: 73px;
}

.header_forum:hover {
    background-image: url('../../image/论坛2@2x.png');
}

.header_forum1 {
    background-image: url('../../image/论坛2@2x.png');
    background-size: 100%;
    background-repeat: no-repeat;
    width: 125px;
    height: 73px;
}

.navfenge {
    background-image: url('../../image/nav-分割@2x.png');
    width: 2px;
    height: 33px;
}

.navfenge1 {
    background-image: url('../../image/nav-分割@2x.png');
    width: 2px;
    height: 33px;
    margin: 0 16px;
}

.header_search {
    position: relative;
    margin-left: 1.265px * 200;
    width: 1.45px * 200;
    height: 45px;
    background-image: linear-gradient(#1e1e23,
            #1e1e23),
        linear-gradient(#f0d38f,
            #f0d38f);
    background-blend-mode: normal,
        normal;
    border-radius: 23px;
    opacity: 0.45;
    position: relative;
    display: flex;
    align-items: center;
    font-size:16px;
    color: #fff;
}

.header_search_img {
    background-image: url('../../image/search1@2x.png');
    background-size: 100%;
    background-repeat: no-repeat;
    width: 0.115px * 200;
    height: 0.115px * 200;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0.09px * 200;
    margin: auto;
}

.header_search_img:hover {
    background-image: url('../../image/search2@2x.png');
}

.header_search input {
    border: none;
    background-image: linear-gradient(#1e1e23,
            #1e1e23),
        linear-gradient(#f0d38f,
            #f0d38f);
    background-blend-mode: normal,
        normal;
    color: #fff;
    width: 0.83px * 200;
    font-size: 16px;
}

.headerseles_img {
    margin-left: 0.03px * 200;
    background-image: url('../../image/帖子-down1@2x.png');
    background-size: 100%;
    background-repeat: no-repeat;
    width: 0.075px * 200;
    height: 0.04px * 200;
}

.headerseles_img:hover {
    background-image: url('../../image/帖子-down2@2x.png');

}

.headerseles {
    margin-left: 0.095px * 200;
    color: #828282;
    font-size: 14px;
    width: 0.2px * 200;
    text-align: center;
}
.headerseles_more_div{
    position: absolute;
    left: .15px * 200;
    bottom: -0.25px * 200;
    background-image: linear-gradient(#1e1e23, #1e1e23), linear-gradient(#f0d38f, #f0d38f);
    
}
.headerseles_more{
    color: #fff;
    font-size: 14px;
    width: 0.3px * 200;
    text-align: center;
}
.headerseles:hover {
    color: #fdfdfd;
}
.headerseles_more:hover{
    color: #fdfdfd;
    cursor: pointer;
}

.headerlogin_div {
    margin: 0 22px;
    display: flex;
    align-items: center;
    font-size: 20px;
    color: #fdfdfe;
}

.headerlogin_div a {
    color: #fdfdfe;
    margin: 0 10px;
}

.headerlogin_div a:hover {
    color: #f0d38f;
}

.headerdown {
    display: flex;
    align-items: center;
    color: #fdfdfd;
    font-size: 20px;
}

.headerdown_img {
    background-image: url('../../image/ic-iPhone1@2x.png');
    background-size: 100%;
    background-repeat: no-repeat;
    width: 17px;
    height: 25px;
    margin-left:24px;
}

.headerapptext a{
    margin-left: 10px;
    color: #fdfdfd;
}

.headerdown:hover .headerdown_img {
    background-image: url('../../image/ic-iPhone2@2x.png');
    cursor: pointer;
}

.headerdown:hover .headerapptext a{
    cursor: pointer;
    color: #f0d38f;
}

.header_collection {
    display: flex;
    align-items: center;
    font-size: 20px;
    color: #fdfdfd;
}

.header_collection:hover .headercollection_img {
    cursor: pointer;
    background-image: url('../../image/ic-收藏2@2x.png');
}
.header_collection:hover .headercollection_text{
    cursor: pointer;
    color: #f0d38f;
}
.headercollection_img {
    background-image: url('../../image/ic-收藏1@2x.png');
    background-size: 100%;
    background-repeat: no-repeat;
    width: 18px;
    height: 25px;
}

.headercollection_text {
    margin-left: 4px;
}
.avatar {
  position: relative;
  top: 5px;
}
.uname{
    color: #f0d38f;
    font-size: 18px;
}
.exit{
    color: #f0d38f;
    border: 1px solid #f0d38f;
    font-size: 18px;
    width: 50px;
    text-align: center;
    padding: 5px 0;
    border-radius: 2px;
    margin-right: 10px;
    box-sizing: border-box;
}
.exit:hover{
    color: #c08d18;
    border: 1px solid #c08d18;
}
.el-dropdown-menu{
    background: rgba(0,0,0,.5);
    border:1px solid #1D3748;
}
.el-dropdown-menu__item:not(.is-disabled):hover{
      background: rgba(0,0,0,.5) !important;
      color: #f0d38f !important;
}
</style>
<style>
.el-dropdown-menu .popper__arrow{
    border-style: none;
    display: none !important;
}
</style>