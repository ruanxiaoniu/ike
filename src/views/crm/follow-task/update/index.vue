<template>
  <div>
    <el-form ref="customer" :rules="rules" :model="customer" label-position="left" label-width="150px"
             style="width: 500px; margin-left:50px;">
      <el-form-item label="负责人id" prop="customer_name">
        <el-row>
          <el-col span="18">
            <el-input v-model="customer.customer_name"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="客户id" prop="customer_name">
        <el-row>
          <el-col span="18">
            <el-input v-model="customer.customer_name"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="联系人id" prop="customer_stage">
        <el-row>
          <el-col span="18">
            <el-input v-model="customer.customer_stage"></el-input>
          </el-col>
          <el-col span="6" style="text-align:right">
            <el-button size="small" icon="el-icon-edit" @click="handle('stage')">编辑</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="安排内容" prop="customer_level">
        <el-row>
          <el-col span="18">
            <el-input v-model="customer.customer_level"></el-input>
          </el-col>
          <el-col span="6" style="text-align:right">
            <el-button size="small" icon="el-icon-edit" @click="handle('level')">编辑</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="已读状态" prop="customer_level">
        <el-row>
          <el-col span="18">
            <el-input v-model="customer.customer_level"></el-input>
          </el-col>
          <el-col span="6" style="text-align:right">
            <el-button size="small" icon="el-icon-edit" @click="handle('level')">编辑</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="完成状态" prop="customer_level">
        <el-row>
          <el-col span="18">
            <el-input v-model="customer.customer_level"></el-input>
          </el-col>
          <el-col span="6" style="text-align:right">
            <el-button size="small" icon="el-icon-edit" @click="handle('level')">编辑</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>

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
    components: {
      level,
      stage,
      origin,
    },
    data() {
      return {
        title: '',
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
          profit: '',

        },
        complaint: {
          complaint_count: '',
          complaint_type: '',
          complaint_method: '',
          urge: '',
        },
        return_refund: {
          return_total: '',
          own_total: '',
          return_total: '',
          return_count: '',
          end_time: '',
          end_total: '',
          return_total: '',
        }
      }
    },
    methods: {
      handle(type) {
        this.title = type
        this.dialogFlag = true
      }
    }
  }
</script>
