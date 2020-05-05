<template>
  <div v-if="dialogVisible">
    <el-dialog title="搜索" :visible.sync="dialogVisible">
      <el-form ref="followForm" :model="followList" label-width="200px" style="width:500px">
        <el-form-item label="跟进时间:" prop="followTime">
          <el-date-picker
            v-model="followTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="客户联系人名称" prop="relationName">
          <el-input v-model="followList.relationName" />
        </el-form-item>
        <el-form-item v-if="editFlag" label="客户名称" prop="customerName">
          <el-input v-model="followList.customerName" />
        </el-form-item>
        <el-form-item label="跟进方式:" prop="followWay">
          <el-input v-model="followList.followWay" />
        </el-form-item>
        <el-form-item label="客户状态:" prop="customerStatus">
          <el-select v-model="followList.customerStatus" style="width:100%" placeholder="请选择客户状态">
            <el-option v-for="item in customerStatus" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="录入人:" prop="employeeIds">
          <el-select
            v-model="followList.employeeIds"
            size="small"
            placeholder="请选择"
            filterable
            remote
            reserve-keyword
            :remote-method="remoteMethod"
            style="width:100%"
          >
            <el-option v-for="(item) in employeeOptions" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <div style="margin-left:600px;margin-top:50px">
        <el-button size="small" type="primary" @click="search('followForm')">确认</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import { customerStatus } from '@/utils/common.js'
import { getEmployeeAll } from '@/api/employee'
import moment from 'moment'
import {parseTime} from '@/utils/formateDate'

export default {
  filters: {
    formateDate(date) {
      return parseTime(date)
    }
  },
  props: ['id', 'edit'],
  data() {
    return {
      customerStatus,
      dialogVisible: false,
      followList: {
        followWay: '',
        customerStatus: '',
        customerName: '',
        relationName: '',
        minTime: '',
        maxTime: '',
        employeeIds: ''
      },
      followTime: '',
      params: {},
      editFlag: false,
      employeeOptions: null,
      employeeFilter: null
    }
  },
  watch: {
    id(newVal) {
      this.params.id = newVal
      this.getDetai()
    },
    edit(newVal) {
      this.editFlag = newVal
    }
  },
  created() {
    if (this.id) {
      this.$set(this.params, 'id', this.id)
    }
    if (this.edit) {
      this.editFlag = this.edit
    }
    this.getEmployee()
  },
  methods: {
    show() {
      this.dialogVisible = true
    },
    /**
     * 获取所有成员，用于搜索
     * method:getEmployee()
     */
    getEmployee() {
      getEmployeeAll().then(res => {
        this.employeeOptions = res.data
        this.employeeFilter = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    /**
     * 远程搜索负责人
     * method:remoteMethod()
     */
    remoteMethod(query) {
      if (query !== '') {
        setTimeout(() => {
          this.employeeOptions = this.employeeFilter.filter(item => {
            return item.name.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        }, 100)
      } else {
        this.employeeOptions = this.employeeFilter
      }
    },
    /**
     * 点击取消，触发父组件方法
     * method:cancel()
     */
    cancel() {
      this.$emit('setdialog')
      this.followList = {
        followWay: '',
        customerStatus: '',
        customerName: '',
        relationName: '',
        minTime: '',
        maxTime: '',
        employeeIds: ''
      }
      this.followTime = ''
    },
    /**
     * 点击确定，验证并提交表单，触发父组件方法
     * method:cancel()
     */
    search() {
      // 处理搜索数据
      if (this.followTime) {
        this.followList.minTime = moment(this.followTime[0]).format('YYYY-MM-DD')
        this.followList.maxTime = moment(this.followTime[1]).format('YYYY-MM-DD')
      }

      // 返回搜索数据给数据
      this.$emit('updatelist', this.followList)
      this.dialogVisible = false
      this.followList = {
        followWay: '',
        customerStatus: '',
        customerName: '',
        relationName: '',
        minTime: '',
        maxTime: '',
        employeeIds: ''
      }
      this.followTime = ''
    }
  }
}
</script>
