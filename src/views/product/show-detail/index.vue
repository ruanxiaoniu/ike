<template>
  <div class="app-container">
    <header>{{productName}}详情</header>
    <el-tabs>
      <el-tab-pane label="产品详细资料">
        <productDetail :productId="productId"></productDetail>
      </el-tab-pane>
      <el-tab-pane label="产品销量统计">
        <productDetail :productId="productId"></productDetail>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import productDetail from '../../public/product/product-detail'
export default {
  components:{
    productDetail
  },
  data() {
    return {
      productId:'',
      productName:''
    }
  },
  computed: {
   
  },
  created(){
    this.productId=this.$route.query.productId
    this.productName=this.$route.query.productName
    console.log("ppppppppppp")
    console.log(this.productId)
  }
}
</script>
<style scoped>
header{
  /* font-weight: bolder */
  background-color: rgba(0, 0, 0, 0.02);
  height: 50px;
  line-height: 50px;
  font-weight: bolder;
  padding-left: 20px;
}
</style>