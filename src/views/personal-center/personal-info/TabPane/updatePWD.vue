<template>
  <div>
    <el-form :model="PWD" ref="PWD" :rules="rules" label-position="right" label-width="130px">
      <el-form-item label="旧密码：" prop="oldPwd">
        <el-row>
          <el-col :span="6">
            <el-input v-model="PWD.oldPwd" type="password"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="新密码：" prop="newPwd">
        <el-row>
          <el-col :span="6">
            <el-input v-model="PWD.newPwd" type="password"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
       <el-form-item label="再次确认密码：" prop="rePwd">
        <el-row>
          <el-col :span="6">
            <el-input v-model="PWD.rePwd" type="password"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div style="margin-left:500px">
      <el-button size="small" type="success" @click="updatePassword('PWD')">确认</el-button>
    </div>
  </div>
</template>
<script>
import {updatePwd} from '@/api/user'
export default {
  data() {
    return {
      PWD:{
        oldPwd:'',
        newPwd:'',
        rePwd:'',
      },
      rules:{
          oldPwd:[
            {required:true,message:'请输入旧密码',trigger:'blur'}
          ],
          rePwd:[
            {required:true,message:'请再次输入密码',trigger:'blur'}
          ],
          newPwd:[
            
            {required:true,message:'请输入新密码',trigger:'blur'} 
          ]
       },
    }
  },
  methods: {
    /**
     * 验证两次密码是否一样
     */
    checkPwd(){
      if(this.PWD.newPwd==this.PWD.rePwd){
        return true
      }else{
        return false
      }
    },
    /**
     * 点击确定
     */
    updatePassword(formName){
      this.$refs[formName].validate(valid=>{
      if(valid){
        if(this.checkPwd()){
          /**
           * 修改
           */
          updatePwd(this.PWD).then(res=>{
            this.$message.success('修改成功！')
          }).catch(err=>{
            this.$message.error('修改失败，请重试！')
          })
        }else{
          this.$message.error("两次密码不一样,请重新输入！")
        }
      }else{
        return false
      }
      })
    }
  },
}
</script>
