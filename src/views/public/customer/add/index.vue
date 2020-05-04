<template>
  <div v-if="dialogVisible">
    <el-dialog title="新建" :visible.sync="dialogVisible">
      <div class="top">客户信息</div><p />
      <el-form ref="customer" :rules="rules" :model="customer" label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
        <el-form-item label="客户名称" prop="customerName">
          <el-row>
            <el-col :span="18">
              <el-input v-model="customer.customerName" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="负责人" prop="employeeId">
          <el-row>
            <el-col :span="18">
              <!-- 可进行远程搜索 -->
              <el-select
                v-model="customer.employeeId"
                filterable
                remote
                reserve-keyword
                style="width:100%"
                placeholder="请输入关键词"
                :remote-method="remoteMethod"
                :loading="loading"
              >
                <el-option
                  v-for="item in employeeOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="客户阶段" prop="customerStageId">
          <el-row>
            <el-col :span="18">
              <el-select v-model="customer.customerStageId" style="width:100%" placeholder="请选择客户阶段" @change="changeStage">
                <el-option v-for="(item) in stageList" :key="item.id" :label="item.stageName" :value="item.id" />
              </el-select>
            </el-col>
            <el-col :span="6" style="text-align:right">
              <el-button size="small" icon="el-icon-edit" @click="handle('stage')">编辑</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="客户等级" prop="customerLevelId">
          <el-row>
            <el-col :span="18">
              <el-select v-model="customer.customerLevelId" style="width:100%" placeholder="请选择客户等级" @change="changeStage">
                <el-option v-for="(item) in levelList" :key="item.id" :label="item.levelName" :value="item.id" />
              </el-select>
            </el-col>
            <el-col span="6" style="text-align:right">
              <el-button size="small" icon="el-icon-edit" @click="handle('level')">编辑</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="客户状态" prop="customerState">
          <el-row>
            <el-col :span="18">
              <el-select v-model="customer.customerState" style="width:100%" placeholder="请选择客户状态">
                <el-option label="冷却" value="冷却" />
                <el-option label="潜在" value="潜在" />
                <el-option label="意向" value="意向" />
                <el-option label="成交" value="成交" />
                <el-option label="失败" value="失败" />
                <el-option label="流失" value="流失" />
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="客户来源" prop="customerOriginId">
          <el-row>
            <el-col :span="18">
              <el-select v-model="customer.customerOriginId" style="width:100%" placeholder="请选择客户来源" @change="changeStage">
                <el-option v-for="(item) in originList" :key="item.id" :label="item.originName" :value="item.id" />
              </el-select>
            </el-col>
            <el-col :span="6" style="text-align:right">
              <el-button size="small" icon="el-icon-edit" @click="handle('origin')">编辑</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="客户介绍" prop="customerIntroduce">
          <el-row>
            <el-col :span="18">
              <el-input v-model="customer.customerIntroduce" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="客户地址" prop="customerAddress">
          <el-row>
            <el-col :span="18">
              <el-input v-model="customer.customerAddress" type="textarea" />
            </el-col>
          </el-row>
        </el-form-item>
        <div class="top">主联系人信息</div><p />
        <el-form-item label="联系人姓名" prop="relationName">
          <el-input v-model="customer.relationName" />
        </el-form-item>
        <el-form-item label="联系人性别" prop="relationSex">
          <el-radio v-model="customer.relationSex" :label="femail">男</el-radio>
          <el-radio v-model="customer.relationSex" :label="mail">女</el-radio>
        </el-form-item>
        <el-form-item label="联系人称呼" prop="relationCall">
          <el-input v-model="customer.relationCall" />
        </el-form-item>
        <el-form-item label="联系人职务" prop="relationPosition">
          <el-input v-model="customer.relationPosition" />
        </el-form-item>
        <el-form-item label="联系人手机号" prop="relationPhone">
          <el-input v-model="customer.relationPhone" />
        </el-form-item>
        <el-form-item label="联系人邮箱" prop="relationEmail">
          <el-input v-model="customer.relationEmail" />
        </el-form-item>
        <el-form-item label="座机号" prop="landlineNumber">
          <el-input v-model="customer.landlineNumber" />
        </el-form-item>
      </el-form>
      <p />
      <div style="text-align:right">
        <el-button size="small" @click="dialogVisible = !dialogVisible">取消</el-button>
        <el-button type="primary" size="small" @click="resetForm('customer')">重置</el-button>
        <el-button type="primary" size="small" @click="add('customer')">确认</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="textMap[title]" :visible.sync="dialogFlag" append-to-body width="60%">
      <levelEdit v-if="title=='level'"  @setvalue="setValue" @updatelist="getLevel" />
      <stageEdit v-else-if="title=='stage'" @setvalue="setValue" @updatelist="getStage" />
      <originEdit v-else-if="title=='origin'"  @setvalue="setValue" @updatelist="getOrigin" />
    </el-dialog>
  </div>
</template>
<script>
import stageEdit from '../edit/stage'
import levelEdit from '../edit/level'
import originEdit from '../edit/origin'
import { getCustomerAllOrigin, getCustomerAllStage, getCustomerAllLevel, addCustomer } from '@/api/customer'
import { getEmployeeAll } from '@/api/employee'
import moment from 'moment'
export default {
  components: {
    stageEdit,
    levelEdit,
    originEdit
  },
  data() {
    return {
      dialogVisible: false,
      title: '',
      stageId: '',
      originId: '',
      stageList: null,
      originList: null,
      levelList: null,
      dialogFlag: false,
      employeeOptions: null, // 员工选项
      employeeFilter: null, // 用于远程搜索
      loading: false,
      // 性别绑定
      femail: false,
      mail: true,
      textMap: {
        stage: '编辑——客户阶段',
        level: '编辑——客户等级',
        origin: '编辑——客户来源'
      },
      customer: {
        customerName: '',
        employeeId: '',
        customerStageId: '',
        customerState: '',
        customerIntroduce: '',
        customerAddress: '',
        customerLevelId: '',
        customerOriginId: '',
        relationCall: '',
        relationEmail: '',
        relationName: '',
        relationPhone: '',
        relationPosition: '',
        relationSex: '',
        landlineNumber: ''
      },
      rules: {
        customerName: [
          { required: true, message: '请输入客户名', trigger: 'blur' }
        ],
        employeeId: [
          { required: true, message: '请选择负责人', trigger: 'blur' }
        ],
        customerStageId: [
          { required: true, message: '请选择客户阶段', trigger: 'blur' }
        ],
        customerLevelId: [
          { required: true, message: '请选择客户等级', trigger: 'blur' }
        ],
        customerState: [
          { required: true, message: '请选择客户状态', trigger: 'blur' }
        ],
        customerOriginId: [
          { required: true, message: '请选择客户来源', trigger: 'blur' }
        ],
        relationName: [
          { required: true, message: '请输入联系人姓名', trigger: 'blur' }
        ],
        relationPhone: [
          { required: true, message: '请输入联系人手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入正确的手机号', tigger: 'blur' }
        ],
        landlineNumber: [
          { required: true, message: '请输入联系人座机号', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getEmployee()
    this.getStage()
    this.getLevel()
    this.getOrigin()
  },
  methods: {
    show() {
      this.dialogVisible = true
    },
    hide(){
      this.dialogVisible = false
    },
    // 获取员工信息
    getEmployee() {
      getEmployeeAll().then(res => {
        this.employeeOptions = res.data
        this.employeeFilter = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取表中的阶段信息
    getStage() {
      getCustomerAllStage().then(res => {
        this.stageList = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取表中的来源信息
    getOrigin() {
      getCustomerAllOrigin().then(res => {
        this.originList = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取表中的等级信息
    getLevel() {
      getCustomerAllLevel().then(res => {
        this.levelList = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    // 远程搜索负责人
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.employeeOptions = this.employeeFilter.filter(item => {
            return item.name.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        }, 100)
      } else {
        this.employeeOptions = this.employeeFilter
      }
    },
    handle(type) {
      this.title = type
      this.dialogFlag = true
    },
    // 客户选择回显
    setValue(val) {
      console.log('选择的选项')
      this.setVisible()
      this.editVal = val
      this.editFlag = true
      this.originId = val.originName
      this.originName = val.originName
      console.log(val)
    },
    clearData(){
      this.customer = {
            customerName: '',
            employeeId: '',
            customerStageId: '',
            customerState: '',
            customerIntroduce: '',
            customerAddress: '',
            customerLevelId: '',
            customerOriginId: '',
            relationCall: '',
            relationEmail: '',
            relationName: '',
            relationPhone: '',
            relationPosition: '',
            relationSex: '',
            landlineNumber: ''
      }
    },
    // 提交添加
    add(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.customer.followTime = moment(this.customer.followTime).format('YYYY-MM-DD HH:SS:MM')
          console.log('moment');
          
          console.log(this.customer)
          addCustomer(this.customer).then(res => {
            this.$emit('updatelist')
            this.dialogVisible = false
            this.$message.success('新建成功！')
            this.clearData()
          }).catch(err => {
            console.log('失败啦啦啦')
            console.log(err)
            this.$message.error('新建失败，请重试！')
          })
        } else {
          return false
        }
      })
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 取消创建
    cancel() {
      this.resetForm()
      this.$emit('setdialog')
    }
  }
}
</script>
