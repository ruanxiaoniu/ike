<template>
  <div>
    <div>
      <el-select size="small" v-model="selection" placeholder="请选择">
        <el-row>
          <el-col :span='24'>
            <el-option-group>
              <el-option label="所有成员" value="所有成员">所有成员</el-option>
            </el-option-group>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-option-group label="指定成员">
              <el-option label="成员A" value="成员A">成员A</el-option>
              <el-option label="成员B" value="成员B">成员B</el-option>
            </el-option-group>
          </el-col>
          <el-col :span='12'>
            <el-option-group label="指定部门">
              <el-option label="部门A" value="部门A">部门A</el-option>
              <el-option label="部门B" value="部门B">部门B</el-option>
            </el-option-group>
          </el-col>
        </el-row>
      </el-select>
      <el-button size="small" icon="el-icon-search" @click="handle('search')">
        搜索
      </el-button>
      <el-button size="small" icon="el-icon-delete" @click="handle('delete')">
        删除
      </el-button>
      <el-button  size="small" icon="el-icon-edit" @click="handle('add')">
        新建
      </el-button>
    </div>
    <p></p>
    <el-table :data="list" border fit highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center"/>
      <el-table-column v-loading="loading" align="center" label="投诉时间" min-width="150px"
                       element-loading-text="请给我点时间！" prop="complaintTime">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.complaintTime | formatDate }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="180px" align="center" label="投诉详情" prop="complaintContent">
        <template slot-scope="scope">
          <span class="link-type" @click="operation(scope.row,scope.$index,'complaintContent')">{{ scope.row.complaintContent}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="180px" align="center" label="投诉客户" prop="customerName">
        <template slot-scope="scope">
          <span class="link-type" @click="customerDetail(scope.row)">{{ scope.row.customerName}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="180px" align="center" label="客户联系人" prop="relationName">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.relationName}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" align="center" label="投诉方式" prop="complaintMethod">
        <template slot-scope="scope">
          <span class="link-type" @click="operation(scope.row,scope.$index,'complaintMethod')">{{ scope.row.complaintMethod }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" align="center" label="投诉类型" prop="complaintType">
        <template slot-scope="scope">
          <span class="link-type" @click="operation(scope.row,scope.$index,'complaintType')">{{ scope.row.complaintType }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" align="center" label="紧急程度" prop="urgencyLevel">
        <template slot-scope="scope">
          <span class="link-type" @click="operation(scope.row,scope.$index,'urgencyLevel')">{{ scope.row.urgencyLevel }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" label="处理状态" prop="handStatus">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.handStatus === 0 ? '未处理' : '未完成' }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" label="处理人" prop="chargerName">
        <template slot-scope="scope">
          <span class="link-type" @click="operation('handler')">{{ scope.row.chargerName }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="listQuery.total>0" :total="listQuery.total" :page.sync="listQuery.page" :limit.sync="listQuery.size"
                @pagination="getList"/>

    <el-dialog title="客户详情" :visible.sync="dialogFlag" v-if=" title==='customerName'" width="60%">
      <customer v-if="title==='customerName'" ></customer>
    </el-dialog>
    <el-dialog v-else-if="operation_type!=='update'" :title="textMap[title]"
               :visible.sync="showDialogFlag" @setdialog="setDialog" width="65%">
      <search v-if="title==='search'" @setdialog="setDialog" :selection="selection" :sortType="sortType" :sortName="sortName" @updatecustomer="getList"></search>
      <add v-else-if="title==='add'" @updatelist="getList"></add>
      <complaintDetail v-else-if="title==='complaintContent'"></complaintDetail>
    </el-dialog>
    <el-dialog v-else :title="textMap[title]" :visible.sync="showDialogFlag" width="30%">
      <update :type="title"></update>
    </el-dialog>
  </div>

</template>

<script>
  import moment from 'moment'
  import { listAll, listCurHandle, listUnHandle, listIsHandle, batchDelete } from '@/api/complaint'
  import pagination from '@/components/Pagination'
  import customer from '../../../public/customer/all-detail/index'
  import complaintDetail from '../detail/index'
  import update from '../update/index'
  import search from '../search/index'
  import add from '../add/index'
  import relation from '../../../public/relation/relation'

  export default {
    components: {
      pagination,
      customer,
      relation,
      update,
      search,
      add,
      complaintDetail
    },
    filters: {
      formatDate(time) {
        return moment(time).format('YYYY年MM月DD日 hh时mm分')
      },
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        }
        return statusMap[status]
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
          size: 10,   //每页显示的数据条数
          current: '1',
          page: 1    //跳转页码
        },
        title: '',
        sortName: '',
        sortType: '',
        dialogFlag: false,
        showDialogFlag: false,
        textMap: {
          search: '搜索',
          add: '新增投诉',
          complaintContent: '客户投诉详情',
          customer: '客户详情',
          employee: '修改负责人',
          complaintMethod: '修改投诉方式',
          complaintType: '修改投诉类型',
          urgencyLevel: '修改紧急程度'
        },
        currentIndex: 0,
        modelType: '',
        multipleSelection: [],
        ids: [],
      }
    },
    created() {
      this.getList()
    },
    watch: {
      watchRowlist:{
        deep:true,
        handler:function(newval){
          this.list[this.currentIndex]=newval
        }
      },
      watchDialogFlag:{
        handler:function(newval){
          this.showDialogFlag=newval
        }
      },
      watchTableList:{
        deep:true,
        handler:function(newval){
          this.list=newval
        }
      },
      watchTab: {
        deep: true,
        handler: function(newval) {
          this.getList()
        }
      }
    },
    computed: {
      watchRowlist(){
        return this.$store.getters.complaintRowList
      },
      watchTableList(){
        return this.$store.getters.complaintTableList
      },
      watchDialogFlag(){
        return this.$store.getters.complaintUpdateDialogVisible
      },
      watchTab(){
        return this.$route.query.tab
      }
    },
    methods: {
      setPage(response) {
        this.listQuery.total = response.data.total
        this.listQuery.page = response.data.pages
        this.listQuery.size = response.data.size
        this.listQuery.current = response.data.current
      },
      getList() {
        this.loading = true
        if (this.type === 'all') {//全部
          listAll().then(response => {
            this.list = response.data.records
            this.loading = false
            this.setPage(response)
          })
        } else if (this.type === 'cur_handle') {//由我处理
          listCurHandle().then(response => {
            this.list = response.data.records
            this.loading = false
            this.setPage(response)
          })
        } else if (this.type === 'un_handle') {// 未处理
          listUnHandle().then(response => {
            this.list = response.data.records
            this.loading = false
            this.setPage(response)
          })
        } else if (this.type === 'is_handle') {// 已处理
          listIsHandle().then(response => {
            this.list = response.data.records
            this.loading = false
            this.setPage(response)
          })
        }
      },
      /**
       * 客户详情
       */
      customerDetail(row) {
        this.$router.push({ name: 'CustomerDetail', query: { customerId: row.id, customerName: row.customerName } })
      },
      operation(row, index, title) {
        if (title === 'customerName') {
          this.dialogFlag = true
        } else {
          this.showDialogFlag = true
        }
        this.operation_type = 'other'
        this.title = title
        this.currentIndex = index

        this.$store.dispatch('complaint/setComplaintRowList', row)
        this.$store.dispatch('complaint/setUpdateDialogVisible', true)
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handle(type) {
        if (type === 'delete') {
          // alert(this.multipleSelection)
          this.batchDelete()
        } else {
          this.title = type
          this.operation_type = 'other'
          this.showDialogFlag = true
        }
      },
      //设置dialog
      setDialog(){
        if(this.title==='customerName'){
          this.DialogFlag=false
        }else{
          this.showDialogFlag=false
          this.$store.dispatch('complaint/setUpdateDialogVisible',false)
        }
      },
      checkAndSetSelect() {
        this.ids = []
        this.multipleSelection.forEach((x) => {
          this.ids.push(x.id)
        })
        if (this.ids.length === 0) {
          this.$message({ type: 'warning', message: '未选中记录!' })
          return false
        }
      },
      batchDelete() {
        if (this.checkAndSetSelect() === false) {
          return
        }
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
      }
    }
  }
</script>

