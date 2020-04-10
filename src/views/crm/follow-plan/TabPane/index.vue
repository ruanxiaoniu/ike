<template>
  <div>
    <div>
      <employeeSelect v-model="selection" />
      <el-select v-model="sortName" placeholder="排序" style="width:200px" size="small">
        <el-option label="跟进计划创建时间" value="fp.plan_date" />
      </el-select>
      <el-select v-model="sortType" size="small" placeholder="排序方式" style="width:200px" :clearable="true">
        <el-option v-for="item in sortTypeOpts" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-button size="small" icon="el-icon-search" @click="searchPlan('search')">
        搜索
      </el-button>
      <el-button size="small" icon="el-icon-delete" @click="planDelete">
        删除
      </el-button>
      <el-button size="small" icon="el-icon-plus" @click="addPlan(false,'add')">
        新建
      </el-button>
      <el-button size="small" icon="el-icon-edit" @click="editPlan(true,'edit')">
        修改
      </el-button>
    </div>
    <p />
    <el-table :data="planList" border fit highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center" />
      <el-table-column
        v-loading="loading"
        align="center"
        label="计划时间"
        min-width="150px"
        element-loading-text="请给我点时间！"
        prop="planDate"
      >
        <template slot-scope="scope">
          <span class="link-type" @click="planDetail(scope.row)">{{ scope.row.planDate | formateTime }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="180px" align="center" label="客户联系人名称[客户名]">
        <template slot-scope="scope">
          <span class="link-type" @click="viewRelation(scope.row)">{{ scope.row.relationName }}</span>
          <span class="link-type" @click="handle(scope.row)">[{{ scope.row.customerName }}]</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" align="center" label="计划内容" prop="planContent">
        <template slot-scope="scope">
          <span>{{ scope.row.planContent }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" align="center" label="员工名称" prop="employeeName">
        <template slot-scope="scope">
          <span>{{ scope.row.employeeName }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" label="是否完成" prop="iscomplete">
        <template slot-scope="scope">
          <span v-if="scope.row.iscomplete==1">未完成</span>
          <span v-else-if="scope.row.iscomplete==0">已完成</span>
          <span v-else-if="scope.row.iscomplete==null">未执行</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="listQuery.total>0" :total="listQuery.total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getPlan" />
    <search ref="search" @updatelist="searchUpdate" />
    <updateAdd ref="updateAdd" @updatelist="getPlan" />
    <planDetail ref="planDetail" @updatelist="getPlan" />
    <relation ref="relation" />
  </div>

</template>

<script>
import pagination from '@/components/Pagination'
import employeeSelect from '../../../public/employeeSelect/employeeSelect'
import { sortTypeOpts } from '@/utils/common.js'
import planDetail from '../../../public/follow/plan-detail'
import search from '../search/index'
import relation from '../../../public/relation/relationById'
import updateAdd from '../add/index'
import { planAll, deletePlan } from '@/api/follow'
import moment from 'moment'
import assign from 'lodash/assign'
export default {
  components: {
    pagination,
    employeeSelect,
    relation,
    updateAdd,
    search,
    planDetail
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
      sortTypeOpts,
      selection: '所有成员',
      list: null,
      title: '',
      showDialogFlag: false,
      listQuery: {
        total: 0,
        page: 1, // 跳转页码
        size: 10// 每页显示的数据条数
      },
      loading: false,
      sortName: '',
      sortType: '',
      reverse: true,
      params: {},
      planId: '',
      Rid: '',
      planList: null,
      editFlag: false,
      multipleSelection: []
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
        this.getPlan()
      }
    },
    selection(newVal) {
      this.selection = newVal
      this.getPlan()
    },
    sortName(newVal) {
      this.getPlan()
    },
    sortType(newVal) {
      this.getPlan()
    }
  },
  created() {
    this.getPlan()
  },
  methods: {
    /**
     * 获取所有跟进计划内容
    */
    getPlan(searchQuery) {
      this.listLoading = true
      if (searchQuery) {
        assign(this.params, searchQuery)
      } else {
        this.params = {}
      }
      this.checkTab()
      assign(this.params, this.listQuery)
      if (this.Cid) {
        this.$set(this.params, 'customerId', this.Cid)
      }
      planAll(this.params).then(res => {
        this.listLoading = false
        this.listQuery.total = res.data.total
        if (res.data.pages < res.data.current) {
          this.listQuery.current = res.data.pages
          this.getList()
        }
        this.planList = res.data.records
        this.multipleSelection = []
      // eslint-disable-next-line handle-callback-err
      }).catch(err => {

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
      if (tab === 'myfollow') {
        this.clearParams()
        this.$set(this.params, 'isMyself', 'true')
      } else if (tab === 'today_follow') {
        this.clearParams()
        this.$set(this.params, 'isToday', 'true')
      } else if (tab === 'yesterday') {
        this.clearParams()
        this.$set(this.params, 'yesterday', 'true')
      } else if (tab === 'this_week') {
        this.clearParams()
        this.$set(this.params, 'isWeek', 'true')
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
     * 存储表格选择
     */
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log('数组大小')
      console.log(this.multipleSelection)
    },
    /**
     * 显示产品详情、客户详情、联系人详情
     */
    handle(row) {
      this.$router.push({ name: 'CustomerDetail', query: { customerId: row.customerId }})
    },
    addPlan() {
      this.$refs.updateAdd.show()
    },
    editPlan(flag, title) {
      if (this.multipleSelection.length <= 0) {
        this.$message.error('请选择需要修改计划！')
      } else if (this.multipleSelection.length > 1) {
        this.$message.error('只能选择一项进行修改！')
      } else {
        this.$refs.updateAdd.show(this.multipleSelection[0])
      }
    },
    /**
     * 关闭前设置editFlag
     */
    setClose() {
      this.editFlag = false
      this.showDialogFlag = false
    },
    /**
     * 删除
     */
    planDelete() {
      if (this.multipleSelection.length > 0) {
        console.log('选择')
        console.log(this.multipleSelection)
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const ids = []

          this.multipleSelection.forEach(item => {
            // this.$set(query,'id',item.id)
            ids.push(item.id)
          })
          console.log('qeryyyyy')
          console.log(ids)
          deletePlan(ids).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getPlan()
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
      this.getPlan(val)
    },
    /**
     * 点击搜索
     */
    searchPlan(type) {
      this.$refs.search.show()
    },
    planDetail(item) {
      this.$refs.planDetail.show(item)
    },
    viewRelation(item) {
      this.$refs.relation.show(item.relationId)
    }
  }
}
</script>

