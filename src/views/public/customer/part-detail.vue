<template>
  <div>
    <div class="top">基本信息:</div>
      <el-form ref="base" :model="base" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="编号：" prop="id">
          <span>{{base.id}}</span>
        </el-form-item>
        <el-form-item label="负责人：" prop="employeeName">
          <span>{{base.employeeName}}</span>
        </el-form-item>
        <el-form-item label="客户名称：" prop="customerName">
          <span>{{base.customerName}}</span>
        </el-form-item>
        <el-form-item label="客户地址：" prop="customerAddress">
          <span>{{base.customerAddress}}</span>
        </el-form-item>
        <el-form-item label="客户阶段：" prop="stageName">
          <span>{{base.stageName}}</span>
        </el-form-item>
        <el-form-item label="客户等级：" prop="levelName">
          <span>{{base.levelName}}</span>
        </el-form-item>
        <el-form-item label="客户介绍：" prop="customerIntroduce">
          <span>{{base.customerIntroduce}}</span>
        </el-form-item>
      </el-form>
      <div class="top">其他信息:</div>
      <el-form ref="base" :model="base" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="跟进次数：" prop="followCount">
          <span>{{base.followCount}}次</span>
        </el-form-item>
        <el-form-item label="跟进任务次数：" prop="followArrangeCount">
          <span>{{base.followArrangeCount}}</span>
        </el-form-item>
        <el-form-item label="跟进计划次数：" prop="followPlanCount">
          <span>{{base.followPlanCount}}次</span>
        </el-form-item>
        <el-form-item label="最后跟进时间：" prop="lastFollowTime">
          <span>{{base.lastFollowTime}}</span>
        </el-form-item>
        <el-form-item label="修改时间：" prop="modifyTime">
          <span>{{base.modifyTime}}</span>
        </el-form-item>
        <el-form-item label="修改人：" prop="modifyName">
          <span>{{base.modifyName}}</span>
        </el-form-item>
        <el-form-item label="订单成交次数：" prop="orderCount">
          <span>{{base.orderCount}}</span>
        </el-form-item>
        <el-form-item label="成交产品总数：" prop="productCount">
          <span>{{base.productCount}}</span>
        </el-form-item>
        <el-form-item label="成交总额：" prop="orderSum">
          <span>{{base.orderSum}}</span>
        </el-form-item>
          <el-form-item label="成本总额：" prop="costSum">
          <span>{{base.costSum}}</span>
        </el-form-item>
        <el-form-item label="回款总额：" prop="returnSum">
          <span>{{base.returnSum}}</span>
        </el-form-item>
          <el-form-item label="回款总次数：" prop="returnCount">
          <span>{{base.returnCount}}</span>
        </el-form-item>
          <el-form-item label="最后回款时间" prop="lastReturnTime">
          <span>{{base.lastReturnTime}}</span>
        </el-form-item>
        <el-form-item label="退款总额：" prop="refundSum">
          <span>{{base.refundSum}}</span>
        </el-form-item>
          <el-form-item label="退款总次数：" prop="refundCount">
          <span>{{base.refundCount}}</span>
        </el-form-item>
        <el-form-item label="欠款：" prop="debt">
          <span>{{base.debt}}</span>
        </el-form-item>
          <el-form-item label="总利润：" prop="profit">
          <span>{{base.profit}}</span>
        </el-form-item>
          <el-form-item label="投诉次数：" prop="complainCount">
          <span>{{base.complainCount}}</span>
        </el-form-item>
        <el-form-item label="录入人" prop="createName">
          <span>{{base.createName}}</span>
        </el-form-item>
        <el-form-item label="录入时间" prop="createTime">
          <span>{{base.createTime}}</span>
        </el-form-item>
      </el-form>

  </div>
</template>
<script>
import {getCustomerDetail} from '@/api/customer'
export default {
  props:['type','Cid'],
  data() {
    return {
      base:{
        id:'',
        employeeName:'',
        customerName:'',
        stageName:'',
        levelName:'',
        originName:'',
        customerIntroduce:'',
        customerAddress:'',
        customerState:'',
        createTime:'',
        modifyTime:'',
        followCount:0,
        lastFollowTime:'',
        followArrangeCount:0,//跟进任务次数
        followPlanCount:0,
        orderCount:0,//订单数
        productCount:0,//产品数
        orderSum:0,//订单总额
        costSum:0,//订单成本
        debt:0,//欠款
        lastReturnTime:'',//最近回款时间
        returnCount:0,//回款次数
        returnSum:0,//回款总额
        refundSum:0,//退款总额
        refundCount:0,//退款次数
        profit:0,
        complainCount:0,
        createName:'',
        modifyName:''
      },
      params:{
        id:''
      }
    }
  },
  watch:{
     watchCid:{
       deep:true,
       handler:function(val){
          this.params.id=val
          console.log("客户详情呀呀呀")
          console.log(this.params)
          this.getDetail()
       }
     },
     Cid(newVal){
       this.params.id=newVal
        console.log("客户详情呀呀呀")
        console.log(this.params)
        this.getDetail()
     }
  },
  computed: {
    watchCid(){
      return this.$store.getters.customerRowList.id
    }
  },
  created(){
    this.rowList=this.$store.getters.customerRowList
    console.log("客户详情呀呀呀")
    if(this.Cid){
      this.params.id=this.Cid
    }else{
      this.params.id=this.rowList.id
    }
    
    console.log(this.params)
    this.getDetail()
  },
  methods:{
    getDetail(){
      getCustomerDetail(this.params).then(res=>{
        this.base=res.data
      }).catch(err=>{

      })
    }
  }
}
</script>
