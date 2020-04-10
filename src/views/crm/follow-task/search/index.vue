<template>
  <div v-if="dialogVisible">
    <el-dialog title="搜索" :visible.sync="dialogVisible">
      <el-form ref="searchQuery" :model="searchQuery" label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
        <el-form-item label="创建时间" prop="createTime">
          <el-date-picker
            v-model="createTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="客户名称" prop="customerName">
          <el-input v-model="searchQuery.customerName" />
        </el-form-item>
        <el-form-item label="联系人名称" prop="relationName">
          <el-input v-model="searchQuery.relationName" />
        </el-form-item>
        <el-form-item label="安排人名称" prop="arrangeName">
          <el-input v-model="searchQuery.arrangeName" />
        </el-form-item>
        <el-form-item label="负责人名称" prop="chargeName">
          <el-input v-model="searchQuery.chargeName" />
        </el-form-item>
        <el-form-item label="负责人电话" prop="relationPhone">
          <el-input v-model="searchQuery.relationPhone" />
        </el-form-item>

        <el-form-item label="是否已读" prop="read">
          <span>
            <el-radio v-model="read" :value="1">不限</el-radio>
            <el-radio v-model="read" :label="2">未读</el-radio>
            <el-radio v-model="read" :label="3">已读</el-radio>
          </span>
        </el-form-item>
        <el-form-item label="任务状态" prop="complete">
          <span>
            <el-radio v-model="complete" :label="1">不限</el-radio>
            <el-radio v-model="complete" :label="2">未执行</el-radio>
            <el-radio v-model="complete" :label="3">失败</el-radio>
            <el-radio v-model="complete" :label="4">完成</el-radio>
          </span>
        </el-form-item>
      </el-form>
      <div style="margin-left:600px;margin-top:50px">
        <el-button size="small" type="primary" @click="search()">确认</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import moment from 'moment'
export default {
  data() {
    return {
      dialogVisible: false,
      complete: '',
      read: '',
      createTime: '',
      searchQuery: {
        isComplete: '',
        notComplete: '',
        notExecute: '',
        isRead: '',
        notRead: '',
        customerName: '',
        relationName: '',
        arrangeName: '',
        chargeName: '',
        relationPhone: '',
        minDate: '',
        maxDate: ''
      }
    }
  },

  methods: {
    show() {
      this.dialogVisible = true
    },
    clearData() {
      this.searchQuery = {
        isComplete: '',
        notComplete: '',
        notExecute: '',
        isRead: '',
        notRead: '',
        customerName: '',
        relationName: '',
        arrangeName: '',
        chargeName: '',
        relationPhone: '',
        minDate: '',
        maxDate: ''
      }
      this.createTime = ''
      this.read = ''
      this.complete = ''
    },
    /**
     * 点击确定，验证并提交表单，触发父组件方法
     * method:cancel()
     */
    search() {
      console.log('点击了按钮')
      // 处理搜索数据
      if (this.createTime) {
        this.searchQuery.minDate = moment(this.createTime[0]).format('YYYY-MM-DD')
        this.searchQuery.maxDate = moment(this.createTime[1]).format('YYYY-MM-DD')
        this.searchQuery.minDate = this.createTime[0]
        this.searchQuery.maxDate = this.createTime[1]
        console.log(this.searchQuery)
      }

      if (this.complete === 1) {
        this.searchQuery.notExecute = ''
        this.searchQuery.notComplete = ''
        this.searchQuery.isComplete = ''
      }
      if (this.complete === 2) {
        this.searchQuery.notExecute = 'true'
      }
      if (this.complete === 3) {
        this.searchQuery.notComplete = 'true'
      }
      if (this.complete === 4) {
        this.searchQuery.isComplete = 'true'
      }
      if (this.read === 1) {
        this.searchQuery.isRead = ''
        this.searchQuery.noRread = ''
      }
      if (this.read === 2) {
        this.searchQuery.notRead = 'true'
      }
      if (this.read === 3) {
        this.searchQuery.isRead = 'true'
      }

      // 返回搜索数据给数据
      this.$emit('updatelist', this.searchQuery)
      console.log('点击了按钮2')
      console.log(this.searchQuery)
      this.dialogVisible = false
      this.clearData()
    }
  }
}
</script>
