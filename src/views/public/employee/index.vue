<template>
  <div v-if="dialogVisible">
    <el-dialog title="负责人详情" :visible.sync="dialogVisible">
      <el-form ref="base" :model="base" label-position="right" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="账号名:" prop="username">
          <span>{{base.username}}</span>
        </el-form-item>
        <el-form-item label="姓名:" prop="name">
          <span>{{base.name}}</span>
        </el-form-item>
        <el-form-item label="部门:" prop="departmentName">
          <span>{{base.departmentName}}</span>
        </el-form-item>
        <el-form-item label="职位:" prop="positionName">
          <span>{{base.positionName}}</span>
        </el-form-item>
        <el-form-item label="手机号:" prop="phone">
          <span>{{base.phone}}</span>
        </el-form-item>
        <el-form-item label="email:" prop="email">
          <span>{{base.email}}</span>
        </el-form-item>
        <el-form-item label="账号状态:" prop="status">
          <span v-if="base.status==0">正常</span>
          <span v-if="base.status==1">故障</span>
        </el-form-item>
        <el-form-item label="最后登录时间:" prop="lastLoginDate">
          <span>{{base.lastLoginDate}}</span>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {getEmployeeById} from '@/api/employee'
export default {
  // props:['type','id'],
  data() {
    return {
      dialogVisible: false,
      base:{
        lastLoginDate: '',
        status: '',
        email: '',
        phone: '',
        positionName: '',
        departmentName: '',
        username: '',
        name: ''
      },
      params:{
        id: ''
      },
    }
  },
  methods:{
    show(id){
      if(id){
        this.params.id = id
        this.getEmployee()
        this.dialogVisible = true
      }
    },
    clearData(){
      this.base = {
        lastLoginDate: '',
        status: '',
        email: '',
        phone: '',
        positionName: '',
        departmentName: '',
        username: '',
        name: ''
      }
    },
    getEmployee(){
      getEmployeeById(this.params).then(res=>{
        this.base=res.data
      })
    }
  }
}
</script>
