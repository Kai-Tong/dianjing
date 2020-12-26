<template>
  <div class="footer">
            <div class="footerLeft">
                <div class="footerNav1">
                    <a href="">
                        <div class="yxlm">
    
                        </div>
                    </a>
                    <div class="fenge1">
    
                    </div>
                    <a href="">
                        <div class="wzry">
    
                        </div>
                    </a>
                    <div class="fenge2">
    
                    </div>
                    <a href="">
                        <div class="csgo">
    
                        </div>
                    </a>
                    <div class="fenge3">
    
                    </div>
                    <a href="">
                        <div class="dota2">
    
                        </div>
                    </a>
                    <div class="fenge4">
    
                    </div>
                    <a href="">
                        <div class="jdqs">
    
                        </div>
                    </a>
                </div>
                <div class="guanyume">
                    <div class="guanyume_span">
                        <a href="">
                            关于我们
                        </a>
                    </div>
                    <div class="guanyume_span">
                        <a href="">
                            联系我们
                        </a>
                    </div>
                    <div class="guanyume_span">
                        <a href="">
                            用户协议
                        </a>
                    </div>
                </div>
                <div class="xinxi xinxi1">
                    PC电竞，专业的电竞娱乐资讯平台，仅为荣耀，一往无前向前冲！PC电竞，专业的电竞娱乐资讯平台，仅为荣耀，一往无前
                </div>
                <div class="xinxi ">
                    Copyright©1998-2020 Tencent.All Rights Reserved
                </div>
                <div class="xinxi xinxi2">
                    版权所有
                </div>
                <div class="iosDown">
                    <img src="" alt="">
                    <div class="downspan">
                        IOS下载
                    </div>
                </div>
                <div class="andDown">
                    <img src="" alt="">
                    <div class="downspan">
                        Android下载
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.footer {
    background-image: url('../../image/footer-bg@2x.png');
    background-size: 100%;
}

.footerLeft {
    padding-top: 47px;
    position: relative;
}

.footerRight {}

.footerNav1 {
    display: flex;
    align-items: center;
    justify-content: center;

}

.fenge1,
.fenge2,
.fenge3,
.fenge4 {
    // background-image: url('../../../image/footer-分割@2x.png');
    background-size: 100%;
    background-repeat: no-repeat;
    width: 2px;
    height: 33px;
    margin: 0 34px 0 31px;
}

.fenge2 {
    margin: 0 35px 0 34px;
}

.fenge3 {
    margin: 0 35px 0 34px;
}

.fenge4 {

    margin: 0 32px 0 30px;
}

.yxlm {
    background-image: url('../../image/11@2x.png');
    background-size: 100%;
    background-repeat: no-repeat;
    width: 88px;
    height: 35px;
    /* margin-top: 0.06rem; */
}

.wzry {
    background-image: url('../../image/22@2x.png');
    background-size: 100%;
    background-repeat: no-repeat;
    width: 77px;
    height: 57px;
}

.csgo {
    background-image: url('../../image/33@2x.png');
    background-size: 100%;
    background-repeat: no-repeat;
    width: 83px;
    height: 36px;
    /* margin-top: 0.02rem; */
}

.dota2 {
    background-image: url('../../image/44@2x.png');
    background-size: 100%;
    background-repeat: no-repeat;
    width: 106px;
    height: 22px;
}

.jdqs {
    background-image: url('../../image/55@2x.png');
    background-size: 100%;
    background-repeat: no-repeat;
    width: 81px;
    height: 31px;
    margin-top: 1px;
}

.guanyume {
    display: flex;
    justify-content: center;
    margin-top: 32px;
}

.guanyume_span a {
    color: #3d5579;
    font-size: 16px;
    margin: 0 2.15px;
}

.guanyume_span a:hover {
    color: #0279fe;
}

.xinxi {
    color: #828282;
    font-size: 16px;
    text-align: center;
}

.xinxi1 {
    margin: 33px 0 19px 0;
}

.xinxi2 {
    margin: 10px 0 0;
}

.iosDown {
    position: absolute;
    right: 368px;
    top: 60px;
    color: #0279fe;
    text-align: center;
    font-size: 16px;
}

.iosDown img,.andDown img {
    width: 92px;
    height: 92px;
}

.downspan {
    margin-top: 10px;
}

.andDown {
    position: absolute;
    right: 231px;
    top: 60px;
    color: #0279fe;
    text-align: center;
    font-size: 16px;
}
</style>