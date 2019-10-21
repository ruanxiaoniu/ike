<template>
  <div>
    <div class="top">基本信息:</div>
    <div>
      <el-form ref="base" :model="base" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
                <el-form-item label="编号：" prop="customer_no">
                  <span>{{base.customer_no}}</span>
                </el-form-item>
                <el-form-item label="负责人：" prop="employee">
                  <span>{{base.employee}}</span>
                </el-form-item>
                <el-form-item label="客户名称：" prop="customer_name">
                  <span>{{base.customer_name}}</span>
                </el-form-item>
                <el-form-item label="所在城市：" prop="city">
                  <span>{{base.city}}</span>
                </el-form-item>
                <el-form-item label="客户阶段：" prop="customer_stage">
                  <span>{{base.customer_stage}}</span>
                </el-form-item>
                <el-form-item label="客户等级：" prop="customer_level">
                  <span>{{base.customer_level}}</span>
                </el-form-item>
                <el-form-item label="客户介绍：" prop="customer_introduce">
                  <span>{{base.customer_introduce}}</span>
                </el-form-item>
                <el-form-item label="客户地址：" prop="customer_address">
                  <span>{{base.customer_address}}</span>
                </el-form-item>
              </el-form>
    </div>
    <div class="top">其他信息:</div>
    <div>
      <el-form ref="other" :model="other" label-position="left" label-width="150px" style="width: 400px; margin-left:50px;">
                <el-form-item label="跟进记录：" prop="customer_no">
                  <span>{{other.customer_no}}次</span>
                </el-form-item>
                <el-form-item label="跟进任务：" prop="employee">
                  <span>{{other.employee}}</span>
                </el-form-item>
                <el-form-item label="跟进计划：" prop="customer_name">
                  <span>共：{{other.customer_name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;进行中：{{other.customer_name}} </span>
                </el-form-item>
                <el-form-item label="最后跟进时间：" prop="city">
                  <span>{{other.city}}</span>
                </el-form-item>
                <el-form-item label="最后跟进人：" prop="customer_stage">
                  <span>{{other.customer_stage}}</span>
                </el-form-item>
                <el-form-item label="订单成交次数：" prop="customer_level">
                  <span>{{other.customer_level}}</span>
                </el-form-item>
                <el-form-item label="成交产品总数：" prop="customer_introduce">
                  <span>{{base.customer_introduce}}</span>
                </el-form-item>
                <el-form-item label="成交总额：" prop="customer_address">
                  <span>{{other.customer_address}}</span>
                </el-form-item>
                <el-form-item label="回款总额：" prop="customer_address">
                  <span>{{other.customer_address}}</span>
                </el-form-item>
                <el-form-item label="欠款：" prop="customer_address">
                  <span>{{other.customer_address}}</span>
                </el-form-item>
                <el-form-item label="最后回款金额：" prop="customer_address">
                  <span>{{other.customer_address}}</span>
                </el-form-item>
                <el-form-item label="最后回款时间" prop="customer_address">
                  <span>{{other.customer_address}}</span>
                </el-form-item>
                <el-form-item label="回款总次数：" prop="customer_address">
                  <span>{{other.customer_address}}</span>
                </el-form-item>
                <el-form-item label="退款总额：" prop="customer_address">
                  <span>{{other.customer_address}}</span>
                </el-form-item>
                 <el-form-item label="退款总次数：" prop="customer_address">
                  <span>{{other.customer_address}}</span>
                </el-form-item>
                 <el-form-item label="总利润：" prop="customer_address">
                  <span>{{other.customer_address}}</span>
                </el-form-item>
                 <el-form-item label="投诉记录：" prop="customer_address">
                  <span>{{other.customer_address}}</span>
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
