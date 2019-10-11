<template>
  <div>
    <div>
      <el-form ref="base" :model="base" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
                <el-form-item label="姓名" prop="customer_no">
                  <span>{{base.customer_no}}</span>
                </el-form-item>
                <el-form-item label="部门" prop="employee">
                  <span>{{base.employee}}</span>
                </el-form-item>
                <el-form-item label="职位" prop="customer_name">
                  <span>{{base.customer_name}}</span>
                </el-form-item>
                <el-form-item label="手机号" prop="city">
                  <span>{{base.city}}</span>
                </el-form-item>
                <el-form-item label="email" prop="customer_stage">
                  <span>{{base.customer_stage}}</span>
                </el-form-item>
                <el-form-item label="登录状态" prop="customer_level">
                  <span>{{base.customer_level}}</span>
                </el-form-item>
                <el-form-item label="加入时间" prop="customer_introduce">
                  <span>{{base.customer_introduce}}</span>
                </el-form-item>
                <el-form-item label="最后登录时间" prop="customer_address">
                  <span>{{base.customer_address}}</span>
                </el-form-item>
                 <el-form-item label="登录次数" prop="customer_address">
                  <span>{{base.customer_address}}</span>
                </el-form-item>
              </el-form>
    </div>
  </div>
</template>
<script>
export default {
  props:['type'],
  data() {
    return {
      base:{
        customer_no:'',
        employee:'',
        customer_name:'',
        city:'',
        customer_stage:'',
        customer_level:'',
        customer_origin:'',
        customer_introduce:'',
        customer_address:'',
      },
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
}
</script>
