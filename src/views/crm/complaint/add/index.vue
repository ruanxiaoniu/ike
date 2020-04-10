<template>
  <div v-if="dialogVisible">
    <el-dialog title="新建投诉" :visible.sync="dialogVisible">
      <el-form ref="customer" :rules="rules" :model="customer" label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
        <el-form-item label="负责人" prop="chargerName">
          <el-row>
            <el-col :span="18">
              <employeeSelect v-model="customer.chargerName" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="客户名称" prop="customerStage">
          <el-row>
            <el-col :span="18">
              <el-input v-model="customer.customer_stage" />
            </el-col>
            <el-col :span="6" style="text-align:right">
              <el-button size="small" icon="el-icon-edit" @click="handle('stage')">编辑</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="投诉时间" prop="customer_level">
          <el-row>
            <el-col :span="18">
              <el-input v-model="customer.customer_level" />
            </el-col>
            <el-col :span="6" style="text-align:right">
              <el-button size="small" icon="el-icon-edit" @click="handle('level')">编辑</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="投诉类型" prop="customer_stage">
          <el-row>
            <el-col :span="18">
              <el-input v-model="customer.customer_stage" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="客户联系方式" prop="customer_origin">
          <el-input v-model="customer.customer_level" />
        </el-form-item>
        <el-form-item label="投诉标题" prop="custoemr_introduce">
          <el-row>
            <el-col :span="18">
              <el-input v-model="customer.customer_stage" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="投诉内容" prop="customer_address">
          <el-row>
            <el-col :span="18">
              <el-input v-model="customer.customer_stage" type="textarea" />
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :title="textMap[title]" :visible.sync="dialogFlag" append-to-body>
      <level v-if="title=='level'" />
      <stage v-else-if="title=='stage'" />
      <origin v-else />
    </el-dialog>
  </div>
</template>
<script>
import level from '../../../public/customer/level'
import stage from '../../../public/customer/stage'
import origin from '../../../public/customer/origin'
import employeeSelect from '../../../public/employeeSelect/employeeSelect'

export default {
  components: {
    level,
    stage,
    origin,
    employeeSelect
  },
  data() {
    return {
      title: '',
      dialogVisible: false,
      dialogFlag: false,
      textMap: {
        stage: '客户阶段管理',
        level: '客户等级管理',
        origin: '客户来源管理'
      },
      customer: {
        customer_name: '',
        customer_stage: '',
        customer_state: '',
        customer_introduce: '',
        customer_address: '',
        customer_level: '',
        customer_origin: ''
      },
      follow: {
        end_follow: '',
        create_time: '',
        create_user: '',
        follow_count: ''
      },
      order: {
        success_count: '',
        end_time: '',
        product_count: '',
        total: '',
        profit: ''

      },
      complaint: {
        complaint_count: '',
        complaint_type: '',
        complaint_method: '',
        urge: ''
      }
    }
  },
  methods: {
    handle(type) {
      this.title = type
      this.dialogFlag = true
    },
    show() {
      this.dialogVisible = true
    }
  }
}
</script>
