<template>
  <div>
      <el-form  ref="customer" :rules="rules" :model="customer" label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
        <el-form-item label="回款总额" prop="customer_name"> 
          <el-input v-model="customer.customer_name"></el-input>
        </el-form-item>
        <el-form-item label="创建人" prop="customer_stage">
          <el-input v-model="customer.customer_stage"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="customer_level">
           <el-input v-model="customer.customer_level"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="customer_stage">
           <el-input v-model="customer.customer_stage"></el-input>
        </el-form-item>
        <el-form-item label="成交时间" prop="customer_origin">
           <el-input v-model="customer.customer_origin"></el-input>
        </el-form-item>
        <el-form-item label="成交客户" prop="custoemr_introduce">
           <el-input v-model="customer.custoemr_introduce"></el-input>
        </el-form-item>
         <el-form-item label="成交总额" prop="customer_address">
            <el-input v-model="customer.customer_address"></el-input>
        </el-form-item>
         <el-form-item label="付款方式" prop="customer_address">
            <el-input v-model="customer.customer_address"></el-input>
        </el-form-item>
         <el-form-item label="订单状态" prop="customer_address">
            <el-input v-model="customer.customer_address"></el-input>
        </el-form-item>
      </el-form>
      <p></p>
      <div style="text-align:right">
        <el-button>取消</el-button>
        <el-button type="primary">确认</el-button>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      customer:{
        customer_name:'',
        customer_stage:'',
        customer_state:'',
        customer_introduce:'',
        customer_address:'',
        customer_level:'',
        customer_origin:''
      },
      follow:{
        end_follow:'',
        create_time:'',
        create_user:'',
        follow_count:''
      },
      order:{
        success_count:'',
        end_time:'',
        product_count:'',
        total:'',
        profit:'',

      },
      complaint:{
        complaint_count:'',
        complaint_type:'',
        complaint_method:'',
        urge:'',
      },
      return_refund:{
        return_total:'',
        own_total:'',
        return_total:'',
        return_count:'',
        end_time:'',
        end_total:'',
        return_total:'',
      }
    }
  },
}
</script>