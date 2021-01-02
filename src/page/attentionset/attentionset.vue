<template>
<div>
    <homeheader />
    <div class="home_top">
        <div class="inset">
            <div class="info_head">
                <div class="livegrouphead">
                    <img src="../../image/livegroup.png" alt="">
                    <span>请在下面选择您喜爱的圈子</span>
                </div>
            </div>
            <div class="livegroup">
                <el-row class="setlist">
                <el-button v-for="item in wpList" size="mini" :key="item.name" 
                :class="[{active : active == item.id},'changebtn']" 
                @click="selected(item.id)">{{item.name}}</el-button>
                </el-row>
                <div>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px">
                        <el-form-item label="" prop="footradio" v-for="(data,key,index) in checkboxList" :key="index">
                            <div class="column"><div v-if="data[0].ch_columnm_name">{{data[0].ch_columnm_name}}</div></div>
                            <el-checkbox-group v-model="ruleForm.footradio" @change="handleCheckedCitiesChange">
                            <el-checkbox :label="item.id" name="footradio" :checked="item.is_followed == '1' ? checker : nochecker" v-for="(item,index) in data" :key="index">
                                <!-- <img class="team" :src="item.ch_logo" alt=""> -->
                                {{item.ch_name}}
                            </el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item class="btnbox">
                            <el-button class="canclebtn" @click="resetForm('ruleForm')">取消</el-button>   
                            <el-button class="submitbtn" type="primary" @click="submitForm('ruleForm')" v-preventReClick>提交</el-button>                                    
                        </el-form-item>
                    </el-form>
                    <!-- <el-checkbox-group v-for="(data,index) in checkboxList" :key="index" v-model="checkedCities" @change="handleCheckedCitiesChange">
                        <el-checkbox :label="item.id"  v-for="item in data" :key="item.id">{{item.ch_name}}</el-checkbox>
                    </el-checkbox-group>
                    <el-button class="canclebtn" @click="resetForm('ruleForm')">取消</el-button>   
                    <el-button class="submitbtn" type="primary" @click="submitForm('ruleForm')">提交</el-button>   -->
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
const homeheader = () => import("@/components/home/homeheader");
const Footer = () => import("../../components/footer/footer");
export default {
    name:"attentionset",
    components:{
        homeheader,
        Footer
    },
    data(){
        return{
            wpList: [
                {
                    id:1,
                    name: '直播'
                },
                {
                    id:2,
                    name: '新闻'
                },
                {
                    id:3,
                    name: '社区'
                }
            ],
            active:'1',
            ruleForm:{
                footradio: [],
                basradio:[],
                otherradio:[]
            },
            rules:{

            },
            avator:require("@/image/news.jpeg"),
            checkboxList:{},
            imgurl:this.JuheHOST,
            checkedbox:[],
            checker:true,
            nochecker:false,
            //测试
            checkedCities:[]
        }
    },
    methods: {
        handleCheckedCitiesChange(value){
            // this.checkedCities = value;
            this.checkedbox = String(value);
            console.log(value);
        },
        selected(name){
            this.active = name;
            console.log(this.active);
            //清空其他页面已选项
            this.checkedbox = [];
            // console.log(this.checkedbox);
            //根据name获取其他类别
            this.getChanelList()
        },
        submitForm(ruleForm) {
            this.$api.editchanel.editerchanel({
                type:this.active,
                channel:this.checkedbox
            }).then(res => {
                // console.log(res);
                if (res.data.code == 1) {
                    this.$message({
                        type: 'error', // warning、success
                        message: res.data.msg 
                    }) 
                } else if (res.data.code == 0) {
                    this.$message({
                        type: 'success', // warning、success
                        message: '关注成功' 
                    })                            
                } else if (res.data.code == -1) {

                }
            })
            .catch(error => {
                this.$message("请检查关注项")
            })
        },
        resetForm(formName) {
            // this.$refs[formName].resetFields();
        },
        // 获取频道列表
        getChanelList(){
            let params = { type : this.active};
            this.$api.attchanelist.attchanel(
                params
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
                    this.ruleForm.footradio = res.data.params.user_followed_id;
                    this.checkboxList = res.data.params.channel;               
                } else if (res.data.code == -1) {
                    this.$message({
                        type: 'success', // warning、success
                        message: res.data.msg 
                    })
                    // this.$router.push('/');
                    window.location.href = this.JuheHOST
                }
            })
            .catch(error => {
                this.$message("获取失败");
            })
        }
    },
    mounted(){
        this.getChanelList();
    }
}
</script>

<style lang="less" scoped>
.home_top{
    width: 100%;
    height: 817px;
    /* z-index: 10; */
    font-family: 'SourceHanSansCN-Regular';
    overflow: auto;
    background: url('../../image/home_top.png') no-repeat;
    background-size: 100% 100%;
    background-position-y: 0px;
    .setlist{
        margin-bottom: 5px;
    }
    .changebtn{
        width: 100px;
        border-radius: 20px;
    }
    .team{
        width: 35px;
        height: 35px;
        position: relative;
        border-radius: 50%;
    }
}
.inset{
  width: 1500px;
  height: 750px;
  margin: auto;
  margin-top: 50px;
  border: 1px solid #121733;
  background: rgba(0,0,0,.3);
}
.info_head{
  width: 100%;
  height: 88px;
  font-size: 24px;
  position: relative;
}
.livegrouphead{
    width: 90%;
    height: 60px;
    line-height: 60px;
    font-size: 14px;
    color: #7c705f;
    margin: auto;
    margin-top: 13px;
    border: 1px solid #2E2F35;
    background-color: #1A1922;
}
.livegrouphead img{
    width: 116px;
    height: 23px;
    margin-top: 18px;
    margin-left: 40px;
}
.livegroup{
    width: 90%;
    margin: auto;
    background: rgba(0,0,0,.1);
}
.column{
    width: 100%;
    height: 28px;
    background:linear-gradient(to right,#1F212A,#20252F);
    opacity: 0.5;
    margin-bottom:10px;
    div{
        width: 100px;
        text-align: center;
        height: 28px;
        line-height: 28px;
        color: #D4BB80;
    }
}
.active {
   background: #014681 !important;
   border: 1px solid #014681 !important;
   color: #FFF !important;
 }
.active:focus {
   background: #014681 !important;
   border: 1px solid #014681 !important;
   color: #FFF !important;
 }
.btnbox{
    width: 50%;
    margin: auto;
    margin-top: 85px;
}
 .canclebtn{
    width: 200px;
    margin-left: 90px;
}
.submitbtn{
    width: 200px;
    margin-left: 90px;
}
/deep/.el-button {
  color: #818382;
  background-color: #0D1219;
  border: 1px solid #818382;
}
/deep/.el-button:hover{
  color: #7c705f;
  border: 1px solid #7c705f;
}
 /deep/.el-checkbox__label{
    line-height: 35px !important;
}
/deep/.el-form-item{
    margin-bottom: 10px;
}
</style>
