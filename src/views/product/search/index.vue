<template>
  <div v-if="dialogVisible">
    <el-dialog title="搜索" :visible.sync="dialogVisible">
      <el-form ref="searchData" :model="searchData" label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
        <div class="top">产品信息：</div>
        <p />
        <el-form-item label="产品分类">
          <el-row>
            <el-col :span="18">
              <el-cascader
                ref="productClass"
                v-model="productClassId"
                :props="props"
                :options="productClass"
                placeholder="请选择产品类别"
                style="width:100%"
                :show-all-levels="false"
                @change="handleChange"
              />
            </el-col>
            <el-col :span="6">
              <el-button size="small" icon="el-icon-edit">编辑</el-button>
            </el-col>
          </el-row>

        </el-form-item>
        <el-form-item label="产品名称">
          <el-input v-model="searchData.productName" />
        </el-form-item>
        <el-form-item label="销售单价">
          <el-row>
            <el-col :span="11">
              <el-input v-model="searchData.salePriceMin" />
            </el-col>
            <el-col :span="2">
              <span>&nbsp;&nbsp;至</span>
            </el-col>
            <el-col :span="11">
              <el-input v-model="searchData.salePriceMax" />
            </el-col>
          </el-row>

        </el-form-item>
        <el-form-item label="成交成本总额度">
          <el-row>
            <el-col :span="11">
              <el-input v-model="searchData.costMin" />
            </el-col>
            <el-col :span="2">
              <span>&nbsp;&nbsp;至</span>
            </el-col>
            <el-col :span="11">
              <el-input v-model="searchData.costMax" />
            </el-col>
          </el-row>
        <!-- <el-input v-model="searchData.cost"></el-input> -->
        </el-form-item>
        <el-form-item label="单位">
          <el-row>
            <el-col :span="18">
              <el-select v-model="searchData.saleUnitId" placeholder="请选择销售单位" style="width:100%">
                <el-option v-for="(item) in saleUnit" :key="item.id" :label="item.saleUnitName" :value="item.id" />
              </el-select>
            </el-col>
            <el-col :span="2" />
            <el-col :span="4">
              <el-button size="small" icon="el-icon-edit">编辑</el-button>
            </el-col>
          </el-row>

        </el-form-item>
        <el-form-item label="销售状态">
          <el-select v-model="searchData.onSale" placeholder="请选择销售状态">
            <el-option label="上架" value="上架" />
            <el-option label="下架" value="下架" />
          </el-select>
        </el-form-item>
        <el-form-item label="上市时间">
          <el-date-picker
            v-model="ttm"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>

        <div class="top">产品订单信息：</div>
        <p />
        <el-form-item label="录入时间" prop="createTime">
          <el-date-picker
            v-model="createTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="成交数量">
          <el-row>
            <el-col :span="11">
              <el-input v-model="searchData.orderNumMin" />
            </el-col>
            <el-col :span="2">
              <span>&nbsp;&nbsp;至</span>
            </el-col>
            <el-col :span="11">
              <el-input v-model="searchData.orderNumMax" />
            </el-col>
          </el-row>

        </el-form-item>
        <el-form-item label="成交次数">
          <el-row>
            <el-col :span="11">
              <el-input v-model="searchData.orderTimesMin" />
            </el-col>
            <el-col :span="2">
              <span>&nbsp;&nbsp;至</span>
            </el-col>
            <el-col :span="11">
              <el-input v-model="searchData.orderTimesMax" />
            </el-col>
          </el-row>
        <!-- <el-input v-model="searchData.order_num"></el-input> -->
        </el-form-item>
        <el-form-item label="成交总额度">
          <el-row>
            <el-col :span="11">
              <el-input v-model="searchData.orderCountMin" />
            </el-col>
            <el-col :span="2">
              <span>&nbsp;&nbsp;至</span>
            </el-col>
            <el-col :span="11">
              <el-input v-model="searchData.orderCountMin" />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="成交总利润">
          <el-row>
            <el-col :span="11">
              <el-input v-model="searchData.orderProfitMin" />
            </el-col>
            <el-col :span="2">
              <span>&nbsp;&nbsp;至</span>
            </el-col>
            <el-col :span="11">
              <el-input v-model="searchData.orderProfitMin" />
            </el-col>
          </el-row>
        </el-form-item>
        <!--
        <el-form-item label="录入人">
          <el-select search-data-create-user-name placeholder="请选择录入人">
            <el-option v-for="(item) in employeeOptions" :key="item.id" :label="item.name" :value="item.name" />
          </el-select>
        </el-form-item> -->
      </el-form>
      <div style="margin-left:500px">
        <el-button size="small" @click="cancel">取消</el-button>
        <el-button size="small" type="primary" @click="search">确定</el-button>
      </div>
    </el-dialog>

  </div>

</template>
<script>
import { getSaleUnit, getAllClass } from '@/api/product'
import { getEmployeeAll } from '@/api/employee'
import moment from 'moment'
export default {
  data() {
    return {
      dialogVisible: false,
      searchData: {
        productClassId: '',
        productName: '',
        salePriceMin: '',
        salePriceMax: '',
        costMin: '',
        costMax: '',
        saleUnitId: '',
        onSale: '',
        BeginCreateTime: '',
        EndCreateTime: '',
        orderNumMin: '', // 数量
        orderNumMax: '',
        orderTimesMin: '', // 次数
        orderTimesMax: '',
        orderCountMin: '', // 总额度
        orderCountMax: '',
        orderProfitMin: '',
        orderProfitMax: '',
        createUserName: '',
        beginTtm: '',
        endTtm: ''
      },
      employeeOptions: null,
      productClass: [],
      saleUnit: '',
      params: {
        id: 0
      },
      ttm: '',
      createTime: '',
      productClassId: '',
      length: 0, // 标记级联当前层数
      props: {
        label: 'label',
        value: 'value',
        children: 'children'
      }
    }
  },
  computed: {
    getdialogFormVisible: {
      get() {
        return this.$store.getters.dialogFormVisible
      },
      set() {
        this.$store.dispatch('product/setDialogStatus', false)

        return this.$store.getters.dialogFormVisible
      }
    }
  },
  created() {
    this.getClass()
    this.getUnit()
    this.getEmployee()
  },
  methods: {
    show() {
      this.dialogVisible = true
    },
    clearData() {
      this.searchData = {
        productClassId: '',
        productName: '',
        salePriceMin: '',
        salePriceMax: '',
        costMin: '',
        costMax: '',
        saleUnitId: '',
        onSale: '',
        BeginCreateTime: '',
        EndCreateTime: '',
        orderNumMin: '', // 数量
        orderNumMax: '',
        orderTimesMin: '', // 次数
        orderTimesMax: '',
        orderCountMin: '', // 总额度
        orderCountMax: '',
        orderProfitMin: '',
        orderProfitMax: '',
        createUserName: '',
        beginTtm: '',
        endTtm: ''
      }
    },
    /**
     * 获取所有成员，用于搜索
     */
    getEmployee() {
      getEmployeeAll().then(res => {
        this.employeeOptions = res.data
        console.log('employee')
        console.log(this.employeeOptions)
      }).catch(err => {
        console.log(err)
      })
    },

    /**
     * 获取所有产品类别，用于搜索
     */
    getClass() {
      getAllClass(this.params).then(res => {
        const product = this.clearChildren(res.data)
        this.productClass = product
      // eslint-disable-next-line handle-callback-err
      }).catch(err => {
      })
    },
    /**
     * 清除级联中出现[]的情况
     */
    clearChildren(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (!arr[i].children.length) {
          arr[i].children = null
        } else {
          this.clearChildren(arr[i].children)
        }
      }
      return arr
    },
    /**
     * 获取所有产品单位，用于搜索
     */
    getUnit() {
      getSaleUnit().then(res => {
        this.saleUnit = res.data
        console.log('salllll')
        console.log(this.saleUnit)
      // eslint-disable-next-line handle-callback-err
      }).catch(err => {

      })
    },
    /**
     * 取消搜索
     */
    cancel() {
      this.$emit('setdialog')
    },
    handleChange(val) {
      console.log('bbbbbb')
      console.log(val)
      console.log(this.productClassId)
    },
    /**
     * 点击确认
     */
    search() {
      if (this.ttm) {
        console.log('tttm')
        console.log(typeof this.ttm[0])
        // this.searchData.beginTtm=this.ttm[0]
        // this.searchData.endTtm=this.ttm[1]
        this.searchData.beginTtm = moment(this.ttm[0]).format('YYYY-MM-DD')
        this.searchData.endTtm = moment(this.ttm[1]).format('YYYY-MM-DD')
      }
      if (this.createTime) {
        console.log('createTime')
        console.log(this.createTime)
        this.searchData.BeginCreateTime = moment(this.createTime[0]).format('YYYY-MM-DD')
        this.searchData.EndCreateTime = moment(this.createTime[1]).format('YYYY-MM-DD')
      }
      if (this.productClassId.length > 0) {
        const l = this.productClassId.length - 1
        this.searchData.productClassId = this.productClassId[l]
      }
      console.log('search----')
      console.log(this.searchData)
      this.$emit('updatelist', this.searchData)
      this.$emit('setdialog')
    }

  }
}
</script>
