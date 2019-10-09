<template>
  <div>
    <div class="top">客户信息</div><p></p>
      <el-form  ref="customer" :rules="rules" :model="customer" label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
        <el-form-item label="客户名称" prop="customer_name">
          <el-row>
            <el-col span="18">
              <el-input v-model="customer.customer_name"></el-input>
            </el-col>
          </el-row> 
        </el-form-item>
        <el-form-item label="客户阶段" prop="customer_stage">
          <el-row>
            <el-col span="18">
              <el-input v-model="customer.customer_stage"></el-input>
            </el-col>
            <el-col span="6" style="text-align:right">
              <el-button size="small" icon="el-icon-edit" @click="handle('stage')">编辑</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="客户等级" prop="customer_level">
          <el-row>
            <el-col span="18">
              <el-input v-model="customer.customer_level"></el-input>
            </el-col>
            <el-col span="6" style="text-align:right">
              <el-button size="small" icon="el-icon-edit" @click="handle('level')">编辑</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="客户状态" prop="customer_stage">
          <el-row>
            <el-col span="18">
              <el-input v-model="customer.customer_stage"></el-input>
            </el-col>
          </el-row> 
        </el-form-item>
        <el-form-item label="客户来源" prop="customer_origin">
           <el-row>
            <el-col span="18">
              <el-input v-model="customer.customer_level"></el-input>
            </el-col>
            <el-col span="6" style="text-align:right">
              <el-button size="small" icon="el-icon-edit" @click="handle('orgin')">编辑</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="客户介绍" prop="custoemr_introduce">
           <el-row>
            <el-col span="18">
              <el-input v-model="customer.customer_stage"></el-input>
            </el-col>
          </el-row> 
        </el-form-item>
         <el-form-item label="客户地址" prop="customer_address">
            <el-row>
            <el-col span="18">
              <el-input type="textarea" v-model="customer.customer_stage"></el-input>
            </el-col>
          </el-row> 
        </el-form-item>
      </el-form>
      <div class="top">主联系人信息</div><p></p>
      <el-form  ref="follow" :rules="rules" :model="follow" label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
        <el-form-item label="联系人姓名" prop="end_time"> 
           <el-date-picker
            v-model="follow.end_time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="联系人性别" prop="create_time">
          <el-input v-model="follow.create_user"></el-input>
        </el-form-item>
        <el-form-item label="联系人称呼">
          <el-input v-model="follow.create_user"></el-input>
        </el-form-item>
        <el-form-item label="联系人手机号" prop="follow_count">
          <el-input v-model="follow.create_user"></el-input>
        </el-form-item> 
         <el-form-item label="联系人邮箱" prop="create_time">
           <el-input v-model="follow.create_user"></el-input>
        </el-form-item>
        <el-form-item label="座机号" prop="create_time">
           <el-input v-model="follow.create_user"></el-input>
        </el-form-item>
      </el-form>
      <p></p>
      <div style="text-align:right">
        <el-button>取消</el-button>
        <el-button type="primary">确认</el-button>
      </div>

      <el-dialog :title="textMap[title]" :visible.sync="dialogFlag" append-to-body>
        <level v-if="title=='level'"></level>
        <stage v-else-if="title=='stage'"></stage>
        <origin v-else></origin>
      </el-dialog>
  </div>
</template>
<script>
import level from '../../../public/customer/level'
import stage from '../../../public/customer/stage'
import origin from '../../../public/customer/origin'
export default {
  components:{
     level,
     stage,
     origin,
  },
  data() {
    return {
      title:'',
      dialogFlag:false,
      textMap:{
        stage:'客户阶段管理',
        level:'客户等级管理',
        origin:'客户来源管理'
      },
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
    handle(type){
      this.title=type
      this.dialogFlag=true
    }
  }
}
</script>