<template>
  <div class="home_top">
            <div class="content">
                <div class="confim_account">
                    <img src="../../../image/accountconfirm.png" alt="">
                    <img src="../../../image/set_arrow.png" alt="">
                </div>
                <div class="confim_account_content">
                    <div class="confim_account_left">
                        <div class="confim_account_avtar">
                            <img class="confim_account_tag" src="../../../image/ic2x.png" alt="">
                            <span class="p1">头像</span>
                            <div>
                                <!-- <img src="../../../image/logo.png" alt=""> -->
                                <img :src="infoList.user_pic" alt="" v-if="infoList.user_pic">
                                <el-avatar class="avatar_img" v-else> {{ uname }} </el-avatar>
                            </div>
                            <el-upload
                                :headers = "Myheaders"
                                :action="uploadActionUrl"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                                :show-file-list = "showList"
                            >
                            <!-- <el-link class="p2" type="primary">更新</el-link> -->
                            <span class="p2">更新</span>
                            </el-upload>
                            
                        </div>
                        <div  class="confim_account_name">
                            <img class="confim_account_tag" src="../../../image/ic2x.png" alt="">
                            <span class="p1">用户名</span>
                            <span class="p3">{{infoList.user_name}}</span>
                        </div>
                        <div class="confim_account_pass">
                            <img class="confim_account_tag" src="../../../image/ic2x.png" alt="">
                            <span class="p1">登录密码</span>
                            <span class="p3">********</span>
                            <span class="p2" @click="goSetinfo('changepass')">修改</span>
                        </div>
                    </div>
                    <div class="confim_account_right">
                        <div class="confim_account_pass">
                            <img class="confim_account_tag" src="../../../image/ic2x.png" alt="">
                            <span class="p1">绑定手机</span>
                            <span class="p3" v-if="infoList.user_mobile">{{infoList.user_mobile}}</span>
                            <span v-else>未认证</span>
                            <span class="p2" @click="goSetinfo('changephone')">修改</span>
                        </div>
                        <div class="confim_account_pass">
                            <img class="confim_account_tag" src="../../../image/ic2x.png" alt="">
                            <span class="p1">邮箱认证</span>
                            <span class="p3" v-if="infoList.user_email">{{infoList.user_email}}</span>
                            <span class="p3" v-else>未验证</span>
                            <span class="p2" @click="goSetinfo('changemail')">去验证</span>
                        </div>
                        <div class="confim_account_pass">
                            <img class="confim_account_tag" src="../../../image/ic2x.png" alt="">
                            <span class="p1">身份认证</span>
                            <span v-if="infoList.user_id" class="p3">已认证</span>
                            <span v-else class="p3">未认证</span>
                            <span class="p2" @click="goSetinfo('authentication')" v-if="!infoList.user_id">去认证</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import { mapState ,mapMutations } from "vuex";
export default {
    name:"Accountinfo",
    data(){
        return{
            imgurl:this.JuheHOST,
            uploadActionUrl:this.$api.uploadActionUrl,
            avator:require("@/image/news.jpeg"),
            Myheaders:{token : localStorage.getItem("token")},
            showList:false,
            infoList:{
                user_pic:''
            }
        }
    },
    methods:{
        handleAvatarSuccess(res, file) {
            console.log(res);
            console.log(file);
            this.$store.commit("upic", res.params.user_pic);
            this.infoList.user_pic = res.params.user_pic;
            // localStorage.setItem('user_pic',res.params.user_pic);
            let user_info = JSON.parse(localStorage.getItem('user_info'))
             user_info.user_pic = res.params.user_pic;
             localStorage.setItem("user_info", JSON.stringify(user_info));
            if (res.code == 1) {
                  this.$message({
                    type: 'error', // warning、success
                    message: res.msg 
                  }) 
              } else if (res.code == 0) {
                  this.$message({
                    type: 'success', // warning、success
                    message: "修改成功"
                  })        
              } else if (res.code == -1) {
                  this.$message({
                    type: 'warning', // warning、success
                    message: res.msg 
                  })
              }
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG && !isPNG) {
            this.$message.error('上传头像图片只能是 JPG,PNG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return (isJPG || isPNG) && isLt2M;
        },
        goSetinfo(value){
            // this.$router.push("/setinfo/a")
            this.$router.push({ name: 'setinfo', params: { compontentName:value }})
        },
        //获取用户信息
        getbasic(){
            this.$api.getbasicInfo.getbasic(

            ).then(res => {
                console.log(res);
                if (res.data.code == 1) {
                    this.$message({
                        type: 'error', // warning、success
                        message: res.data.msg 
                    }) 
                } else if (res.data.code == 0) {
                    // this.$message({
                    //     type: 'success', // warning、success
                    //     message: res.data.msg 
                    // })
                    this.infoList = res.data.params;                        
                } else if (res.data.code == -1) {
                    this.$message({
                        type: 'success', // warning、success
                        message: '身份验证过期，请重新登录'
                    })
                    window.location.href = this.JuheHOST
                }
            })
            .catch(error => {
                this.$message("服务器响应失败，请稍后~");
            })
        }
    },
    computed: {
        ...mapState(["uname"]),
    },
    mounted(){
        console.log(this.$api.uploadActionUrl);
        // console.log(localStorage.getItem("token"));
        this.getbasic();
    }
}   
</script>

<style lang="less" scoped>
#home{
    width: 100%;
    height: 100%;
    /* position: fixed; */
    font-family: 'SourceHanSansCN-Regular';
    overflow: auto;
    background: url('../../../image/bg@2x.png') no-repeat;
    background-size: 100% 100%;
}
.home_top{
    width: 100%;
    height: 817px;
    /* z-index: 10; */
    font-family: 'SourceHanSansCN-Regular';
    overflow: auto;
    background: url('../../../image/home_top.png') no-repeat;
    background-size: 100% 100%;
}
.home_mid{
    width: 100%;
    height: 400px;
    margin: auto;
    position: relative;
    top: -200px;
    overflow: auto;
    background: url('../../../image/home_bottom.png') no-repeat;
    background-size: 100% 55%;
    background-position: bottom;
}
.content{
    width: 1324px;
    height: 750px;
    margin: auto;
    margin-top: 50px;
    border: 1px solid #121733;
    background: rgba(0,0,0,.5);
}
.confim_account{
    width: 90%;
    height: 60px;
    margin: auto;
    margin-top: 13px;
    border: 1px solid #2E2F35;
    background-color: #1A1922;
}
.confim_account img:first-child{
    width: 116px;
    height: 23px;
    margin-top: 18px;
    margin-left: 40px;
}
.confim_account img:last-child{
    width: 28px;
    height: 19px;
    margin-top: 22px;
    margin-left: 30px;
}
.confim_account_content{
    width: 80%;
    margin: auto;
    height: 600px;
    display: flex;
}
.confim_account_left,.confim_account_right{
    flex: 1;
    margin-top: 50px;
}
.confim_account_left div,.confim_account_right div{
    width: 100%;
    height: 80px;
    line-height: 80px;
    position: relative;
}
.confim_account_tag{
    display: inline-block;
    float: left;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    margin: auto;
}
.p1{
    font-size: 20px;
    color: #FFF;
    margin-left: 20px;
}
.confim_account_avtar div{
    display: inline-block;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin:0 47px;
}
.confim_account_avtar div img{
    width: 80px;
    height: 80px;
    border-radius: 50%;
}
.avatar_img{
    width: 80px;
    height: 80px;
    // position: absolute;
    border-radius: 50%;
    // top: 10px;
}
.p2{
    font-size: 20px;
    color: #485a8f;
    cursor: pointer;
}
.p2:hover{
    color: #0279fe;
}
.p3{
    margin:0 38px;
    color: #f0d38f;
}
</style>