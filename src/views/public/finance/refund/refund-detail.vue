<template>
  <div>
    <el-form v-model="refundList" label-width="180px" label-position="right">
      <el-form-item label="负责人：" prop="employeeName">
        <span>{{ refundList.employeeName }}</span>
      </el-form-item>
      <el-form-item label="退款时间" prop="refundDate">
        <span>{{ refundList.refundDate}}</span>
      </el-form-item>
      <el-form-item label="退款金额：" prop="refundAmount">
        <span>{{ refundList.refundAmount}}</span>
      </el-form-item>
      <el-form-item label="客户联系人名称[客户名称]：">
        <span>{{ refundList.relationName}}</span>
      </el-form-item>
      <el-form-item label="成交订单：" prop="orderBaseMessages">
        <span class="link-type" @click="operation(scope.row,'orderProduct')">{{ refundList.orderBaseMessages}}</span>
      </el-form-item>
      <el-form-item label="支付方式：" prop="refundMethod">
        <span>{{ refundList.refundMethod}}</span>
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <span class="link-type">{{ refundList.remark}}</span>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {getAllRefund} from '@/api/refund'
export default {
  props:['Rid'],
  data() {
    return {
      params:{
        id:''
      },
      refundList:null
    }
  },
  watch: {
    Rid(newVal){
      if(newVal){
        this.params.id=newVal
        this.getDetail()
      }
    }
  },
  created() {
   
    if(this.Rid){
      this.params.id=this.Rid
       console.log("退款了")
    console.log(this.Rid)
      this.getDetail()
    }
  },
  methods: {
    getDetail(){
      getAllRefund(this.params).then(res=>{
        this.refundList=res.data.list[0]
      }).catch(err=>{

      })
    }
  },
}
</script>