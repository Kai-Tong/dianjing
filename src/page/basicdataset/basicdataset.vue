<template>
<div>
    <homeheader />
    <div class="home_top">
        <div class="content">
            <div class="set_left">
                <basicdata />
            </div>
           <div class="set_right">
               <privacyset />
           </div>
        </div>
    </div>
    <div class="margin50">
      <Footer></Footer>
    </div>
</div>
</template>

<script>
const homeheader = () => import("../../components/home/homeheader");
const Footer = () => import("../../components/footer/footer");
const basicdata = () => import("@/page/settings/subsetting/basicdata");
const privacyset = () => import("@/page/settings/subsetting/privacyset");
import { mapState ,mapMutations } from "vuex";
export default {
    name:"Accountinfo",
    components:{
        homeheader,
        Footer,
        basicdata,
        privacyset
    },
    data(){
        return{
            
        }
    },
    methods:{
        
    },
    computed: {
        
    },
    mounted(){
        
    }
}   
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
    width: 1324px;
    height: 750px;
    margin: auto;
    margin-top: 50px;
    border: 1px solid #121733;
    background: rgba(0,0,0,.5);
}
.set_left{
    width: 49%;
    height: 70%;
    float: left;
    margin-top: 50px;
    border-right: 1px solid #435280;
}
.set_right{
    width: 49%;
    height: 70%;
    margin-top: 50px;
    float: right;
}
</style>