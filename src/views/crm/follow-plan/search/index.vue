<template>
  <div>
      <el-form  ref="customer" :rules="rules" :model="customer" label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
        <el-form-item label="录入人" prop="customer_name"> 
          <el-input v-model="customer.customer_name"></el-input>
        </el-form-item>
        <el-form-item label="录入时间" prop="create_time">
           <el-date-picker
            v-model="follow.create_time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="跟进时间" prop="customer_level">
           <el-date-picker
            v-model="follow.create_time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="跟进方式" prop="customer_stage">
           <el-input v-model="customer.customer_stage"></el-input>
        </el-form-item>
        <el-form-item label="跟进阶段" prop="customer_origin">
           <el-input v-model="customer.customer_origin"></el-input>
        </el-form-item>
      </el-form>
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