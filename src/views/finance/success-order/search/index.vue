<template>
  <div v-if="dialogVisible">
    <el-dialog title="搜索" :visible.sync="dialogVisible">
      <el-form ref="searchQuery" :model="searchQuery" label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
        <el-form-item label="订单总数">
          <el-row>
            <el-col :span="11">
              <el-input v-model="searchQuery.orderCountMin" />
            </el-col>
            <el-col :span="2">
              <span>&nbsp;&nbsp;至</span>
            </el-col>
            <el-col :span="11">
              <el-input v-model="searchQuery.orderCountMax" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="订单总额">
          <el-row>
            <el-col :span="11">
              <el-input v-model="searchQuery.orderTotalMin" />
            </el-col>
            <el-col :span="2">
              <span>&nbsp;&nbsp;至</span>
            </el-col>
            <el-col :span="11">
              <el-input v-model="searchQuery.orderTotalMax" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="订单实际总额">
          <el-row>
            <el-col :span="11">
              <el-input v-model="searchQuery.orderActualTotalMin" />
            </el-col>
            <el-col :span="2">
              <span>&nbsp;&nbsp;至</span>
            </el-col>
            <el-col :span="11">
              <el-input v-model="searchQuery.orderActualTotalMax" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="订单成本">
          <el-row>
            <el-col :span="11">
              <el-input v-model="searchQuery.orderCostMin" />
            </el-col>
            <el-col :span="2">
              <span>&nbsp;&nbsp;至</span>
            </el-col>
            <el-col :span="11">
              <el-input v-model="searchQuery.orderCostMax" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="订单回款">
          <el-row>
            <el-col :span="11">
              <el-input v-model="searchQuery.orderGetSumMin" />
            </el-col>
            <el-col :span="2">
              <span>&nbsp;&nbsp;至</span>
            </el-col>
            <el-col :span="11">
              <el-input v-model="searchQuery.orderGetSumMax" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="订单利润">
          <el-row>
            <el-col :span="11">
              <el-input v-model="searchQuery.profitMin" />
            </el-col>
            <el-col :span="2">
              <span>&nbsp;&nbsp;至</span>
            </el-col>
            <el-col :span="11">
              <el-input v-model="searchQuery.profitMax" />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="下单时间">
          <el-date-picker
            v-model="orderTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="下单产品个数">
          <el-row>
            <el-col :span="11">
              <el-input v-model="searchQuery.productCountMin" />
            </el-col>
            <el-col :span="2">
              <span>&nbsp;&nbsp;至</span>
            </el-col>
            <el-col :span="11">
              <el-input v-model="searchQuery.productCountMax" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="客户名称">
          <customerSelect v-model="searchQuery.customerName" />
        </el-form-item>
        <el-form-item label="联系人名称">
          <el-select v-model="searchQuery.relationName" placeholder="请选择联系人">
            <el-option v-for="(item) in relationList" :key="item.id" :label="item.relationName" :value="item.id" />
          </el-select>
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
import { getOneRelation } from '@/api/customer'
import customerSelect from '../../../public/customer/customerSelect/customerSelect'
export default {
  components: {
    customerSelect
  },
  data() {
    return {
      Cid: '',
      relationList: [],
      dialogVisible: false,
      iscomplete: '',
      isExecute: '',
      orderTime: '',
      searchQuery: {
        relationName: '',
        productCountMin: '',
        productCountMax: '',
        customerName: '',
        profitMin: '',
        profitMax: '',
        orderGetSumMin: '',
        orderGetSumMax: '',
        orderCostMin: '',
        orderCostMax: '',
        orderTotalMin: '',
        orderTotalMax: '',
        orderActualTotalMin: '',
        orderActualTotalMax: '',
        orderCountMin: '',
        orderCountMax: ''
      }
    }
  },
  watch: {
    'searchQuery.customerName': function(newVal) {
      this.Cid = newVal
      this.relationList = []
      if (newVal !== '') {
        this.getRelation()
      }
    }
  },
  methods: {
    show() {
      this.clearData()
      this.dialogVisible = true
    },
    getRelation() {
      const params = {
        Cid: this.Cid
      }
      getOneRelation(params).then(res => {
        this.relationList = res.data
      // eslint-disable-next-line handle-callback-err
      }).catch(err => {

      })
    },
    clearData() {
      this.searchQuery = {
        relationName: '',
        productCountMin: '',
        productCountMax: '',
        customerName: '',
        profitMin: '',
        profitMax: '',
        orderGetSumMin: '',
        orderGetSumMax: '',
        orderCostMin: '',
        orderCostMax: '',
        orderTotalMin: '',
        orderTotalMax: '',
        orderActualTotalMin: '',
        orderActualTotalMax: '',
        orderCountMin: '',
        orderCountMax: ''
      }
      this.orderTime = ''
    },
    /**
     * 点击确定，验证并提交表单，触发父组件方法
     * method:cancel()
     */
    search() {
      // 处理搜索数据
      if (this.orderTime) {
        this.searchQuery.beginCreateTime = moment(this.orderTime[0]).format('YYYY-MM-DD')
        this.searchQuery.endCreateTime = moment(this.orderTime[1]).format('YYYY-MM-DD')
      }

      // 返回搜索数据给数据
      this.$emit('updatelist', this.searchQuery)
      this.dialogVisible = false
      this.clearData()
    }
  }
}
</script>
