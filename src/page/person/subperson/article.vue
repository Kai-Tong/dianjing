<template>
    <div class="article cl">
        <el-button class="publish" type="primary" icon="el-icon-edit" @click="toPublish">发帖</el-button>
        <div class="article_box">
            <div class="article_info" v-for="(item,index) in articleList" :key="index" @click="toPostDetail(item)">
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
            </div>
            <!-- <div class="article_info">
                <div class="article_info_title">
                    <img class="bisai_list_tag" src="../../../image/ic2x.png" alt="">
                    <p class="article_title">{{articleTwo.forum_title}}</p>
                    <p class="article_time">{{articleTwo.addtime_format}}</p>
                    <p class="article_look"><i class="el-icon-view"></i>{{articleTwo.forum_views}}</p>
                    <p class="article_read"><i class="el-icon-chat-dot-square"></i>{{articleTwo.forum_comments}}</p>
                </div>
                <div class="article_con" v-html="articleTwo.forum_body">

                </div>
                <div class="article_img">
                    <img :src="item" alt="" v-for="(item,index) in imgListTwo" :key="index">
                </div>
            </div> -->
            <div class="showmore" v-if="articleList.length > 0" @click="showMore"><i class="el-icon-d-arrow-right more"></i></div>
        </div>
        
        <el-backtop target="body #home"></el-backtop>
    </div>
</template>
<script>

export default {
    name:"",
    components:{
        
    },
    data(){
        return{
            uid:0,
            // articleOne: {},
            // imgListOne:[],
            // articleTwo: {},
            // imgListTwo:[],
            articleList:[],
            contactList:[],
            p:1,
            total:'',
            pageSize:'',
        }
    },
    methods:{
        toPostDetail(item){
            // console.log(this.JuheHOST+ '/forum/' + item.ch_columnm_key + '/' + item.ch_key + '/' + item.id + '.html');
            window.location.href = this.JuheHOST+ '/forum/' + item.ch_columnm_key + '/' + item.ch_key + '/' + item.id + '.html'
        },
         toPublish(){
             this.$router.push('/publish')
         },
         //新的帖子
        getaAticle(){
            let params = {
                p:this.p,
             }
            this.$axios({
                url:`${this.$api.myprofile}/${this.$route.params.user_uid}`,
                method: "get",
                params:params,
                timeout: 3000
            })
            .then(res => {
                // console.log(res);
                if (res.data.code == 1) {
                    // this.$message({
                    //     type: 'error', // warning、success
                    //     message: res.data.msg 
                    // }) 
                } else if (res.data.code == 0) {
                    this.total = res.data.params.pagination.total;
                    this.pageSize = res.data.params.pagination.page_size;
                    let receiveList = res.data.params.my_forum;
                    if (this.p == 1) {
                        this.contactList = res.data.params.my_forum;
                        console.log(this.contactList);
                         for(var i in receiveList){
                            // console.log(res.data.params.my_forum[i]);
                            let dataList = [];
                            dataList[i] = [];
                            receiveList[i].forum_body.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, function (match, capture) {                           
                                return dataList[i].push(capture);
                            })
                            this.$set(receiveList[i],'imgList',
                                dataList[i].slice(-4)
                            )
                            receiveList[i].forum_body = receiveList[i].forum_body.replace(/<[^>]+>/g, '')
                        }
                        this.articleList = receiveList;
                    } else {
                        let oldarticlelist = this.contactList;
                        for(var i in receiveList){
                            let dataList = [];
                            dataList[i] = [];
                            receiveList[i].forum_body.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, function (match, capture) {                           
                                return dataList[i].push(capture);
                            })
                            this.$set(receiveList[i],'imgList',
                                dataList[i].slice(-4)
                            )
                            receiveList[i].forum_body = receiveList[i].forum_body.replace(/<[^>]+>/g, '')
                        }
                        let list = oldarticlelist.concat(receiveList);
                        // console.log(list);
                        this.articleList = list;
                    }
                } else if (res.data.code == -1) {
                    // this.$message({
                    //     type: 'success', // warning、success
                    //     message: res.data.msg 
                    // })
                    // this.$router.push("/")
                    window.location.href = this.JuheHOST 
                }
            })
            .catch(error => {
                console.log(error);
            });
        },
        showMore(){
            this.p ++;
            if(this.p <= Math.ceil(this.total/this.pageSize)){
                this.getaAticle();
            }else{
                this.$message({
                    type: 'warning', // warning、success
                    message: '没有更多了！' 
                })
            }
        },
        gotopostdetails(item){//跳转贴子详情页面
            this.$store.commit('postdel',item);
            this.$router.push({
                name: "Postdetails",
                params: { id: `${item.forum_id}` },
            });
        },
    },
    mounted() {
        this.getaAticle();
        console.log(this.$route.params.user_uid);
    }
}
</script>
<style lang="less" scoped>
.article{
    width: 1039px;
    margin: auto;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
}
.publish{
    position: absolute;
    top: 16px;
    right: 20px;
    background: rgba(0,0,0,.5);
    border: 1px solid #7A8DEC;
}
.publish:hover{
    color: #7A8DEC;
}
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
.showmore{
    text-align: center;
    height: 50px;
    color: #FFF;
    line-height: 50px;
    font-size: 25px;
    .more{
        font-weight: 600;
        transform: rotate(90deg);
    }
}
</style>
