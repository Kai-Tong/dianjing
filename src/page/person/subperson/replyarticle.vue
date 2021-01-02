<template>
  <div class="replyarticle">
      <div class="replyarticle_con" v-for="(item,index) in commentlist" :key="index">
          <div class="replyarticle_con_head"><div>{{item.c_addtime}}</div><div><img src="../../../image/like.png" alt="">{{item.c_good_count	}}</div></div>
          <div class="my_com">{{item.c_body}}</div>
          <!-- <div class="my_com_reply">
              <div><div class="repply_person"><img src="" alt="">评论人回复：</div>是叫偶分大家佛大家发票登记</div>
              <div><div class="repply_person"><img src="" alt="">评论人回复：</div>漏电开关理科高考高考</div>
              <div><div class="repply_person"><img src="" alt="">评论人回复：</div>哦加哦就了大家佛的那份付款的活佛而分配开发苹果键盘</div>
          </div> -->
          <div class="from_post"><span class="from_post_prefix">来自帖子：</span>{{item.forum_title}}</div>
      </div>
      <div v-if="commentlist.length == 0"  style="color:#FFF;margin:20px 0">暂无数据</div>
  </div>
</template>

<script>
export default {
    name:"replyarticle",
    data(){
        return{
            commentlist:[]
        }
    },
    methods:{
        //时间转换
        dateFormat(date) {
            var date = new Date(date * 1000);
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            return Y + M + D + h + m + s;
        },
        getCommentList(){
            this.$axios({
                url:`${this.$api.commentlist}/${this.$route.params.user_uid}`,
                method: "get",
                timeout: 3000
            })
            .then(res => {
                console.log(res);
                if (res.data.code == 1) {
                    this.$message({
                        type: 'error', // warning、success
                        message: res.data.msg 
                    }) 
                } else if (res.data.code == 0) {
                    for(var index in res.data.params){
                        res.data.params[index].c_addtime = this.dateFormat(res.data.params[index].c_addtime)
                    }
                    this.commentlist = res.data.params;
                } else if (res.data.code == -1) {
                    this.$message({
                        type: 'success', // warning、success
                        message: '身份验证过期，请重新登录' 
                    })
                    this.$router.push("/") 
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
    },
    mounted(){
        this.getCommentList()
    }
}
</script>

<style lang="less" scoped>
.replyarticle{
    width: 1039px;
    margin: auto;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
}
.replyarticle_con{
    width: 95%;
    margin: auto;
    margin-top: 17px;
    border-top: 1px solid #1D3748;
}
.replyarticle_con_head{
    width: 100%;
    height: 21px;
    font-size: 14px;
    margin-top: 17px;
}
.replyarticle_con_head div:first-child{
    width: 500px;
    height: 21px;
    line-height: 21px;
    text-align: left;
    color: #828282;
    float: left;
    margin-left: 31px ;
}
.replyarticle_con_head div:last-child{
    width: 100px;
    height: 21px;
    line-height: 21px;
    text-align: right;
    color: #404B7F;
    float: right;
    margin-right: 31px ;
    img{
        width: 21px;
        height: 21px;
        margin-right: 6px;
    }
}
.my_com{
    width: 70%;
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    color: #8096fe;
    margin-left: 31px ;
    text-align: left;
    margin-top: 12px;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
}
.my_com_reply{
    width: 100%;
}
.my_com_reply>div{
    width: fit-content;
    padding: 0 20px;
    box-sizing: border-box;
    border-radius: 20px;
    height: 42px;
    line-height: 42px;
    color: #828282;
    background-color: #151C28;
    font-size: 16px;
    text-align: left;
    margin-left: 45px;
    margin-top: 10px;
    position: relative;
}
.repply_person{
    width: auto;
    height: 30px;
    display: inline-block;
    color: #FFF;
}
.repply_person img{
    width: 30px;
    height: 30px;
    margin-top: 6px ;
}
.from_post{
    width: 70%;
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    color: #FFF;
    margin-left: 31px ;
    text-align: left;
    margin-top: 12px;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
}
.from_post_prefix{
    color: #828282;
}
</style>