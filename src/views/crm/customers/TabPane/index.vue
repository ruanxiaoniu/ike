<template>
  <div>
    <div>
      <employeeSelect v-if="customer === 'Allcustomer'" v-model="selection" />
      <el-select v-model="sortName" size="small" placeholder="排序" style="width:200px" :clearable="true">
        <el-option v-for="item in sortNameOpts" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="sortType" size="small" placeholder="排序方式" style="width:200px" :clearable="true">
        <el-option v-for="item in sortTypeOpts" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-button size="small" icon="el-icon-search" @click="search">
        搜索
      </el-button>
      <el-button size="small" icon="el-icon-delete" @click="customerDelete">
        删除
      </el-button>
      <el-button
        size="small"
        icon="el-icon-edit"
        @click="add"
      >
        新建
      </el-button>
    </div>
    <p />
    <el-table
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @update="update"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" />
      <el-table-column
        v-loading="loading"
        align="center"
        label="客户名称"
        width="150px"
        element-loading-text="请给我点时间！"
        prop="customerName"
      >
        <template slot-scope="scope">
          <span class="link-type" @click="customerDetail(scope.row)">{{
            scope.row.customerName
          }}</span>
        </template>
      </el-table-column>

      <el-table-column
        min-width="100px"
        align="center"
        label="客户状态"
        prop="customerState"
      >
        <template slot-scope="scope">
          <span
            class="link-type"
            @click="operation(scope.row, scope.$index, 'customerState')"
          >{{ scope.row.customerState }}</span>
        </template>
      </el-table-column>

      <el-table-column
        min-width="100px"
        align="center"
        label="客户阶段"
        prop="stageName"
      >
        <template slot-scope="scope">
          <span
            class="link-type"
            @click="operation(scope.row, scope.$index, 'stageName')"
          >{{ scope.row.stageName }}</span>
        </template>
      </el-table-column>

      <el-table-column
        min-width="100px"
        align="center"
        label="客户等级"
        prop="levelName"
      >
        <template slot-scope="scope">
          <span
            class="link-type"
            @click="operation(scope.row, scope.$index, 'levelName')"
          >{{ scope.row.levelName }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" label="客户来源" prop="originName">
        <template slot-scope="scope">
          <span
            class="link-type"
            @click="operation(scope.row, scope.$index, 'originName')"
          >{{ scope.row.originName }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="主联系手机号"
        width="160px"
        prop="relationPhone"
      >
        <template slot-scope="scope">
          <span
            class="link-type"
            @click="operation(scope.row, scope.$index, 'relationPhone')"
          >{{ scope.row.relationPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="主联系座机号"
        width="160px"
        prop="landLinePhone"
      >
        <template slot-scope="scope">
          <span
            class="link-type"
            @click="operation(scope.row, scope.$index, 'landLinePhone')"
          >{{ scope.row.landLinePhone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="最后跟进时间"
        min-width="160px"
        prop="listFollowTime"
      >
        <template slot-scope="scope">
          <i v-show="scope.row.listFollowTime" class="el-icon-time" />
          <span
            v-if="scope.row.lastFollowTime == null"
          >未跟进</span>
          <span
            v-else
          >{{ scope.row.lastFollowTime | formateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="负责人"
        min-width="80px"
        prop="employeeName"
      >
        <template slot-scope="scope">
          <span
            class="link-type"
            @click="operation(scope.row, scope.$index, 'employeeName')"
          >{{ scope.row.employeeName }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="listQuery.total > 0"
      :total="listQuery.total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      @pagination="getList"
    />
    <search ref="search" @submitSearch="submitSearch" />
    <add ref="add" @updatelist="getList" />
    <update ref="update" :type="title" @update="getAllList" />
  </div>
</template>

<script>
import { getCustomerAll, getCustomerById, deleteCustomer } from '@/api/customer'
import { sortNameOpts, sortTypeOpts } from '@/utils/common.js'
import pagination from '@/components/Pagination'
import update from '../../../public/customer/update/index'
import employeeSelect from '../../../public/employeeSelect/employeeSelect'
import add from '../../../public/customer/add/index'
import search from '../../../public/customer/search/index'
import moment from 'moment'
import assign from 'lodash/assign'
export default {
  components: {
    pagination,
    update,
    search,
    add,
    employeeSelect
  },
  filters: {
    formateTime(time) {
      return moment(time).format('YYYY-MM-DD HH:MM:SS')
    }
  },
  props: {
    type: {
      type: String,
      default: 'all'
    }
  },
  data() {
    return {
      sortNameOpts,
      sortTypeOpts,
      operation_type: 'update', // 判断是修改还是其他操作,update为修改
      editType: '', // 修改类型
      selection: '所有成员',
      list: null,
      listQuery: {
        total: 0,
        page: 1, // 跳转页码
        size: 10 // 每页显示的数据条数
      },
      customer: '',
      title: '',
      sortName: '',
      sortType: '',
      loading: false,
      currentIndex: 0,
      multipleSelection: []
    }
  },

  computed: {
    watchTab() {
      return this.$route.query.tab
    }
  },
  watch: {
    watchRowlist: {
      deep: true,
      handler: function(newval) {
        this.list[this.currentIndex] = newval
      }
    },
    watchTab: {
      deep: true,
      handler: function(newval) {
        this.getList()
      }
    },
    selection(newVal) {
      this.getList()
    },
    sortName(newVal) {
      this.getList()
    },
    sortType(newVal) {
      this.getList()
    }
  },
  created() {
    this.customer = this.$route.name
    this.getList()
  },
  methods: {
    getList(searchQuery) {
      this.loading = true
      const query = this.checkQuery(query)
      if (searchQuery) {
        assign(query, searchQuery)
      }
      if (this.customer === 'Allcustomer') {
        this.getAllList(query)
      } else {
        this.getMyList(query)
      }
    },
    checkQuery() {
      this.loading = true
      const query = {
        pageNum: this.listQuery.page,
        pageSize: this.listQuery.size
      }
      if (this.customer === 'Allcustomer') {
        if (this.selection !== '所有成员') {
          this.$set(query, 'employeeIds', this.selection)
        }
      }
      if (this.sortName !== '') {
        this.$set(query, 'sortName', this.sortName)
      }
      if (this.sortType !== '') {
        this.$set(query, 'sortType', this.sortType)
      }
      if (this.$route.query.tab === 'today_add') {
        // 今天新增
        this.$set(query, 'isToday', 'true')
      } else if (this.$route.query.tab === 'today_follow') {
        // 今天跟进
        this.$set(query, 'differFollow', 0)
      } else if (this.$route.query.tab === 'never') {
        // 从未跟进
        this.$set(query, 'isFollowed', 'true')
      } else if (this.$route.query.tab === 'thirty') {
        // 30天未跟进
        this.$set(query, 'differFollow', 30)
      }
      return query
    },
    getAllList(query) {
      getCustomerAll(query)
        .then(res => {
          this.list = res.data.records
          this.loading = false
          this.listQuery.total = res.data.total
          if (res.data.pages < res.data.current) {
            this.listQuery.current = res.data.pages
            this.getList()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getMyList(query) {
      getCustomerById(query).then(res => {
        this.list = res.data.records
        this.loading = false
        this.listQuery.total = res.data.total
        if (res.data.pages < res.data.current) {
          this.listQuery.current = res.data.pages
          this.getList()
        }
      })
    },
    /**
     * 客户详情
     */
    customerDetail(row) {
      this.$router.push({
        name: 'CustomerDetail',
        query: { customerId: row.id, customerName: row.customerName }
      })
    },
    update(val) {
      console.log('val')
      console.log(val)
    },
    operation(row, index, title) {
      this.operation_type = 'update'
      this.title = title
      this.currentIndex = index
      this.$refs.update.show(row)
    },
    search() {
      this.$refs.search.show()
    },
    submitSearch(searchQuery) {
      this.getList(searchQuery)
    },
    add() {
      this.$refs.add.show()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    /**
     * 删除
     */
    customerDelete() {
      if (this.multipleSelection.length > 0) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            const ids = []
            console.log('multe')
            console.log(this.multipleSelection)
            this.multipleSelection.forEach(item => {
              ids.push(item.id)
            })
            // eslint-disable-next-line no-undef
            deleteCustomer(ids).then(res => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getList()
            })
              // eslint-disable-next-line handle-callback-err
              .catch(err => {
                this.$message({
                  type: 'error',
                  message: '删除失败!'
                })
              })
          })
          .catch(() => {
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
    }
  }
}
</script>
