<template>
  <div>
    <div>
      <el-form ref="base" :model="base" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
                <el-form-item label="录入时间" prop="customer_no">
                  <span>{{base.customer_no}}</span>
                </el-form-item>
                <el-form-item label="录入人" prop="employee">
                  <span>{{base.employee}}</span>
                </el-form-item>
                <el-form-item label="客户联系人名称" prop="customer_name">
                  <span>{{base.customer_name}}</span>
                </el-form-item>
                <el-form-item label="跟进时间" prop="city">
                  <span>{{base.city}}</span>
                </el-form-item>
                <el-form-item label="跟进方式" prop="customer_stage">
                  <span>{{base.customer_stage}}</span>
                </el-form-item>
                <el-form-item label="跟进细节" prop="customer_level">
                  <span>{{base.customer_level}}</span>
                </el-form-item>
                <el-form-item label="跟进结果" prop="customer_introduce">
                  <span>{{base.customer_introduce}}</span>
                </el-form-item>
                <el-form-item label="跟进阶段" prop="customer_address">
                  <span>{{base.customer_address}}</span>
                </el-form-item>
                 <el-form-item label="客户状态" prop="customer_address">
                  <span>{{base.customer_address}}</span>
                </el-form-item>
                <el-form-item label="相关计划" prop="customer_address">
                  <span>{{base.customer_address}}</span>
                </el-form-item>
                <el-form-item label="相关任务" prop="customer_address">
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
<style scoped>
</style>