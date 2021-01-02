<template>
    <div class="attention">
        <!-- <div class="attention_nav">
            <div class="nav_c">按类型查看：</div>
            <ul>
                <li v-for="item in attention_nav" 
                    :key="item.name" 
                    :class="{'active' : active == item.name}"
                    @click="selected(item.name)"
                >{{item.name}}</li>
            </ul>
        </div> -->
        <div class="attention_list" v-if="user_head">
            <div class="attenhead" v-for="(item,index) in attentionData" :key="index">
                    <img :src="item.user_pic" alt="" @click="goPerson(item.id)">
                    <div class="sign">{{item.user_name}}</div>
                    <el-button class="attenbtn" size="mini" @click="cancleAttention(item.id)" v-if="isme">取消关注</el-button>
            </div>
        </div>
        <!-- <div class="article_info" v-for="(item,index) in articleList" :key="index">
            <div class="article_info_title">
                <img class="bisai_list_tag" src="../../../image/ic2x.png" alt="">
                <p class="article_title">{{item.forum_title}}</p>
                <p class="article_time">{{item.addtime_format}}</p>
                <p class="article_look"><i class="el-icon-view"></i>{{item.forum_views}}</p>
                <p class="article_read"><i class="el-icon-chat-dot-square"></i>{{item.forum_comments}}</p>
            </div>
            <div class="article_con" v-html="item.forum_body">
                
            </div>
            <div class="article_img">
                <img :src="imgsrc" alt="" v-for="(imgsrc,index) in item.imgList" :key="index">
            </div>
        </div> -->
        <div class="noarticle" v-if="attentionData.length == 0">
            暂未关注
        </div>
    </div>
</template>
<script>
export default {
    name:"",
    data(){
        return{
            attention_nav:[
                {
                    name:'全部'
                },
                {
                    name:'资讯'
                },
                {
                    name:'用户'
                },
                {
                    name:'帖子'
                },
            ],
            active:'全部',
            user_head:true,
            articleList:[],
            uid:localStorage.getItem("user_uid"),
            isme:'',
            attentionData:[]
        }
    },
    methods:{
        selected(name){
            console.log(name);
            this.active = name;
            if(name == '帖子'){
                this.user_head = false
            }
        },
        cancleAttention(i){
            let id = i;
            this.$axios({
                url:`${this.$api.httppost.follow()}/2/${id}`,
                method: "post",
                data: {
                    uid: this.uid,
                    type: 2,
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
                            message: res.data.msg 
                        })
                        this.getAttention()              
                    } else if (res.data.code == -1) {
                        this.$message({
                            type: 'success', // warning、success
                            message: res.data.msg 
                        })
                        window.location.href = this.JuheHOST
                    }
            })
            .catch(error => {
                console.log(error);
            });
        },
        getAttention(){
            this.$axios({
                url:`${this.$api.followfans}/${this.$route.params.user_uid}/1`,
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
                    this.attentionData = res.data.params.follow_fans;
                } else if (res.data.code == -1) {
                    this.$message({
                        type: 'success', // warning、success
                        message: res.data.msg 
                    })
                    window.location.href = this.JuheHOST
                }
            })
            .catch(error => {
                console.log(error);
            });
        },
        //获取关注的帖子列表
        getaAticle(){
            this.$axios({
                url:`${this.$api.myprofile}/${this.$route.params.user_uid}`,
                method: "get",
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
                    for(var i in res.data.params.my_forum){
                        let dataList = [];
                        dataList[i] = [];
                        res.data.params.my_forum[i].forum_body.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, function (match, capture) {                           
                            return dataList[i].push(capture);
                        })
                        this.$set(res.data.params.my_forum[i],'imgList',
                            dataList[i].slice(-4)
                        )
                        res.data.params.my_forum[i].forum_body = res.data.params.my_forum[i].forum_body.replace(/<[^>]+>/g, '')
                    }
                    this.articleList = res.data.params.my_forum;
                } else if (res.data.code == -1) {
                    // this.$message({
                    //     type: 'success', // warning、success
                    //     message: res.data.msg 
                    // })
                    window.location.href = this.JuheHOST
                }
            })
            .catch(error => {
                console.log(error);
            });
        },
        //查看关注人个人中心
        goPerson(value) {
            this.$router.push({ name: "person", params: { user_uid: value } });
        },
    },
    mounted(){
        this.getAttention();
        this.getaAticle();
        console.log(this.$route.params.user_uid);
        if(this.$route.params.user_uid != localStorage.getItem("user_uid")){
            this.isme = false
        }else{
            this.isme = true
        }
    }

}
</script>
<style lang="less" scoped>
.attention{
    width: 1039px;
    margin: auto;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    .attention_nav{
        width: 1039px;
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        color: #FFF;
        margin: auto;
        .nav_c{
            width: 100px;
            height: 30px;
            float: left;
        }
        ul{
            width: 400px;
            height: 30px;
            li{
                width: 40px;
                height: 30px;
                float: left;
                margin: 0 12px;
                cursor: pointer;
            }
            span{
               float: left; 
            }
        }
    }
    .attention_list{
        width: 939px;
        margin: auto;
        margin-top: 40px;
        .attenhead{
            width: 100px;
            height: 150px;
            float: left;
            margin-right: 33px;
            img{
                width: 60px;
                height: 60px;
                border-radius: 50%;
            }
            .sign{
                font-size: 18px;
                color: #FFF;
                margin: 12px 0;
                white-space:nowrap;
                overflow:hidden;
                text-overflow:ellipsis;
            }
            .attenbtn{
                border-radius: 4px;
                background-color: #1C1F2A;
                border: 1px solid #828282;
            }
            .attenbtn:hover{
                color: #F0D390;
            }
        }
    }
    
}
.active {
//    background: #f0d39c;
   border-bottom: 3px solid #fd7522;
   color: #f0d39c;
 }
.noarticle{
    text-align: center;
    height: 200px;
    line-height: 100px;
    color: #848484;
}
//帖子样式
.article_box{
    margin-top: 60px;
}
.article_info{
    width: 100%;
    overflow: hidden;
}
.article_info_title{
    width: 100%;
    height: 56px;
    line-height: 56px;
    color: #fffffe;
    font-size: 20px;
    text-align: left;
    padding-left: 50px;
    float: left;
    position: relative;
    border-bottom: 1px solid #1D3748;
}
.bisai_list_tag {
    width: 12px;
    height: 12px;
    display: inline-block;
    float: left;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 31px;
    margin: auto;
}
.article_info_title p{
    display: inline-block;
    float: left;
}
.article_title{
    width: 400px;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
}
.article_time{
    color: #828282;
    font-size: 16px;
}
.article_look{
    margin-left: 290px;
    color: #404B7F;
}
.article_read{
    margin-left: 35px;
    color: #404B7F;
}
.article_img{
    width: 910px;
    margin: auto;
}
.article_img img{
    width: 180px;
    height: 110px;
    float: left;
    border-radius: 5px;
    margin-right: 60px;
}
.article_img img:last-child{
    margin-right: 0;
}
.article_con{
    color: #828282;
    padding: 0 40px;
    margin: 5px 0;
    text-align: left;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
i{
    margin-right: 8px;
}
</style>