<template>
  <el-dialog title="搜索" :visible.sync="getdialogFormVisible">
     <el-form  ref="searchData" :rules="rules" :model="searchData" label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
        <el-form-item label="录入时间" prop="display_time"> 
           <el-date-picker
            v-model="searchData.display_time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="成交数量" prop="order_count">
          <el-row>
            <el-col span="11">
            <el-input v-model="searchData.order_count"></el-input>
          </el-col>
          <el-col span="2">
            <span>&nbsp;&nbsp;至</span>
          </el-col>
           <el-col span="11">
            <el-input v-model="searchData.order_count"></el-input>
          </el-col>
          </el-row>
          
        </el-form-item>
        <el-form-item label="成交次数" prop="order_num">
           <el-row>
            <el-col span="11">
            <el-input v-model="searchData.order_num"></el-input>
          </el-col>
          <el-col span="2">
            <span>&nbsp;&nbsp;至</span>
          </el-col>
           <el-col span="11">
            <el-input v-model="searchData.order_num"></el-input>
          </el-col>
          </el-row>
          <!-- <el-input v-model="searchData.order_num"></el-input> -->
        </el-form-item>
        <el-form-item label="成交总额度" prop="total_price">
           <el-row>
            <el-col span="11">
            <el-input v-model="searchData.total_price"></el-input>
          </el-col>
          <el-col span="2">
            <span>&nbsp;&nbsp;至</span>
          </el-col>
           <el-col span="11">
            <el-input v-model="searchData.total_price"></el-input>
          </el-col>
          </el-row>
          <!-- <el-input v-model="searchData.total_price"></el-input> -->
        </el-form-item>
        <el-form-item label="成交成本总额度">
           <el-row>
            <el-col span="11">
            <el-input v-model="searchData.cost"></el-input>
          </el-col>
          <el-col span="2">
            <span>&nbsp;&nbsp;至</span>
          </el-col>
           <el-col span="11">
            <el-input v-model="searchData.cost"></el-input>
          </el-col>
          </el-row>
          <!-- <el-input v-model="searchData.cost"></el-input> -->
        </el-form-item>
        <el-form-item label="成交总利润">
           <el-row>
            <el-col span="11">
            <el-input v-model="searchData.profit"></el-input>
          </el-col>
          <el-col span="2">
            <span>&nbsp;&nbsp;至</span>
          </el-col>
           <el-col span="11">
            <el-input v-model="searchData.profit"></el-input>
          </el-col>
          </el-row>
          <!-- <el-input v-model="searchData.profit"></el-input> -->
        </el-form-item>
         <el-form-item label="意向客户数">
            <el-row>
            <el-col span="11">
            <el-input v-model="searchData.customer_num"></el-input>
          </el-col>
          <el-col span="2">
            <span>&nbsp;&nbsp;至</span>
          </el-col>
           <el-col span="11">
            <el-input v-model="searchData.customer_num"></el-input>
          </el-col>
          </el-row>
           <!-- <el-input v-model="searchData.customer_num"></el-input> -->
        </el-form-item>
         <el-form-item label="成交客户数">
            <el-row>
            <el-col span="11">
            <el-input v-model="searchData.success_count"></el-input>
          </el-col>
          <el-col span="2">
            <span>&nbsp;&nbsp;至</span>
          </el-col>
           <el-col span="11">
            <el-input v-model="searchData.success_count"></el-input>
          </el-col>
          </el-row>
           <!-- <el-input v-model="searchData.success_count"></el-input> -->
        </el-form-item>
         <el-form-item label="退货数量">
            <el-row>
            <el-col span="11">
            <el-input v-model="searchData.refund_num"></el-input>
          </el-col>
          <el-col span="2">
            <span>&nbsp;&nbsp;至</span>
          </el-col>
           <el-col span="11">
            <el-input v-model="searchData.refund_num"></el-input>
          </el-col>
          </el-row>
           <!-- <el-input v-model="searchData.refund_num"></el-input> -->
        </el-form-item>
        <el-form-item label="退货次数">
           <el-row>
            <el-col span="11">
            <el-input v-model="searchData.refund_count"></el-input>
          </el-col>
          <el-col span="2">
            <span>&nbsp;&nbsp;至</span>
          </el-col>
           <el-col span="11">
            <el-input v-model="searchData.refund_count"></el-input>
          </el-col>
          </el-row>
          <!-- <el-input v-model="searchData.refund_count"></el-input> -->
        </el-form-item>
        <el-form-item label="录入人">
          <el-input v-model="searchData.create_user_id"></el-input>
        </el-form-item>
      </el-form>
       <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
      </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      searchData:{
        display_time:'',
        order_count:'',
        order_num:'',
        total_price:'',
        cost:'',
        profit:'',
        customer_num:'',
        success_count:'',
        refund_num:'',
        refund_count:'',
        create_user_id:'',
      }
    }
  },
   computed: {
    getdialogFormVisible:{
      get(){
        return this.$store.getters.dialogFormVisible
      },
      set(){
        this.$store.dispatch('product/setDialogStatus',false)

        return this.$store.getters.dialogFormVisible
      }
    },
  },
}
</script>
