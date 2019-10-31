<template>
  <div>
      <el-form  ref="searchQuery" :model="searchQuery" label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
        <el-form-item label="订单总数" > 
          <el-row>
            <el-col span="11">
              <el-input v-model="searchQuery.orderCountMin"></el-input>
            </el-col>
            <el-col span="2">
              <span>&nbsp;&nbsp;至</span>
            </el-col>
            <el-col span="11">
              <el-input v-model="searchQuery.orderCountMax"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="订单总额"> 
          <el-row>
            <el-col span="11">
              <el-input v-model="searchQuery.orderTotalMin"></el-input>
            </el-col>
            <el-col span="2">
              <span>&nbsp;&nbsp;至</span>
            </el-col>
            <el-col span="11">
              <el-input v-model="searchQuery.orderTotalMax"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="订单实际总额"> 
          <el-row>
            <el-col span="11">
              <el-input v-model="searchQuery.orderActualTotalMin"></el-input>
            </el-col>
            <el-col span="2">
              <span>&nbsp;&nbsp;至</span>
            </el-col>
            <el-col span="11">
              <el-input v-model="searchQuery.orderActualTotalMax"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="订单成本"> 
          <el-row>
            <el-col span="11">
              <el-input v-model="searchQuery.orderCostMin"></el-input>
            </el-col>
            <el-col span="2">
              <span>&nbsp;&nbsp;至</span>
            </el-col>
            <el-col span="11">
              <el-input v-model="searchQuery.orderCostMax"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="订单回款"> 
          <el-row>
            <el-col span="11">
              <el-input v-model="searchQuery.orderGetSumMin"></el-input>
            </el-col>
            <el-col span="2">
              <span>&nbsp;&nbsp;至</span>
            </el-col>
            <el-col span="11">
              <el-input v-model="searchQuery.orderGetSumMax"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="订单利润"> 
          <el-row>
            <el-col span="11">
              <el-input v-model="searchQuery.profitMin"></el-input>
            </el-col>
            <el-col span="2">
              <span>&nbsp;&nbsp;至</span>
            </el-col>
            <el-col span="11">
              <el-input v-model="searchQuery.profitMax"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
       
        <el-form-item label="下单时间">
           <el-date-picker
            v-model="orderTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
         <el-form-item label="下单产品个数"> 
          <el-row>
            <el-col span="11">
              <el-input v-model="searchQuery.productCountMin"></el-input>
            </el-col>
            <el-col span="2">
              <span>&nbsp;&nbsp;至</span>
            </el-col>
            <el-col span="11">
              <el-input v-model="searchQuery.productCountMax"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="客户名称"> 
          <el-input v-model="searchQuery.customerName"></el-input>
        </el-form-item>
         <el-form-item label="联系人名称"> 
          <el-input v-model="searchQuery.relationName"></el-input>
        </el-form-item>
      </el-form>
       <div style="margin-left:600px;margin-top:50px">
        <el-button  size="small" type="primary" @click="search()">确认</el-button>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data() {
    return {
      iscomplete:'',
      isExecute:'',
      orderTime:'',
      searchQuery:{
        relationName:'',
        productCountMin:'',
        productCountMax:'',
        customerName:'',
        profitMin:'',
        profitMax:'',
        orderGetSumMin:'',
        orderGetSumMax:'',
        orderCostMin:'',
        orderCostMax:'',
        orderTotalMin:'',
        orderTotalMax:'',
        orderActualTotalMin:'',
        orderActualTotalMax:'',
        orderCountMin:'',
        orderCountMax:''
      },
    }
  },
  methods: {
    /**
     * 点击确定，验证并提交表单，触发父组件方法
     * method:cancel()
     */
    search(){
      //处理搜索数据
      if(this.orderTime){
          this.searchQuery.beginCreateTime=moment(this.orderTime[0]).format('YYYY-MM-DD')
          this.searchQuery.endCreateTime=moment(this.orderTime[1]).format('YYYY-MM-DD')
      }
      
      //返回搜索数据给数据
      this.$emit('updatelist',this.searchQuery)
      this.searchQuery={
         relationName:'',
        productCountMin:'',
        productCountMax:'',
        customerName:'',
        profitMin:'',
        profitMax:'',
        orderGetSumMin:'',
        orderGetSumMax:'',
        orderCostMin:'',
        orderCostMax:'',
        orderTotalMin:'',
        orderTotalMax:'',
        orderActualTotalMin:'',
        orderActualTotalMax:'',
        orderCountMin:'',
        orderCountMax:''
      },
      this.orderTime=''
    }
  },
}
</script>