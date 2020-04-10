<template>
  <div>
    <div>
      <employeeSelect v-model="chargeId" />
      <el-select v-model="sortName" placeholder="排序" style="width:200px" size="small" :clearable="true">
        <el-option label="跟进任务创建时间" value="fa.create_time" />
        <el-option label="跟进任务执行时间" value="fa.execute_time" />
      </el-select>
      <el-select v-model="sortType" placeholder="排序方式" style="width:200px" size="small">
        <el-option v-for="item in sortTypeOpts" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-button size="small" icon="el-icon-search" @click="serachArrange()">搜索</el-button>
      <el-button size="small" icon="el-icon-plus" @click="addArrange()">新建</el-button>
      <el-button size="small" icon="el-icon-edit" @click="editArrange()">修改</el-button>
      <el-button size="small" icon="el-icon-delete" @click="deleteArrange">删除</el-button>
    </div>
    <p />
    <el-table :data="arrangeList" border fit highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center" />
      <el-table-column
        v-loading="loading"
        align="center"
        label="创建时间"
        min-width="150px"
        element-loading-text="请给我点时间！"
        prop="create_time"
      >
        <template slot-scope="scope">
          <span class="link-type" @click="viewArrangeDetail(scope.row)">{{ scope.row.createTime | formateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" align="center" label="安排人姓名" prop="arrangeName">
        <template slot-scope="scope">
          <span>{{ scope.row.arrangeName }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" align="center" label="负责人姓名" prop="chargeName">
        <template slot-scope="scope">
          <span>{{ scope.row.chargeName }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" align="center" label="执行时间" prop="executeTime">
        <template slot-scope="scope">
          <span>{{ scope.row.executeTime | formateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="180px" align="center" label="客户联系人名称[客户名]">
        <template slot-scope="scope">
          <span class="link-type" @click="viewRelation(scope.row)">{{ scope.row.relationName }}</span>
          <span class="link-type" @click="handle('customer',scope.row)">[{{ scope.row.customerName }}]</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" align="center" label="已读状态" prop="isread">
        <template slot-scope="scope">
          <span v-if="scope.row.isread == 0">已读</span>
          <span v-if="scope.row.isread == null">未读</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" align="center" label="完成状态" prop="iscomplete">
        <template slot-scope="scope">
          <span v-if="scope.row.iscomplete == null">未执行</span>
          <span v-if="scope.row.iscomplete == 0">完成</span>
          <span v-if="scope.row.iscomplete == 1">失败</span>
        </template>
      </el-table-column>

    </el-table>
    <pagination v-show="listQuery.total>0" :total="listQuery.total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getArrange" />

    <!-- <el-dialog :title="textMap[title]" :visible.sync="showDialogFlag" width="60%" @before-close="setClose">
      <relation v-if="title=='relation'" :rid="Rid" />
      <arrangeDetail v-else-if="title=='arrangeDetail'" :aid="Aid" @updatelist="getArrange" />
      <updateAdd v-else-if="title=='add'||title=='edit'" :edit-flag="editFlag" :aid="Aid" @setdialog="showDialogFlag=!showDialogFlag" @updatelist="getArrange" />
      <search v-else-if="title=='search'" @updatelist="searchUpdate" />
    </el-dialog> -->
    <search ref="search" @updatelist="searchUpdate" />
    <updateAdd ref="updateAdd" @updatelist="getArrange" />
    <arrangeDetail ref="arrangeDetail" @updatelist="getArrange" />
    <relation ref="relation" />
  </div>

</template>

<script>
import { getArrangeAll, deleteArrange } from '@/api/arrange'
import employeeSelect from '../../../public/employeeSelect/employeeSelect'
import pagination from '@/components/Pagination'
import arrangeDetail from '../../../public/follow/task-detail'
import search from '../search/index'
import updateAdd from '../add/index'
import relation from '../../../public/relation/relationById'
import moment from 'moment'
import { sortTypeOpts } from '@/utils/common.js'
export default {

  components: {
    pagination,
    // customer,
    employeeSelect,
    relation,
    search,
    arrangeDetail,
    updateAdd
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
      arrangeState: '未完成',
      readState: '未读',
      arrangeList: null,
      total: 0,
      title: '',
      listQuery: {
        total: 0,
        page: 1, // 跳转页码
        size: 10// 每页显示的数据条数
      },
      loading: false,
      Aid: '',
      Rid: '',
      Cid: '',
      modelType: '',
      sortName: '',
      sortType: '',
      searchQuery: {},
      reverse: true,
      params: {},
      arrangeId: '所有安排人',
      chargeId: '所有成员',
      relationId: '',
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
        this.getArrange()
      }
    },
    arrangeId(newVal) {
      this.arrangeId = newVal
      this.getArrange()
    },
    chargeId(newVal) {
      this.chargeId = newVal
      this.getArrange()
    },
    sortName(newVal) {
      this.getArrange()
    },
    sortType(newVal) {
      this.getArrange()
    }
  },

  created() {
    const tab = this.$route.query.tab
    if (tab === 'arrangeMyself') {
      this.arrangeMyself = false
      this.chargeMyself = true
    } else if (tab === 'chargeMyself') {
      this.chargeMyself = false
      this.arrangeMyself = true
    } else {
      this.chargeMyself = true
      this.arrangeMyself = true
    }

    this.getArrange()
  },
  methods: {
    getArrange() {
      this.loading = true
      this.checkTab()
      this.$set(this.params, 'pageNum', this.listQuery.page)
      this.$set(this.params, 'pageSize', this.listQuery.size)
      if (this.customerId) {
        this.$set(this.params, 'customerId', this.customerId)
      }
      getArrangeAll(this.params).then(response => {
        this.arrangeList = response.data.records
        this.loading = false
        this.listQuery.total = response.data.total
        this.multipleSelection = []
      })
    },
    clearParams() {
      for (const key in this.params) {
        delete this.params[key]
      }
    },
    checkTab() {
      const tab = this.$route.query.tab
      if (tab === 'arrangeMyself') {
        this.clearParams()
        if (this.searchQuery) {
          this.params = this.searchQuery
        }
        this.$set(this.params, 'arrangeMyself', 'true')
      } else if (tab === 'chargeMyself') {
        this.clearParams()
        if (this.searchQuery) {
          this.params = this.searchQuery
        }
        this.$set(this.params, 'chargeMyself', 'true')
        console.log(this.params)
      } else {
        this.clearParams()
        if (this.searchQuery) {
          this.params = this.searchQuery
        }
      }

      if (this.arrangeId !== '所有安排人') {
        this.$set(this.params, 'arrangeId', this.arrangeId)
      } else {
        delete this.params['arrangeId']
      }

      if (this.chargeId !== '所有成员') {
        this.$set(this.params, 'chargeId', this.chargeId)
      }
      console.log(this.params)

      if (this.sortType) {
        this.$set(this.params, 'sortType', this.sortType)
      }
      if (this.sortName) {
        this.$set(this.params, 'sortName', this.sortName)
      }
    },
    handle(type, row) {
      if (type === 'customer') {
        this.$router.push({ name: 'CustomerDetail', query: { customerId: row.customerId }})
      } else {
        this.title = type
        this.Aid = row.id
        this.Rid = row.relationId
        this.showDialogFlag = true
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    addArrange() {
      this.$refs.updateAdd.show()
    },

    editArrange() {
      if (this.multipleSelection.length <= 0) {
        this.$message.error('请选择需要修改的任务')
      } else if (this.multipleSelection.length > 1) {
        this.$message.error('只能选择一项进行修改！')
      } else {
        this.Aid = this.multipleSelection[0].id
        this.$refs.updateAdd.show(this.multipleSelection[0])
      }
    },
    deleteArrange() {
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
          deleteArrange(ids).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getArrange()
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
    searchUpdate(val) {
      this.searchQuery = val
      this.getArrange()
    },
    serachArrange(type) {
      this.$refs.search.show()
    },
    viewArrangeDetail(item) {
      this.$refs.arrangeDetail.show(item.id)
    },
    viewRelation(item) {
      this.$refs.relation.show(item.relationId)
    }

  }
}
</script>

