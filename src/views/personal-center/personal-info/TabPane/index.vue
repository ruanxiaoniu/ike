<template>
<div>
  <el-form :model="personalList" label-position="right" label-width="130px">
    <el-form-item label="用户名：">
      <span>{{personalList.username}}</span>
    </el-form-item>
    <el-form-item label="姓名：">
      <span>{{personalList.name}}</span>
    </el-form-item>
    <el-form-item label="性别：">
      <span v-if="personalList.gender==1">女</span>
      <span v-else>男</span>
    </el-form-item>
    <el-form-item label="电话号码：">
      <span>{{personalList.phone}}</span>
    </el-form-item>
    <el-form-item label="邮箱：">
      <span>{{personalList.email}}</span>
    </el-form-item>
     <el-form-item label="职位：">
      <span>{{personalList.positionName}}</span>
    </el-form-item>
    <el-form-item label="部门：">
      <span>{{personalList.departmentName}}</span>
    </el-form-item>
    <el-form-item label="账号状态：">
      <span v-if="personalList.status==0">正常</span>
      <span v-else>故障</span>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import {getPerson} from '@/api/user'
  export default {
    props: {
      type: {
        type: String,
        default: 'person_info'
      }
    },
    data() {
      return {
        personalList:null,
        params:{
          id:''
        }
      }
    },
    created() {
      this.params.id=this.$store.getters.userId
      this.getPersonInfo()
    },
    methods: {
      getPersonInfo(){
        console.log("内部消息")
        console.log(this.params)
        getPerson(this.params).then(res=>{
          this.personalList=res.data
        }).catch(err=>{

        })
      }
    }
  }
</script>

