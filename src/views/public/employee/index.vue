<template>
  <div>
    <div>
      <el-form ref="base" :model="base" label-position="right" label-width="120px" style="width: 400px; margin-left:50px;">
                 <el-form-item label="账号名:" prop="name">
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
    </div>
  </div>
</template>
<script>
import {getEmployeeById} from '@/api/employee'
export default {
  props:['type','id'],
  data() {
    return {
      base:null,
      params:{},
      employeeId:'',
      other:{
        customer_no:0,
        employee:0,
        customer_name:0,
        city:0,
        customer_stage:0,
        customer_level:0,
        customer_origin:0,
        customer_introduce:0,
        customer_address:0,
      }
    }
  },
  watch:{
    id(newVal){
      this.employeeId=newVal
      this.params.id=newVal
      this.getEmployee()
      // console.log("hahahaahah")
      // console.log(newVal)
      
    }
  },
  created() {
    //获取员工id
    if(this.id){
      this.employeeId=this.id
    }else{
      this.employeeId=this.$store.getters.customerRowList.id
    }
    this.$set(this.params,'id',this.employeeId)
    console.log("employeeID>>>")
    console.log(this.employeeId)
    this.getEmployee()
  },
  methods:{
    getEmployee(){
      
      getEmployeeById(this.params).then(res=>{
        this.base=res.data
      })
    }
  }
}
</script>
