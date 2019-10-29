<template>
  <div>
    <el-form v-model="returnList" label-width="150px" label-position="right">
      <el-form-item label="负责人：" prop="employee">
        <span class="link-type" @click="operation(scope.row,'employee')">{{ returnList.employeeName }}</span>
      </el-form-item>
      <el-form-item label="回款时间" prop="relationName">
        <span class="link-type" @click="operation(scope.row,'relation')">{{ returnList.relationName}}</span>
      </el-form-item>
      <el-form-item label="回款金额" prop="orderActualTotal">
        <span class="link-type" @click="operation(scope.row,'orderProduct')">{{ returnList.orderActualTotal}}</span>
      </el-form-item>
      <el-form-item label="客户联系人名称[客户名称]" prop="orderCost">
        <span class="link-type" @click="operation(scope.row,'orderProduct')">{{ returnList.orderCost}}</span>
      </el-form-item>
      <el-form-item label="成交订单" prop="orderCost">
        <span class="link-type" @click="operation(scope.row,'orderProduct')">{{ returnList.orderGetSum}}</span>
      </el-form-item>
      <el-form-item label="支付方式：" prop="orderCost">
        <span>{{ returnList.paymentMethod}}</span>
      </el-form-item>
      <el-form-item label="备注：" prop="note">
        <span class="link-type">{{ returnList.note}}</span>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {orderById} from '@/api/order'
export default {
  props:['Oid'],
  data() {
    return {
      params:{
        id:''
      },
      returnList:null
    }
  },
  watch: {
    Oid(newVal){
      if(newVal){
        this.params.id=newVal
        this.getDetail()
      }
    }
  },
  created() {
    if(this.Oid){
      this.params.id=this.Oid
      this.getDetail()
    }
  },
  methods: {
    getDetail(){
      orderById(this.params).then(res=>{
        this.returnList=res.data
      }).catch(err=>{

      })
    }
  },
}
</script>