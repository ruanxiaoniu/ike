<template>
  <div>
    <div style="margin-bottom:30px">
      <el-button icon="el-icon-back" type="success" size="small">返回</el-button>
      <el-button icon="el-icon-plus" type="primary" size="small">新建</el-button>
      <el-button icon="el-icon-edit" size="small">修改</el-button>
      <el-button icon="el-icon-delete" size="small">删除</el-button>
    </div>
      <div class="top">基本信息:</div>
      <el-form :model="base" style="margin-left:50px">
          <el-form-item label="录入人：">
            <span>{{base.createUserName}}</span>
          </el-form-item>
          <el-form-item label="录入时间：">
            <span>{{base.createTime}}</span>
          </el-form-item>
          <el-form-item label="成交次数：">
            <span  class="link-type" @click="orderDetail">{{base.orderTimes}}</span>
          </el-form-item>
            <el-form-item label="成交数量：">
            <span @click="orderDetail">{{base.orderNum}}</span>
          </el-form-item>
          <el-form-item label="实际成交总额：">
            <span @click="orderDetail">{{base.orderCount}}</span>
          </el-form-item>
          <el-form-item label="总成本：">
            <span @click="orderDetail">{{base.orderCost}}</span>
          </el-form-item>
          <el-form-item label="总利润：">
            <span @click="orderDetail">{{base.orderProfit}}</span>
          </el-form-item>
      </el-form>
       <div class="top">产品信息:</div>   
       <el-form :model="productDetail" style="margin-left:50px">
        <el-form-item label="产品分类：" prop="productClassName">
            <span>{{productDetail.productClassName}}</span>
          </el-form-item>
          <el-form-item label="产品名称：" prop="productName">
            <span>{{productDetail.productName}}</span>
          </el-form-item>
          <el-form-item label="产品图片：" prop="url">
            <div>
              <img  v-for="(item) in productFile" :src="item.url" style="width: 100px; margin-right:5px">
            </div>
            
          </el-form-item>
          <el-form-item label="销售单价：">
          <span>{{productDetail.salePrice}}</span>
          </el-form-item>
          <el-form-item label="销售单位：">
            <span v-if="!edit">{{productDetail.saleUnitName}}</span>
            <el-input v-else v-model="productDetail.saleUnitName"></el-input>
          </el-form-item>
          <el-form-item label="成本：">
            <span v-if="!edit">{{productDetail.cost}}</span>
            <el-input v-else v-model="productDetail.cost"></el-input>
          </el-form-item>
          <el-form-item label="销售状态：">
            <span class="link-type" v-if="productDetail.onSale==0">下架</span>
            <span class="link-type" v-else>上架</span>
          </el-form-item>
          <el-form-item label="上市时间：">
            <span v-if="!edit">{{productDetail.ttm}}</span>
            <el-input v-else v-model="productDetail.ttm"></el-input>
          </el-form-item>
          <el-form-item label="产品介绍：">
            <span v-if="!edit">{{productDetail.introduction}}</span>
            <el-input v-else v-model="productDetail.introduction"></el-input>
          </el-form-item>
       </el-form>
     
       <div slot="footer" class="dialog-footer">
        <el-button v-if="edit" @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button v-if="getdialogStatus=='productDetail'" style="color:red">
          自动创建订单
        </el-button>
        <el-button v-if="edit" type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
         <el-button v-else type="primary" @click="edit=!edit">
            修改
          </el-button>
      </div>
  </div>
</template>
<script>
import {getProductDetail} from '@/api/product'
export default {
  props:['productId'],
  data() {
    return {
      textMap:{//动态修改弹出框的标题
        productDetail:"产品详情",
        customer_detail:"客户信息",
        deal_detail:"成交产品详情",
        personal_detail:"个人信息",
      },
      //产品详情
      base:null,
      productDetail:null,
      productFile:null,
      params:{
        id:''
      }
    }
  },
  watch:{
    productId(newVal){
      this.params.id=newVal
      this.getDetail()
    }
  },
  created() {
    this.params.id=this.productId
    console.log("prodyct....")
    console.log(this.productId)
    this.getDetail()
  },
  methods:{
    /**
     * 根据id获取产品详情
     * method:getDetail
     */
    getDetail(){
      getProductDetail(this.params).then(res=>{
        this.base=res.data.productVO
        this.productDetail=res.data.product
        this.productFile=res.data.productFile
      }).catch(err=>{

      })
    }
  }
}
</script>