<template>
  <div id="home">
    <div class="head">
      <Homeheader />
    </div>
    <div class="public cl">
      <div class="person_home">
        <div class="info_set">
          <div class="line"></div>
          <p class="p_title1"><i class="el-icon-edit"></i>发帖</p>
          <p class="p_title2" @click="topublishvideo"><i class="el-icon-video-play"></i>发视频</p>     
          <el-button class="backbtn" @click="goback()">返回</el-button>
          <div class="chanel">
            <el-cascader
              placeholder="请选择社区发帖频道"
              v-model="value"
              :options="options"
              @change="handleChange"
            >
            </el-cascader>
          </div>

          <div class="editor_con">
            <input
              class="articletitle"
              type="text"
              maxlength="35"
              placeholder="请输入标题(最多35个字)"
              v-model="articletitle"
            />
            <hr />
            <div id="editor"></div>
            <div class="btn_con">
              <el-button class="cancler" type="info" plain @click="cancleHandler"
                >取消</el-button
              >
              <el-button
                class="submitbtn"
                type="primary"
                @click="getEditorData"
                v-preventReClick
                >提交</el-button
              >
            </div>

            <!-- <button type="button" class="btn" @click="getEditorData">获取当前内容</button>
                  <h3>内容预览</h3>
                  <div class="webviewtext" v-html='editorData'></div> -->
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
import wangEditor from "wangeditor";
import Homeheader from '../../components/home/homeheader.vue';
const Footer = () => import("../../components/footer/footer");
// const homeperson = () => import("./homeperson");
export default {
  name: "",
  components: {
    Homeheader,
    Footer
  },
  data() {
    return {
      menu_num: "1",
      headerKey: "",
      imgurl: this.JuheHOST,
      publishImgUrl: this.$api.upimg,
      publishImglist: [],
      articletitle: "",
      editor: null,
      editorData: "",
      value: [],
      options: [],
    };
  },
  mounted() {
    this.getChanelList();
    localStorage.setItem("editerUrl", this.imgurl);
    const editor = new wangEditor(`#editor`);
    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = (newHtml) => {
      this.editorData = newHtml;
      // console.log(this.editorData);
    };
    //配置编辑器高度
    editor.config.height = 600;
    //默认提示语
    editor.config.placeholder = "图片最多同时上传3张,请编辑帖子";

    //配置菜单
    editor.config.menus = [
      //'head',//标题
      "bold",
      //'fontSize',
      "fontName", //family
      ,
      "italic",
      "underline",
      "strikeThrough", //删除线
      "indent", //缩进
      //'lineHeight',
      "foreColor", //字体颜色
      //'backColor',
      "emoticon",
      "image",
      "link",
      "splitLine", //hr
      "undo", //后退
      "redo", //前进
    ];
    //配置字体
    editor.config.fontNames = [
      "黑体",
      "仿宋",
      "楷体",
      "标楷体",
      "华文仿宋",
      "华文楷体",
      "宋体",
      "微软雅黑",
    ];
    //评论框过滤粘贴的图片
    editor.config.pasteIgnoreImg = false;
    // 配置行高
    // editor.config.lineHeights = ['1', '1.15', '1.6', '2', '2.5', '3']
    editor.config.emotions = [
      {
        title: "emoji", // tab 的标题
        type: "emoji", // 'emoji' / 'image'
        // emoji 表情，content 是一个数组即可
        content: "😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😓 😪 😴 🙄 🤔 😬 🤐 😍 🥰 🤩 😘 😚 🤑 🤪 🤭 🤔 🤗 😡 😤 🤬 💀 👽 💩 😵 🤢 🤕 🤧 😭".split(
          /\s/
        ),
      },
      {
        title: "gesture", // tab 的标题
        type: "emoji", // 'emoji' / 'image'
        // emoji 表情，content 是一个数组即可
        content: "👋 🤚 🖐️ ✋ 🖖 👌 🤏 ✌️ 🤞 🤟 🤘 🤙 👈 👉 👆 🖕 👇 ☝️ 👍 👎 ✊ 👊 🤜 🤛 👏 🙌 👐 🤲 🤝 🙏 ✍️ 💅 🤳 💪 🦾 🦿 🦵 👁️ 👅 👀".split(
          /\s/
        ),
      },
      {
        title: "Symbols", // tab 的标题
        type: "emoji", // 'emoji' / 'image'
        // emoji 表情，content 是一个数组即可
        content: "🏧 🚮 ♿ 🚰 🚹 🚺 🚻 🛅 🛄 🛂 ⚠️ 🚸 ⛔ 🚫 🚳 🚭 🚯 🚱 🚷 📵 🔞 ☢️ ☣️ ♀️ ♂️ 🆚 ✔️ ❌ ➕ ➖ ✖️ ➗ 〽️ ✳️ ✴️ ‼️ ⁉️ ❓ ❗".split(
          /\s/
        ),
      },
    ];
    // 配置全屏功能按钮是否展示
    editor.config.showFullScreen = false;
    // 配置粘贴文本的内容处理
    editor.config.pasteTextHandle = function (pasteStr) {
      // 对粘贴的文本进行处理，然后返回处理后的结果
      return pasteStr + "-6789直播";
    };
    //上传限制3张
    editor.config.uploadImgMaxLength = 3;
    // 配置上传图片 server 接口地址
    editor.config.uploadImgServer = this.publishImgUrl;
    //header携带token
    editor.config.uploadImgHeaders = {
      token: localStorage.getItem("token"),
    };
    editor.config.uploadFileName = "file[]";
    //取消网络图片上传
    editor.config.showLinkImg = false;
    //图片上传操作钩子函数
    let that = this;
    editor.config.uploadImgHooks = {
      // 上传图片之前
      before: function (xhr) {
        // console.log(xhr)
        // 可阻止图片上传
        // return {
        //     prevent: true,
        //     msg: '需要提示给用户的错误信息'
        // }
      },
      // 图片上传并返回了结果，图片插入已成功
      success: function (xhr) {
        console.log("success", xhr);
      },
      // 图片上传并返回了结果，但图片插入时出错了
      fail: function (xhr, editor, resData) {
        // console.log(resData);
        this.publishImglist = resData.data;
        // console.log(this.publishImglist);
        //存入本地
        localStorage.setItem(
          "publishImglist",
          JSON.stringify(this.publishImglist)
        );
        that.$message({
          type: "success", // warning、success
          message: "上传成功",
        });
      },
      // 上传图片出错，一般为 http 请求的错误
      error: function (xhr, editor, resData) {
        console.log("error", xhr, resData);
      },
      // 上传图片超时
      timeout: function (xhr) {
        console.log("timeout");
      },
      // 图片上传并返回了结果，想要自己把图片插入到编辑器中
      // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
      customInsert: function (insertImgFn, result) {
        // result 即服务端返回的接口
        let url = localStorage.getItem("editerUrl");
        console.log(url, result);
        // let newImg = result.data.map(item => item = url + item);
        // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
        // console.log(newImg);
        // newImg.forEach(item => insertImgFn(item))
        result.data.forEach((item) => insertImgFn(item));
      },
    };
    // 创建编辑器
    editor.create();
    this.editor = editor;
  },
  methods: {
    getEditorData() {
      // 通过代码获取编辑器内容
      if (this.articletitle && this.value[1]) {
        let data = this.editor.txt.html();
        this.$api.publish
          .publishPost({
            forum_title: this.$inHTMLData(this.articletitle),
            channel: this.value[1],
            body: data,
          })
          .then((res) => {
            console.log(res);
            if (res.data.code == 1) {
              this.$message({
                type: "error", // warning、success
                message: res.data.msg,
              });
            } else if (res.data.code == 0) {
              this.$message({
                type: "success", // warning、success
                message: "发布成功",
              });
              //清空编辑器
              this.editor.txt.clear();
              this.articletitle = "";
            } else if (res.data.code == -1) {
              this.$message({
                type: "warning", // warning、success
                message: res.data.msg,
              });
              this.$router.push("/");
            }
          })
          .catch((error) => {
            this.$message("未知错误");
          });
      } else {
        this.$message({
          type: "warning", // warning、success
          message: "频道和标题不能为空",
        });
      }
    },
    topublishvideo(){
      this.$router.push('/publishvideo')
    },
    cancleHandler() {
      this.editor.txt.clear();
    },
    parentEvent(data) {
      this.menu_num = data;
    },
    handleChange(value) {
      console.log(value);
    },
    // 获取频道列表
    getChanelList() {
      let params = { type: this.active };
      this.$api.getformatechanel
        .getChanel()
        .then((res) => {
          console.log(res);
          if (res.data.code == 1) {
            this.$message({
              type: "error", // warning、success
              message: res.data.msg,
            });
          } else if (res.data.code == 0) {
            // this.options = res.data.params;
            for (let i in res.data.params[2].children) {
              this.options.push(res.data.params[2].children[i]);
            }
          } else if (res.data.code == -1) {
            this.$message({
              type: "success", // warning、success
              message: "身份验证过期，请重新登录",
            });
            this.$router.push("/");
          }
        })
        .catch((error) => {
          this.$message("获取失败");
        });
    },
    goback() {
      this.$router.go(-1);
    },
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy();
    this.editor = null;
  },
};
</script>
<style lang="less" scoped>
#home {
  width: 100%;
  height: 100%;
  // background-image: url("../../image/bj.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow: scroll;
}
.public {
  width: 100%;
    // height: 100%;
    // height: 899px;
    /* z-index: 10; */
    font-family: 'SourceHanSansCN-Regular';
    overflow: auto;
    background: url('../../image/home_top.png') no-repeat;
    background-size: 100% 899px;
    position: relative;
  .info_set {
    width: 1273px;
    margin: auto;
    margin-top: 150px;
    // height: 800px;
    background-color: #fff;
    // padding: 13px 13px 0;
    padding-top: 13px;
    box-shadow: 0 3px 3px 3px #dbdbdb;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    box-sizing: border-box;
    .chanel {
      width: 1012px;
      margin: auto;
      margin-top: 50px;
    }
    .line {
      width: 200px;
      height: 2px;
      margin: auto;
      margin-top: 20px;
      margin-bottom: 10px;
      background-color: #474747;
      box-sizing: border-box;
    }
    .p_title1 {
      width: 80px;
      margin-left: 130px;
      color: #014681;
      font-size: 18px;
      height: 20px;
      border-left: 5px solid #014681;
      float: left;
      text-align: left;
      line-height: 20px;
      padding: 0 10px;
      font-weight: 600;
      position: relative;
      cursor: pointer;
    }
    .p_title2:hover{
        color: #014681;
    }
    .p_title2{
      width: 80px;
      margin-left: 20px;
      color: #828282;
      cursor: pointer;
      font-size: 18px;
      height: 20px;
      float: left;
      text-align: center;
      line-height: 20px;
      padding: 0 10px;
      font-weight: 600;
      position: relative;
    }
    .editor_con {
      width: 1012px;
      margin: auto;
      padding-bottom: 100px;
      margin-top: 20px;
      position: relative;
      z-index: 10;
      #editor {
        width: 1012px;
        resize: vertical;
        font-size: 14px;
        border-top-right-radius: 5px !important;
        border-top-left-radius: 5px;
      }
      .articletitle {
        width: 100%;
        padding: 1px 2px;
        border: none;
      }
      .btn_con {
        position: absolute;
        right: 0;
        .cancler,
        .submitbtn {
          width: 100px;
          border-radius: 10px;
          color: #fff;
          margin-top: 10px;
        }
        .submitbtn {
          background-color: #1a90fc;
        }
        .cancler {
          background-color: #c5c5c5;
        }
        .submitbtn:hover {
          background-color: #58a5ec;
        }
      }
    }
  }
  .person_home{
    width: 1500px;
    margin: auto;
    margin-top: 20px;
  }
}
.backbtn {
  position: absolute;
  top: 180px;
  right: 350px;
}
/deep/.el-checkbox__label {
  line-height: 35px !important;
}
/deep/.w-e-menu .w-e-panel-container {
  width: 600px !important;
  margin-left: 0 !important;
}
/deep/.w-e-menu .w-e-panel-container .w-e-panel-tab-content {
  width: 600px !important;
  height: 200px !important;
}
.w-e-text-container {
  /* resize: vertical !important; */
  height: 197px !important;
}
.w-e-toolbar {
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
</style>
<style>
</style>