<template>
  <div>
    <div>
      <el-form ref="base" :model="base" label-position="left" label-width="180px" style="width: 400px; margin-left:50px;">
                <el-form-item label="安排时间" prop="customer_no">
                  <span>{{base.customer_no}}</span>
                </el-form-item>
                 <el-form-item label="安排人姓名" prop="customer_no">
                  <span>{{base.customer_no}}</span>
                </el-form-item>
                 <el-form-item label="负责人姓名" prop="customer_no">
                  <span>{{base.customer_no}}</span>
                </el-form-item>
                <el-form-item label="客户联系人名称[客户名]" prop="customer_name">
                  <span>{{base.customer_name}}</span>
                  <span>[客户名]</span>
                </el-form-item>
                <el-form-item label="安排内容" prop="city">
                  <span>{{base.city}}</span>
                </el-form-item>
                <el-form-item label="已读状态" prop="customer_stage">
                  <span>{{base.customer_stage}}</span>
                </el-form-item>
                <el-form-item label="完成状态" prop="customer_level">
                  <span>
                    <el-radio v-model="customer_level" label="1">完成</el-radio>
                    <el-radio v-model="customer_level" label="2">未完成</el-radio>
                  </span>
                </el-form-item>
                 <el-form-item label="跟进记录" prop="customer_level">
                  <span>
                    <el-radio v-model="customer_level" label="1">完成</el-radio>
                    <el-radio v-model="customer_level" label="2">未完成</el-radio>
                  </span>
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