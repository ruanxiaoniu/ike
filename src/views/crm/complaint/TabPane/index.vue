<template>
  <div>
    <div>
      <el-button size="small" icon="el-icon-delete" @click="deleteComplaint">
        删除
      </el-button>

      <el-button size="small" icon="el-icon-edit" @click="add">
        新建
      </el-button>
    </div>
    <p />
    <el-table :data="list" border fit highlight-current-row style="width: 100%" @selection-change="checkAndSetSelect">
      <el-table-column type="selection" align="center" />
      <el-table-column
        v-loading="loading"
        align="center"
        label="投诉时间"
        min-width="150px"
        element-loading-text="请给我点时间！"
        prop="complaintTime"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.complaintTime | formatDate }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="180px" align="center" label="投诉详情" prop="complaintContent">
        <template slot-scope="scope">
          <span class="link-type" @click="viewDetail(scope.row)">{{ scope.row.complaintContent }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="180px" align="center" label="投诉客户" prop="customerName">
        <template slot-scope="scope">
          <span class="link-type" @click="customerDetail(scope.row)">{{ scope.row.customerName }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="180px" align="center" label="客户联系人" prop="relationName">
        <template slot-scope="scope">
          <span class="link-type" @click="viewRelation(scope.row)">{{ scope.row.relationName }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" align="center" label="投诉方式" prop="complaintMethod">
        <template slot-scope="scope">
          <span>{{ scope.row.complaintMethod }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" align="center" label="投诉类型" prop="complaintType">
        <template slot-scope="scope">
          <span>{{ scope.row.complaintType }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" align="center" label="紧急程度" prop="urgencyLevel">
        <template slot-scope="scope">
          <span>{{ scope.row.urgencyLevel }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" label="处理状态" prop="handStatus">
        <template slot-scope="scope">
          <span>{{scope.row.handleStatus}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" label="修改人" prop="chargerName">
        <template slot-scope="scope">
          <span>{{ scope.row.chargerName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" v-if="scope.row.handleStatus === '未处理'" @click="handleStatus(scope.row)">处理</el-button>
        </template>
      </el-table-column>
    </el-table>
      <pagination v-show="listQuery.total>0" :total="listQuery.total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getList" />
    <el-dialog title="处理客户投诉" :visible.sync="dialogVisible">
      <el-form :model="complaintResult" label-width="150px">
        <el-select  v-model="complaintResult.handleStatus" placeholder="请选择处理结果">
          <el-option label="满意处理结果" value="满意处理结果"></el-option>
          <el-option label="不满意处理结果" value="不满意处理结果"></el-option>
        </el-select>
      </el-form>
      <el-button style="margin-right: 200px" type="primary" @click="submitStatus">确定</el-button>
    </el-dialog>
    <add ref="add" @updatelist="getList" />
    <complaintDetail ref="complaintDetail" @updatelist="getList"></complaintDetail>
    <relation ref="relation" />
  </div>

</template>

<script>
import moment from 'moment'
import { listAll, listCurHandle, listUnHandle, listIsHandle, batchDelete, updateComplaintStatus } from '@/api/complaint'
import pagination from '@/components/Pagination'
import complaintDetail from '../detail/index'
// import update from '../update/index'
// import search from '../search/index'
import add from '../add/index'
import relation from '../../../public/relation/relationById'
import {parseTime} from '@/utils/formateDate'

export default {
  components: {
    pagination,
    relation,
    // update,
    // search,
    add,
    complaintDetail
  },
  filters: {
    formatDate(time) {
      return parseTime(time)
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
      operation_type: 'update',
      selection: '所有成员',
      list: null,
      listQuery: {
        total: 0,
        page: 1, // 跳转页码
        size: 10// 每页显示的数据条数
      },
      title: '',
      sortName: '',
      sortType: '',
      dialogVisible: false,
      type: '',
      currentIndex: 0,
      modelType: '',
      multipleSelection: [],
      ids: [],
      complaintResult: {
        complaintId: '',
        handleStatus: '',
      }
    }
  },
  computed: {
    watchRowlist() {
      return this.$store.getters.complaintRowList
    },
    watchTableList() {
      return this.$store.getters.complaintTableList
    },
    watchDialogFlag() {
      return this.$store.getters.complaintUpdateDialogVisible
    },
    watchTab() {
      return this.$route.query.tab
    }
  },
  watch: {
    watchTab: {
      deep: true,
      handler: function(newval) {
        this.type = newval
        this.getList()
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    setPage(response) {
      this.listQuery.total = response.data.total
      // this.listQuery.page = response.data.pages
      // this.listQuery.size = response.data.size
      // this.listQuery.current = response.data.current
    },
    getList() {
      this.loading = true
      let params = {
        pageNum: this.listQuery.page,
        pageSize: this.listQuery.size
      }
      console.log('tag');
      console.log(this.type);
      
      if (this.type === 'all') { // 全部
        listAll(params).then(response => {
          this.list = response.data.records
          this.loading = false
          this.setPage(response)
        })
      } else if (this.type === 'cur_handle') { // 由我处理
        listCurHandle(params).then(response => {
          this.list = response.data.records
          this.loading = false
          this.setPage(response)
        })
      } else if (this.type === 'un_handle') { // 未处理
        listUnHandle(params).then(response => {
          this.list = response.data.records
          this.loading = false
          this.setPage(response)
        })
      } else if (this.type === 'is_handle') { // 已处理
        listIsHandle(params).then(response => {
          this.list = response.data.records
          this.loading = false
          this.setPage(response)
        })
      }
    },
    customerDetail(row) {
      this.$router.push({ name: 'CustomerDetail', query: { customerId: row.customerId }})
    },
    checkAndSetSelect(val) {
      this.multipleSelection = val
    },
    deleteComplaint() {
      this.ids = []
      if(this.multipleSelection.length > 0){
        this.multipleSelection.map(ele => {
          this.ids.push(ele.id)
        })
        this.$confirm('将选中投诉记录以及关联的投诉处理记录删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          batchDelete(this.ids).then(response => {
            if (response.code === 0) {
              this.$message({ type: 'success', message: '删除成功!' })
              this.getList()
            } else {
              this.$message({ type: 'warning', message: '删除失败!' })
            }
          })
        })
      }else{
        this.$message({ type: 'warning', message: '未选中记录!' })
      }
    },
    add() {
      this.$refs.add.show()
    },
    viewDetail(row){
      this.$refs.complaintDetail.show(row.id)
    },
    viewRelation(item) {
      this.$refs.relation.show(item.relationId)
    },
    handleStatus(row){
      this.complaintResult.complaintId = row.id
      this.dialogVisible = true
    },
    submitStatus(row){
      updateComplaintStatus(this.complaintResult).then(res => {
        this.$message.success('修改成功！')
        this.dialogVisible = false
        this.getList()
      }).catch(err => {
        this.$message.error('修改失败！')
      })
    }
  }
}
</script>

