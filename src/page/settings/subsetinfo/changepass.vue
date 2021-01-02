<template>
  <div class="changepass">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="原密码" prop="oldpass">
          <el-input type="password" show-password v-model="ruleForm.oldpass" placeholder="请输入原密码" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" show-password v-model="ruleForm.pass" placeholder="密码应是6-20位数字、字母或字符！" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" show-password v-model="ruleForm.checkPass" placeholder="再次输入密码" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="canclebtn" @click="resetForm('ruleForm')">取消</el-button>   
          <el-button class="submitbtn" @click="submitForm('ruleForm')" v-preventReClick>提交</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
    name:"changepass",
    data(){
      // let reg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{6,12}$/;
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
      var validateoldPass = (rule, value, callback) => {
        if(value == ''){
          callback(new Error('请输入密码'))
        }else{
          if (!reg.test(value)) {
            callback(new Error('密码应是6-20位数字、字母或字符！'))
          } else{
            callback()
          }
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          oldpass:'',
          pass: '',
          checkPass: ''
        },
        rules: {
          oldpass:[
            { validator: validateoldPass, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
    },
    methods:{
      //base64转码
      encode(str){
        return  str == null ? null : btoa(encodeURIComponent(str));
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$api.setpassword.setPwd({
                new_pwd:this.$inHTMLData(this.encode(this.ruleForm.pass)),
                old_pwd:this.$inHTMLData(this.encode(this.ruleForm.oldpass))
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
                        message: '修改成功' 
                    })
                    this.$refs[formName].resetFields();                            
                } else if (res.data.code == -1) {
                    this.$message({
                        type: 'warning', // warning、success
                        message: res.data.msg 
                    })
                    window.location.href = this.JuheHOST
                }
            })
            .catch(error => {
                this.$message("设置失败")
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style lang="less" scoped>
.changepass{
  width: 550px;
  margin: auto;
}
.canclebtn{
    width: 230px;
    margin-left: -125px;
    margin-top: 38px;
}
.submitbtn{
    width: 230px;
    margin-left: 80px;
    margin-top: 38px;
}
/deep/.el-form-item__label{
  text-align: center;
  border: 1px solid #435280;
  color: #3e4d7b;
  font-size: 18px;
}
/deep/.el-input{
  width: 420px;
}
/deep/.el-input__inner{
  width: 420px;
  height: 0.42rem;
    line-height: 0.42rem;
  background-color: #0D1219;
  border-radius: 0;
  border: 1px solid #435280;
}
/deep/.el-button {
  color: #818382 !important;
  background-color: #0D1219 !important;
  border: 1px solid #818382 !important;
}
/deep/.el-button:hover{
  color: #7c705f;
  border: 1px solid #7c705f;
}
</style>