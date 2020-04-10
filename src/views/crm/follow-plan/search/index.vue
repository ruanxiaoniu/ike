<template>
  <div v-if="dialogVisible">
    <el-dialog title="搜索" :visible.sync="dialogVisible">
      <el-form ref="searchQuery" :model="searchQuery" label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
        <el-form-item label="计划时间" prop="planDate">
          <el-date-picker
            v-model="planTime"
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
        <el-form-item label="联系人电话" prop="relationPhone">
          <el-input v-model="searchQuery.relationPhone" />
        </el-form-item>

        <el-form-item label="计划内容" prop="planContent">
          <el-input v-model="searchQuery.planContent" />
        </el-form-item>
        <el-form-item label="是否执行" prop="isExecute">
          <span>
            <el-radio v-model="isExecute" :label="0">已执行</el-radio>
            <el-radio v-model="isExecute" :label="1">未执行</el-radio>
          </span>
        </el-form-item>
        <el-form-item label="是否完成" prop="iscomplete">
          <span>
            <el-radio v-model="iscomplete" :label="0">完成</el-radio>
            <el-radio v-model="iscomplete" :label="1">未完成</el-radio>
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
      iscomplete: '',
      isExecute: '',
      planTime: '',
      searchQuery: {
        isComplete: '',
        notComplete: '',
        planContent: '',
        customerName: '',
        relationName: '',
        relationPhone: '',
        minDate: '',
        maxDate: '',
        notExecute: ''
      }
    }
  },
  methods: {
    show() {
      this.clearData()
      this.dialogVisible = true
    },
    clearData() {
      this.searchQuery = {
        iscomplete: '',
        notcomplete: '',
        planContent: '',
        customerName: '',
        relationName: '',
        relationPhone: '',
        minDate: '',
        maxDate: ''
      }
      this.planTime = ''
      this.iscomplete = ''
      this.isExecute = ''
    },
    search() {
      // 处理搜索数据
      if (this.planTime) {
        this.searchQuery.minDate = moment(this.planTime[0]).format('YYYY-MM-DD')
        this.searchQuery.maxDate = moment(this.planTime[1]).format('YYYY-MM-DD')
      }

      if (this.isExecute === 1) {
        this.searchQuery.notExecute = 'true'
      } else {
        if (this.iscomplete === 1) {
          this.searchQuery.notComplete = 'true'
        } else {
          this.searchQuery.isComplete = 'true'
        }
      }

      // 返回搜索数据给数据
      this.$emit('updatelist', this.searchQuery)
      this.clearData()
      this.dialogVisible = false
    }
  }
}
</script>
