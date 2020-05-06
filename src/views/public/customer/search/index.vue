<template>
  <div v-if="dialogVisible">
    <el-dialog title="搜索" :visible.sync="dialogVisible">
      <div class="top">客户信息</div><p />
      <el-form ref="searchQuery" :model="searchQuery" label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
        <el-form-item label="客户名称" prop="customerName">
          <el-input v-model="searchQuery.customerName" />
        </el-form-item>
        <el-form-item label="客户阶段" prop="customerStageId">
          <el-select v-model="searchQuery.customerStageId" style="width:100%" placeholder="请选择客户阶段">
            <el-option v-for="(item) in stageList" :key="item.id" :label="item.stageName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="客户等级" prop="customerLevelId">
          <el-select v-model="searchQuery.customerLevelId" style="width:100%" placeholder="请选择客户等级">
            <el-option v-for="(item) in levelList" :key="item.id" :label="item.levelName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="客户状态" prop="customerState">
          <el-select v-model="searchQuery.customerState" style="width:100%" placeholder="请选择客户状态">
            <el-option v-for="item in customerStatus" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="客户来源" prop="customerOriginId">
          <el-select v-model="searchQuery.customerOriginId" style="width:100%" placeholder="请选择客户来源" >
            <el-option v-for="(item) in originList" :key="item.id" :label="item.originName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="客户地址" prop="customerAddress">
          <el-input v-model="searchQuery.customerAddress" />
        </el-form-item>
        <el-form-item label="客户创建时间">
          <el-date-picker
            v-model="creatRang"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <div class="top">跟进信息</div><p />
        <el-form-item label="跟进次数" prop="followMinCount">
          <el-row>
            <el-col span="11">
              <el-input v-model="searchQuery.followMinCount" />
            </el-col>
            <el-col span="2">
              <span>&nbsp;&nbsp;至</span>
            </el-col>
            <el-col span="11">
              <el-input v-model="searchQuery.followMaxCount" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="多少天未跟进">
          <el-input v-model="searchQuery.differFollow" />
        </el-form-item>
        <div class="top">订单信息</div><p />
        <el-form-item label="成交次数">
          <el-row>
            <el-col span="11">
              <el-input v-model="searchQuery.orderMinCount" />
            </el-col>
            <el-col span="2">
              <span>&nbsp;&nbsp;至</span>
            </el-col>
            <el-col span="11">
              <el-input v-model="searchQuery.orderMaxCount" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="成交总额">
          <el-row>
            <el-col span="11">
              <el-input v-model="searchQuery.orderMinSum" />
            </el-col>
            <el-col span="2">
              <span>&nbsp;&nbsp;至</span>
            </el-col>
            <el-col span="11">
              <el-input v-model="searchQuery.orderMaxSum" />
            </el-col>
          </el-row>
        </el-form-item>
        <div class="top">投诉信息</div><p />
        <el-form-item label="投诉次数">
          <el-row>
            <el-col span="11">
              <el-input v-model="searchQuery.complainMinCount" />
            </el-col>
            <el-col span="2">
              <span>&nbsp;&nbsp;至</span>
            </el-col>
            <el-col span="11">
              <el-input v-model="searchQuery.complainMaxCount" />
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <p />
      <div style="text-align:right">
        <el-button @click="dialogVisible = !dialogVisible">取消</el-button>
        <el-button type="primary" @click="search">确认</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import { customerStatus } from '@/utils/common.js'
import { getCustomerAllOrigin, getCustomerAllStage, getCustomerAllLevel, getCustomerAll } from '@/api/customer'
import moment from 'moment'
export default {
  data() {
    return {
      customerStatus,
      creatRang: '',
      stageList: null,
      originList: null,
      levelList: null,
      dialogVisible: false,
      searchQuery: {
        customerName: '',
        employeeId: '',
        customerStageId: '',
        customerState: '',
        customerIntroduce: '',
        customerAddress: '',
        customerLevelId: '',
        customerOriginId: '',
        createMin: '',
        createMax: '',
        isToday: '',
        orderMinSum: '',
        orderMaxSum: '',
        orderMinCount: '',
        orderMaxCount: '',
        complainMinCount: '',
        complainMaxCount: '',
        differMin: '',
        differMax: '',
        isFollowed: '',
        followMinCount: '',
        followMaxCount: '',
        employIds: '',
      }

    }
  },
  methods: {
    show() {
      this.getStage()
      this.getLevel()
      this.getOrigin()
      this.dialogVisible = true
    },
    clearData(){
       this.searchQuery = {
        customerName: '',
        employeeId: '',
        customerStageId: '',
        customerState: '',
        customerIntroduce: '',
        customerAddress: '',
        customerLevelId: '',
        customerOriginId: '',
        createMin: '',
        createMax: '',
        isToday: '',
        orderMinSum: '',
        orderMaxSum: '',
        orderMinCount: '',
        orderMaxCount: '',
        complainMinCount: '',
        complainMaxCount: '',
        differMin: '',
        differMax: '',
        isFollowed: '',
        followMinCount: '',
        followMaxCount: '',
        employIds: '',
      }
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
    search() {
      this.$emit('submitSearch', this.searchQuery)
      this.dialogVisible = false
      this.clearData()
    },
    // 格式化时间
    formatDate(time) {
      return moment(time).format('YYYY-MM-DD')
    }
  }
}
</script>
