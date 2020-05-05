<template>
  <div class="app-container">
    <div>
      <employeeSelect v-model="selection" />
      <el-select v-model="sortName" placeholder="排序" style="width:200px" :clearable="true" size="small">
        <el-option label="产品名称" value="product_name" />
        <el-option label="成交数量" value="order_num" />
        <el-option label="成交总额度" value="order_count" />
        <el-option label="成交次数" value="order_times" />
        <el-option label="成交成本总额" value="order_cost" />
        <el-option label="成交利润" value="order_profit" />
        <el-option label="录入时间" value="create_time" />
        <el-option label="录入人" value="create_user_name" />
        <el-option label="销售状态" value="on_sale" />
      </el-select>
      <el-select v-model="sortType" placeholder="排序方式" style="width:200px" :clearable="true" size="small">
        <el-option label="降序" value="DESC" />
        <el-option label="升序" value="ASC" />
      </el-select>
      <el-button
        size="small"
        icon="el-icon-search"
        @click="search"
      >
        搜索
      </el-button>
      <el-button size="small" icon="el-icon-delete" @click="productDelete">
        删除
      </el-button>
      <el-button size="small" icon="el-icon-edit" @click="handle('add',false)">
        新建
      </el-button>
    </div>
    <p />
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" />
      <el-table-column align="center" label="产品名称" min-width="150">
        <template slot-scope="scope">
          <span class="link-type" @click="productDetail(scope.row)">{{ scope.row.productName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="成交数量" width="100" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="operation(scope.row,'successProduct')">{{ scope.row.orderNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="成交总额度" width="100" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="operation(scope.row,'successProduct')"> {{ scope.row.orderCount }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="成交次数" width="100" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="operation(scope.row,'successProduct')">  {{ scope.row.orderTimes }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="orderCost" label="成交成本总额" width="110">
        <template slot-scope="scope">
          <span class="link-type" @click="operation(scope.row,'successProduct')">   {{ scope.row.orderCost }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="orderProfit" label="成交总利润" width="100">
        <template slot-scope="scope">
          <span class="link-type" @click="operation(scope.row,'successProduct')">{{ scope.row.orderProfit }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="createTime" label="录入时间" min-width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createTime | formateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="createUserName" label="录入人" width="90">
        <template slot-scope="scope">
          <span class="link-type" @click="operation(scope.row,'employee')">{{ scope.row.createUserName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="onSale" label="销售状态" width="90">
        <template slot-scope="scope">
          <span v-if="scope.row.onSale==0" class="link-type">下架</span>
          <span v-else class="link-type">上架</span>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button size="small" icon="el-icon-edit" @click="edit(scope.row,'edit',true)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="listQuery.total>0" :total="listQuery.total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getProduct" />

    <el-dialog :title="textMap[type]" :visible.sync="dialogFlag" width="60%">
      <employee v-if="type=='employee'" :id="employeeId" />
      <dealDetail v-else-if="type=='successProduct'" :product-id="productId" />
      <!-- <search v-else-if="type=='search'" @setdialog="setDialogFlag" @updatelist="updateList" /> -->
      <updateAdd v-else-if="title=='operate'" :edit="editFlag" :pid="productId" @setdialog="setDialogFlag" @seteditflag="setEditFlag" @updatelist="updateList" />
    </el-dialog>
    <search ref="search" @updatelist="updateList" />
  </div>
</template>

<script>
import { getProductList, deleteProduct } from '@/api/product'
import employee from '../../public/employee/index'
import employeeSelect from '../../public/employeeSelect/employeeSelect'
// import productDetail from '../../public/product/product-detail'
import dealDetail from '../../public/product/dealProduct'
import pagination from '@/components/Pagination'
import search from '../search/index'
import updateAdd from '../update-add/index'
import moment from 'moment'
import assign from 'lodash/assign'
import {parseTime} from '@/utils/formateDate'

export default {
  components: {
    // productDetail,
    pagination,
    employee,
    dealDetail,
    search,
    updateAdd,
    employeeSelect
  },
  filters: {
    formateTime(time) {
      return parseTime(time)
    }
  },
  data() {
    return {
      multipleSelection: [],
      list: null,
      listLoading: true,
      flag: false, // 是否点击搜索
      total: 0,
      listQuery: {
        total: 0,
        page: 1, // 跳转页码
        size: 10// 每页显示的数据条数
      },
      params: {},
      title: '',
      searchQuery: {},
      selection: '所有成员',
      textMap: {
        productDetail: '产品详情',
        successProduct: '成交产品详情',
        employee: '录入人信息',
        search: '搜索',
        add: '新建产品信息'
      },
      type: '',
      employeeId: '',
      productId: '',
      dialogFlag: false,
      sortName: '',
      sortType: '',
      editFlag: '',
      // listLoading: true,
      downloadLoading: false,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx'
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
        this.getProduct()
      }
    },
    sortName(newVal) {
      this.getProduct()
    },
    sortType(newVal) {
      this.getProduct()
    },
    selection(newVal) {
      this.getProduct()
    }
  },
  created() {
    console.log('producy....')
    this.getProduct()
  },
  methods: {

    /**
     * 获取所有产品信息
     * method:getFollow()
     */
    getProduct(searchQuery) {
      this.listLoading = true
      if (searchQuery) {
        assign(this.params, searchQuery)
      }
      // console.log(this.listQuery)
      this.checkTab()
      assign(this.params, this.listQuery)
      // this.$set(this.params, 'pageNum', this.listQuery.page)
      // this.$set(this.params, 'pageSize', this.listQuery.size)
      getProductList(this.params).then(response => {
        console.log(response.data.records)
        this.listLoading = false
        this.list = response.data.records
        this.listQuery.total = response.data.total
      })
    },
    /**
     * 批量删除产品
    */
    productDelete() {
      if (this.multipleSelection.length > 0) {
        console.log('选择')
        console.log(this.multipleSelection)
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const query = []

          this.multipleSelection.forEach(item => {
            // this.$set(query,'id',item.id)
            query.push(item.id)
          })
          console.log('qeryyyyy')
          console.log(query)
          deleteProduct(query).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.updateList()
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
     * 清空params
     */
    clearParams() {
      for (const key in this.params) {
        delete this.params[key]
      }
    },
    /**
     * 检查变化
     * method:checkTab()
     */
    checkTab() {
      const tab = this.$route.query.tab
      if (tab === 'sale') {
        this.clearParams()
        this.$set(this.params, 'isSold', 1)
      } else if (tab === 'no_one') {
        this.clearParams()
        this.$set(this.params, 'isSold', 0)
      } else {
        this.clearParams()
      }
      if (this.selection !== '所有成员') {
        this.$set(this.params, 'employeeIds', this.selection)
      }
      if (this.sortType) {
        this.$set(this.params, 'sortType', this.sortType)
      }
      if (this.sortName) {
        this.$set(this.params, 'sortName', this.sortName)
      }
    },

    /**
     * 不同点击进行不同的操作
     * method:show()
     */
    operation(row, type) {
      console.log('row..')
      console.log(row)
      this.employeeId = row.createUserId
      this.productId = row.id
      this.type = type
      this.title = ''
      this.dialogFlag = true
    },
    /**
     * 产品详情
     * method:productDetail()
     */
    productDetail(row) {
      this.$router.push({ name: 'ProductDetail', query: { productId: row.id, productName: row.productName }})
    },
    /**
     * 不同点击搜索和新建进行不同的操作
     * method:handle()
     */
    handle(type) {
      this.type = type
      if (this.type === 'add') {
        this.title = 'operate'
      }
      this.dialogFlag = true
      this.editFlag = false
    },
    /**
     * 点击修改进行的操作
     * method:show()
     */
    edit(row, type, flag) {
      this.productId = row.id
      console.log('iddddd')
      console.log(this.productId)
      this.type = type
      this.title = 'operate'
      this.editFlag = true
      this.dialogFlag = true
    },
    /**
     * 设置dialog
     */
    setDialogFlag() {
      console.log('lllllllllllllll')
      this.dialogFlag = false
    },
    /**
     * 设置editFlag
     */
    setEditFlag() {
      this.editFlag = false
    },
    /**
     * 搜索页面的值
     */
    updateList(searchQuery) {
      if (this.type === 'search') {
        this.searchQuery = searchQuery
      }
      console.log('search......')
      console.log(this.searchQuery)
      this.getProduct(searchQuery)
      this.dialogFlag = false
    },
    /**
     * 多选值
     */
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    /**
     * 导出
     */
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['产品名称', '成交数量', '成交总额度', '成交成本总额度', '成交总利润', '录入时间', '录入人', '销售状态']
        const filterVal = ['productName', 'orderNum', 'orderCount', 'orderCost', 'orderProfit', 'createTime', 'createUserName', 'onSale']
        const list = this.list
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          fileName: this.fileName,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          // eslint-disable-next-line no-undef
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    search() {
      this.$refs.search.show()
    }
  }
}
</script>
