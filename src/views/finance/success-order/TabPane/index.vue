<template>
  <div>
    <div style="margin-top:10px">
      <employeeSelect v-model="selection" />
      <el-select v-model="sortName" placeholder="排序" style="width:200px" :clearable="true" size="small">
        <el-option label="订单总成本" value="orderCost" />
        <el-option label="订单成交总额" value="orderTotal" />
        <el-option label="订单实际成交总额" value="orderActualTotal" />
        <el-option label="订单时间" value="orderTime" />
      </el-select>
      <el-select v-model="sortType" placeholder="排序方式" style="width:200px" :clearable="true" size="small">
        <el-option label="降序" value="DESC" />
        <el-option label="升序" value="ASC" />
      </el-select>
      <el-button size="small" icon="el-icon-search" @click="search">
        搜索
      </el-button>
      <el-button size="small" icon="el-icon-delete" @click="deleteOrder">
        删除
      </el-button>
      <el-button size="small" icon="el-icon-plus" @click="addOrder">
        新建
      </el-button>
      <el-button size="small" icon="el-icon-edit" @click="editOrder">
        修改
      </el-button>
    </div>
    <p />
    <el-table :data="orderList" border fit highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center" />

      <el-table-column label="下单时间" min-width="120px" prop="orderTime" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.orderTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="负责人" min-width="70px" prop="employeeName" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="viewEmployee(scope.row)">{{ scope.row.employeeName }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" align="center" label="客户联系人" prop="relationName">
        <template slot-scope="scope">
          <span class="link-type" @click="viewRelation(scope.row)">{{ scope.row.relationName }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="80px" label="成交总额" prop="orderActualTotal" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="viewOrder(scope.row)">{{ scope.row.orderActualTotal }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="总成本" width="90px" prop="orderCost">
        <template slot-scope="scope">
          <span class="link-type" @click="viewOrder(scope.row)">{{ scope.row.orderCost }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="创建时间" min-width="120px" prop="createTime" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>

    </el-table>
    <pagination v-show="listQuery.total>0" :total="listQuery.total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getOrder" />

    <!-- <el-dialog :title="textMap[title]" :visible.sync="showDialogFlag" width="60%">
      <orderDetail v-if="title=='orderProduct'" :oid="Oid" />
      <employee v-else-if="title=='employee'" :id="Eid" />
    </el-dialog> -->
    <search ref="search" @updatelist="searchUpdate" />
    <addUpdate ref="addUpdate" @updatelist="getOrder" />
    <relation ref="relation" />
    <employee ref="employee" />
    <orderDetail ref="orderDetail" />
  </div>
</template>

<script>
import employeeSelect from '../../../public/employeeSelect/employeeSelect'
import { searchOrder, deleteOrder } from '@/api/order'
import pagination from '@/components/Pagination'
// import show from '../../../public/customer/all-detail/index'
import addUpdate from '../add-update/index'
import search from '../search/index'
import orderDetail from '../../../public/finance/order/order-detail'
import relation from '../../../public/relation/relationById'
import employee from '../../../public/employee/index'
import assign from 'lodash/assign'
export default {
  components: {
    pagination,
    employeeSelect,
    // show,
    search,
    orderDetail,
    addUpdate,
    relation,
    employee
  },
  filters: {
  },
  props: {
    type: {
      type: String,
      default: 'all'
    }
  },
  data() {
    return {
      selection: '所有成员',
      title: '',
      showDialogFlag: false,
      listQuery: {
        total: 0,
        page: 1, // 跳转页码
        size: 10// 每页显示的数据条数
      },
      loading: false,
      textMap: {
        search: '搜索',
        add: '新增订单信息',
        orderProduct: '订单详情',
        edit: '修改订单信息',
        relation: '联系人详情',
        employee: '负责人详情'
      },
      orderList: null,
      sortType: '',
      sortName: '',
      searchQuery: null,
      Oid: '',
      Eid: '',
      Rid: '',
      multipleSelection: [],
      params: {},
      editFlag: false
    }
  },
  computed: {
    watchTab() {
      return this.$route.query.tab
    }
  },
  watch: {
    watchTab: {
      deep: true,
      handler: function(val) {
        this.getOrder()
      }
    },
    sortName(newVal) {
      this.getOrder()
    },
    sortType(newVal) {
      this.getOrder()
    },
    selection(newVal) {
      this.getOrder()
    }
  },
  created() {
    this.getOrder()
  },
  methods: {
    /**
     * 获取所有订单信息
     */
    getOrder(searchQuery) {
      if (searchQuery) {
        assign(this.params, searchQuery)
      }
      // 检查tab
      this.checkTab()
      assign(this.params, this.listQuery)
      if (this.Cid) {
        this.$set(this.params, 'customerId', this.Cid)
      }
      searchOrder(this.params).then(res => {
        this.listLoading = false
        this.orderList = res.data.list
        this.listQuery.total = res.data.total
      })
    },
    /**
     * 清空params
     */
    clearParams() {
      for (const key in this.params) {
        delete this.params[key]
      }
    },
    checkTab() {
      const tab = this.$route.query.tab
      if (tab === 'unpaid') {
        this.clearParams()
        this.$set(this.params, 'orderState', 0)
      } else if (tab === 'paid') {
        this.clearParams()
        this.$set(this.params, 'orderState', 1)
      } else if (tab === 'returning') {
        this.clearParams()
        this.$set(this.params, 'orderState', 2)
      } else if (tab === 'refunding') {
        this.clearParams()
        this.$set(this.params, 'orderState', 3)
      } else if (tab === 'refunded') {
        this.clearParams()
        this.$set(this.params, 'orderState', 4)
      }
      if (this.selection !== '所有成员') {
        this.$set(this.params, 'employeeId', this.selection)
      }

      if (this.sortType) {
        this.$set(this.params, 'sortType', this.sortType)
      }
      if (this.sortName) {
        this.$set(this.params, 'sortName', this.sortName)
      }
    },
    /**
     * 点击进行操作
     */
    operation(row, title) {
      this.title = title
      this.Oid = row.id
      console.log('row')
      console.log(row.id)
      this.Rid = row.relationId
      this.Eid = row.employeeId
      this.showDialogFlag = true
    },
    /**
     * 更新列表
     */
    updateList(searchQuery) {
      this.getOrder(searchQuery)
    },
    /**
     * 点击搜索
     */
    search() {
      this.$refs.search.show()
    },
    /**
     * 新增订单
     */
    addOrder() {
      this.$refs.addUpdate.show()
    },
    /**
     * 修改信息
    */
    editOrder(flag, title) {
      if (this.multipleSelection.length <= 0) {
        this.$message.error('请选择需要修改计划！')
      } else if (this.multipleSelection.length > 1) {
        this.$message.error('只能选择一项进行修改！')
      } else {
        // this.Oid = this.multipleSelection[0].id
        this.$refs.addUpdate.show(this.multipleSelection[0])
      }
    },
    /**
     * 存储表格选择
     */
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    /**
     * 删除
     */
    deleteOrder() {
      if (this.multipleSelection.length > 0) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const order_base_id = []
          this.multipleSelection.forEach(item => {
            order_base_id.push(item.id)
          })
          deleteOrder(order_base_id).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getOrder()
          // eslint-disable-next-line handle-callback-err
          }).catch(err => {
            this.$message({
              type: 'error',
              message: '删除失败!'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        console.log('未选择')
        this.$message({
          type: 'error',
          message: '请选择!'
        })
      }
    },
    /**
     * 高级搜索
     */
    searchUpdate(val) {
      this.searchQuery = val
      this.showDialogFlag = false
      this.getOrder()
    },
    viewRelation(item) {
      this.$refs.relation.show(item.relationId)
    },
    viewEmployee(item) {
      this.$refs.employee.show(item.employeeId)
    },
    viewOrder(item){
      this.$refs.orderDetail.show(item.id)
    }
  }
}
</script>

