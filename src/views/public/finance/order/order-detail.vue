<template>
  <div v-if="dialogVisible">
    <el-dialog title="订单详情" :visible.sync="dialogVisible"></el-dialog>
    <div class="top">基本信息</div>
    <el-form v-model="orderList" label-width="150px" label-position="right" class="demo-form-inline">
      <el-row>
        <el-col :span="12">
          <el-form-item label="负责人：" prop="employee">
            <span class="link-type" @click="operation(scope.row,'employee')">{{ orderList.employeeName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="客户联系人：" prop="relationName">
            <span class="link-type" @click="operation(scope.row,'relation')">{{ orderList.relationName}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="成交总额：" prop="orderActualTotal">
            <span class="link-type" @click="operation(scope.row,'orderProduct')">{{ orderList.orderActualTotal}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="总成本：" prop="orderCost">
            <span class="link-type" @click="operation(scope.row,'orderProduct')">{{ orderList.orderCost}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-row>
        <el-col :span="12">
          <el-form-item label="回款总额：" prop="orderCost">
            <span class="link-type" @click="operation(scope.row,'orderProduct')">{{ orderList.orderGetSum}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="付款方式：" prop="orderCost">
            <span>{{ orderList.paymentMethod}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-row>
        <el-col :span="12">
          <el-form-item label="订单备注：" prop="note">
            <span class="link-type">{{ orderList.note}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="订单状态：" prop="note">
            <span class="link-type">{{ orderList.orderState}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-row>
        <el-col :span="12">
          <el-form-item label="修改时间：" prop="modifyTime">
            <span class="link-type">{{ orderList.modifyTime}}</span>
          </el-form-item>
        </el-col>
      </el-row>  
    </el-form>
    <div class="top">订单产品信息</div>
    <el-table :data="orderList.orderProductVoList" border show-summary>
      <el-table-column prop="productName" label="产品名">
          <template slot-scope="scope">
            <span>{{scope.row.productName}}</span>
          </template>
      </el-table-column>
      <el-table-column prop="className" label="产品分类">
          <template slot-scope="scope">
            <span>{{scope.row.className}}</span>
          </template>
      </el-table-column>
       <el-table-column prop="orderCount" label="成交数量">
          <template slot-scope="scope">
            <span>{{scope.row.orderCount}}</span>
          </template>
      </el-table-column>
      <el-table-column prop="totalPrice" label="总价格">
          <template slot-scope="scope">
            <span>{{scope.row.totalPrice}}</span>
          </template>
      </el-table-column>
       <el-table-column prop="actualPrice" label="实际成交价">
          <template slot-scope="scope">
            <span>{{scope.row.actualPrice}}</span>
          </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {orderById} from '@/api/order'
export default {
  props:['Oid'],
  data() {
    return {
      dialogVisible: false,
      params:{
        id:''
      },
      orderList:null
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
        this.orderList=res.data
      }).catch(err=>{

      })
    }
  },
}
</script>