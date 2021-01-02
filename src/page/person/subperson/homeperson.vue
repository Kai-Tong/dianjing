<template>
    <div class="person_basic">
        <div class="person_material">
            <!-- <span @click="See()">360全景看房</span> -->
            <div>发帖：{{postnum}}</div>
            <div>关注：{{profile.user_follow_num}}</div>
            <div>粉丝：{{profile.user_fans_num}}</div>
        </div>
        <div class="active_state">
            <div class="active_state_title"><img class="bisai_list_tag" src="../../../image/ic2x.png" alt=""><span>活跃概况：</span></div>
            <div class="active_state_left">
                <p>注册时间：{{profile.user_logintime}}</p>
                <p>注册IP：{{profile.user_reg_ip}}</p>
            </div>
            <div class="active_state_right">
                <p>最后访问时间：{{nowdate}}</p>
                <p>最后访问IP：{{profile.user_login_ip}}</p>
            </div>
        </div>
        <div class="person_info">
            <div class="active_state_title"><img class="bisai_list_tag" src="../../../image/ic2x.png" alt=""><span>个人信息：</span></div>
            <div class="person_info_left">
                <p>生日：{{profile.user_birthday}}</p>
                <p>星座：{{constellation}}</p>
                <p>爱好：{{profile.user_hobby}}</p>
            </div>
            <div class="person_info_right">
                <p>性别：{{profile.user_sex ==1 ? '男' : '女'}}</p>
                <p>地区：{{profile.user_location}}</p>
            </div>
        </div>
        <el-backtop target="body #home"></el-backtop>
    </div>
</template>
<script>
export default {
    name:"",
    data(){
        return{
            uid:0,
            articleList: [],
            reverse:true,
            profile:{},
            postnum:'',
            nowdate:''
        }
    },
    methods:{
        //测试跳转第三方
        See(){
            window.location.href = "http://kanketiyu.com/news/lanqiu/nba/60.html"
        },
        //时间转换
        dateFormat(dateData) {
            var date = new Date(dateData)
            var y = date.getFullYear()
            var m = date.getMonth() + 1
            m = m < 10 ? ('0' + m) : m
            var d = date.getDate()
            d = d < 10 ? ('0' + d) : d
            const time = y + '-' + m + '-' + d
            return time
        },
        //时间戳转换
        //时间转换
        dateFormat2(date) {
            var date = new Date(date * 1000);
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            return Y + M + D + h + m + s;
        },
        dateFormat3() {
            var date = new Date();
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            return Y + M + D + h + m + s;
        },
        //星座函数
        getAstro(strBirthday){
            let birthYear,birthMonth,birthDay; 
            let strBirthdayArr=strBirthday.split("-");
            // console.log(strBirthdayArr);
            if (strBirthdayArr.length>0 && this.profile.user_birthday) {
                birthYear = strBirthdayArr[0];  
                birthMonth = strBirthdayArr[1];  
                birthDay = strBirthdayArr[2];  
            }else{
                return;
            }
            let s="魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
            let arr=[20,19,21,21,21,22,23,23,23,23,22,22];
            return s.substr(birthMonth*2-(birthDay< arr[birthMonth-1]?2:0),2);//12  21
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
                    this.$message({
                        type: 'error', // warning、success
                        message: res.data.msg 
                    })
                } else if (res.data.code == 0) {
                    res.data.params.profile.user_logintime = this.dateFormat2(res.data.params.profile.user_logintime)
                    this.profile = res.data.params.profile;
                    this.postnum = res.data.params.pagination.total;
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
        toArticle(){
            this.$router.push('/person/article')
        }
    },
    computed:{
        constellation(){
            return this.getAstro(this.dateFormat(this.profile.user_birthday));
        }
    },
    mounted(){
        this.getInfo()
        console.log(this.$route.params.user_uid);
        this.nowdate = this.dateFormat3();
        // this.$router.go(0)
    }
}
</script>
<style lang="less" scoped>
.person_basic{
    position: relative;
    overflow: hidden;
}
.person_material{
    width: 400px;
    height: 60px;
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
}
.person_material div{
    flex: 1;
    height: 60px;
    line-height: 60px;
    color: #fefdfd;
    font-size: 18px;
}
.active_state{
    width: 1039px;
    height: 170px;
    margin: auto;
    margin-top: 60px;
    border-radius: 5px;
    border: 1px solid #1D3748;
}
.person_info{
    width: 1039px;
    height: 210px;
    margin: auto;
    margin-top: 20px;
    border-radius: 5px;
    border: 1px solid #1D3748;
}
.active_state_title{
    width: 100%;
    height: 56px;
    line-height: 56px;
    color: #fffffe;
    font-size: 20px;
    text-align: left;
    padding-left: 65px;
    float: left;
    position: relative;
}
.bisai_list_tag {
    width: 12px;
    height: 12px;
    display: inline-block;
    float: left;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 48px;
    margin: auto;
}
.active_state_left,.active_state_right{
    width: 50%;
    height: 100px;
    color: #828282;
    font-size: 20px;
    text-align: left;
    float: left;
}
.active_state_left{
    border-right: 1px solid #1D3748;
    box-sizing: border-box;
}
.active_state_left p{
    height: 50px;
    padding-left: 65px;
}
.active_state_right p{
    height: 50px;
    padding-left: 41px;
}
.person_info_left,.person_info_right{
    width: 50%;
    height: 140px;
    color: #828282;
    font-size: 20px;
    text-align: left;
    float: left;
}
.person_info_left{
    border-right: 1px solid #1D3748;
    box-sizing: border-box;
}
.person_info_left p{
    height: 50px;
    padding-left: 65px;
}
.person_info_right p{
    height: 50px;
    padding-left: 41px;
}
</style>
