<template>
  <div>
    <div class="top">客户信息</div><p></p>
      <el-form  ref="customer" :rules="rules" :model="customer" label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
        <el-form-item label="客户名称" prop="customer_name"> 
          <el-input v-model="customer.customer_name"></el-input>
        </el-form-item>
        <el-form-item label="客户阶段id" prop="customer_stage">
          <el-input v-model="customer.customer_stage"></el-input>
        </el-form-item>
        <el-form-item label="客户等级id" prop="customer_level">
           <el-input v-model="customer.customer_level"></el-input>
        </el-form-item>
        <el-form-item label="客户状态" prop="customer_stage">
           <el-input v-model="customer.customer_stage"></el-input>
        </el-form-item>
        <el-form-item label="客户来源id" prop="customer_origin">
           <el-input v-model="customer.customer_origin"></el-input>
        </el-form-item>
         <el-form-item label="客户地址" prop="customer_address">
            <el-input v-model="customer.customer_address"></el-input>
        </el-form-item>
        <el-form-item label="客户创建时间" prop="customer_address">
            <el-input v-model="customer.customer_address"></el-input>
        </el-form-item>
      </el-form>
      <div class="top">跟进信息</div><p></p>
      <el-form  ref="follow" :rules="rules" :model="follow" label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
        <!-- <el-form-item label="最后跟进时间" prop="end_time"> 
           <el-date-picker
            v-model="follow.end_time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item> -->       
        <el-form-item label="跟进次数" prop="follow_count">
           <el-row>
            <el-col span="11">
            <el-input v-model="follow.follow_count"></el-input>
          </el-col>
          <el-col span="2">
            <span>&nbsp;&nbsp;至</span>
          </el-col>
           <el-col span="11">
            <el-input v-model="follow.follow_count"></el-input>
          </el-col>
          </el-row>
        </el-form-item> 
         <el-form-item label="多少天未跟进">
          <el-input v-model="follow.create_user"></el-input>
        </el-form-item>
      </el-form>
      <div class="top">订单信息</div><p></p>
      <el-form  ref="order" :rules="rules" :model="order" label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
        <el-form-item label="成交次数" prop="success_count"> 
            <el-row>
            <el-col span="11">
            <el-input v-model="order.success_count"></el-input>
          </el-col>
          <el-col span="2">
            <span>&nbsp;&nbsp;至</span>
          </el-col>
           <el-col span="11">
            <el-input v-model="order.success_count"></el-input>
          </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="成交总额" prop="total">
           <el-row>
            <el-col span="11">
            <el-input v-model="order.total"></el-input>
          </el-col>
          <el-col span="2">
            <span>&nbsp;&nbsp;至</span>
          </el-col>
           <el-col span="11">
            <el-input v-model="order.total"></el-input>
          </el-col>
          </el-row>
        </el-form-item> 
      </el-form>
      <div class="top">投诉信息</div><p></p>
      <el-form  ref="complaint" :rules="rules" :model="complaint" label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
        <el-form-item label="投诉次数" prop="complaint_count"> 
            <el-row>
            <el-col span="11">
            <el-input v-model="complaint.complaint_count"></el-input>
          </el-col>
          <el-col span="2">
            <span>&nbsp;&nbsp;至</span>
          </el-col>
           <el-col span="11">
            <el-input v-model="complaint.complaint_count"></el-input>
          </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <p></p>
      <div style="text-align:right">
        <el-button @click="cancel">取消</el-button>
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
  methods:{
    cancel(){
      this.$emit('setdialog')
    }
  }
}
</script>