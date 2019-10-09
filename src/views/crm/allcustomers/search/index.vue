<template>
  <div>
    <div class="top">客户信息</div><p></p>
      <el-form  ref="customer" :rules="rules" :model="customer" label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
        <el-form-item label="客户名称" prop="customer_name"> 
          <el-input v-model="customer.customer_name"></el-input>
        </el-form-item>
        <el-form-item label="客户阶段" prop="customer_stage">
          <el-input v-model="customer.customer_stage"></el-input>
        </el-form-item>
        <el-form-item label="客户等级" prop="customer_level">
           <el-input v-model="customer.customer_level"></el-input>
        </el-form-item>
        <el-form-item label="客户状态" prop="customer_stage">
           <el-input v-model="customer.customer_stage"></el-input>
        </el-form-item>
        <el-form-item label="客户来源" prop="customer_origin">
           <el-input v-model="customer.customer_origin"></el-input>
        </el-form-item>
        <el-form-item label="客户介绍" prop="custoemr_introduce">
           <el-input v-model="customer.custoemr_introduce"></el-input>
        </el-form-item>
         <el-form-item label="客户地址" prop="customer_address">
            <el-input v-model="customer.customer_address"></el-input>
        </el-form-item>
      </el-form>
      <div class="top">跟进信息</div><p></p>
      <el-form  ref="follow" :rules="rules" :model="follow" label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
        <el-form-item label="最后跟进时间" prop="end_time"> 
           <el-date-picker
            v-model="follow.end_time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
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
        <el-form-item label="录入人">
          <el-input v-model="follow.create_user"></el-input>
        </el-form-item>
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
        <el-form-item label="最后成交时间" prop="end_time">
           <el-date-picker
            v-model="order.end_time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          
        </el-form-item>
        <el-form-item label="成交产品总数" prop="product_count">
          <el-input v-model="order.product_count"></el-input>
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
        <el-form-item label="利润" prop="profit">
           <el-row>
            <el-col span="11">
            <el-input v-model="order.profit"></el-input>
          </el-col>
          <el-col span="2">
            <span>&nbsp;&nbsp;至</span>
          </el-col>
           <el-col span="11">
            <el-input v-model="order.profit"></el-input>
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
        <el-form-item label="投诉类型" prop="complaint_type">
           <el-input v-model="complaint.complaint_type"></el-input>
        </el-form-item>
        <el-form-item label="投诉方式">
          <el-input v-model="complaint.complaint_method"></el-input>
        </el-form-item>
        <el-form-item label="紧急程度" prop="urge">
          <el-input v-model="complaint.urge"></el-input>
        </el-form-item> 
      
      </el-form>
       <div class="top">回款退款信息</div><p></p>
      <el-form  ref="return_refund" :rules="rules" :model="return_refund" label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
        <el-form-item label="回款总额" prop="return_total"> 
            <el-row>
            <el-col span="11">
            <el-input v-model="return_refund.return_total"></el-input>
          </el-col>
          <el-col span="2">
            <span>&nbsp;&nbsp;至</span>
          </el-col>
           <el-col span="11">
            <el-input v-model="return_refund.return_total"></el-input>
          </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="欠款总额" prop="own_total">
            <el-row>
            <el-col span="11">
            <el-input v-model="return_refund.own_total"></el-input>
          </el-col>
          <el-col span="2">
            <span>&nbsp;&nbsp;至</span>
          </el-col>
           <el-col span="11">
            <el-input v-model="return_refund.own_total"></el-input>
          </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="退款总额" prop="return_total">
           <el-row>
            <el-col span="11">
            <el-input v-model="return_refund.return_total"></el-input>
          </el-col>
          <el-col span="2">
            <span>&nbsp;&nbsp;至</span>
          </el-col>
           <el-col span="11">
            <el-input v-model="return_refund.return_total"></el-input>
          </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="退款总次数" prop="return_count">
          <el-row>
            <el-col span="11">
            <el-input v-model="return_refund.return_count"></el-input>
          </el-col>
          <el-col span="2">
            <span>&nbsp;&nbsp;至</span>
          </el-col>
           <el-col span="11">
            <el-input v-model="return_refund.return_count"></el-input>
          </el-col>
          </el-row>
        </el-form-item> 
         <el-form-item label="最后回款时间" prop="end_time">
           <el-date-picker
            v-model="return_refund.end_time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          
        </el-form-item> 
         <el-form-item label="最后回款金额" prop="end_total">
           <el-row>
            <el-col span="11">
            <el-input v-model="return_refund.end_total"></el-input>
          </el-col>
          <el-col span="2">
            <span>&nbsp;&nbsp;至</span>
          </el-col>
           <el-col span="11">
            <el-input v-model="return_refund.end_total"></el-input>
          </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="回款总次数" prop="refund_count">
          <el-row>
            <el-col span="11">
            <el-input v-model="return_refund.refund_count"></el-input>
          </el-col>
          <el-col span="2">
            <span>&nbsp;&nbsp;至</span>
          </el-col>
           <el-col span="11">
            <el-input v-model="return_refund.refund_count"></el-input>
          </el-col>
          </el-row>
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