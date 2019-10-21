<template>
  <div>
    <div>
      <el-button size="small" icon="el-icon-edit" @click="handle('setIsRead')"
                 v-if="this.$route.query.tab !== 'is_read'">
        设为已读
      </el-button>
      <el-button size="small" icon="el-icon-edit" @click="handle('setUnRead')"
                 v-if="this.$route.query.tab !== 'un_read'">
        设为未读
      </el-button>
      <el-button size="small" icon="el-icon-delete" @click="handle('delete')">
        批量删除
      </el-button>
    </div>
    <!--当el-table元素中注入data对象数组后，在el-table-column中用prop
    属性来对应对象中的键名即可填入数据，用label属性来定义表格的列名。可以使用width属性来定义列宽。-->
    <el-table :data="list" ref="multipleTable" border fit highlight-current-row style="width: 100%" max-height="430"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>

      <el-table-column min-width="100px" align="center" label="消息标题" prop="msgTitle" element-loading-text="请给我点时间！">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.msgTitle }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" align="center" label="消息详情" prop="msgContent"
                       :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span class="link-type"
                @click="checkMsg(scope.row.id, scope.row.msgContent)">{{ scope.row.msgContent }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" align="center" label="消息来源" prop="fromWhoName">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.fromWhoName }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" align="center" label="通知时间" prop="sendTime" element-loading-text="loading...">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.sendTime|formatDate }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" align="center" label="消息状态" prop="readed">
        <template slot-scope="scope">
          <el-tag :type="scope.row.readed | statusFilter">
            {{ scope.row.readed === 0 ? '未读' : '已读' }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="this.getList"/>
  </div>
</template>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

<script>
  import moment from 'moment'
  import pagination from '@/components/Pagination'
  import { getAllMessage, getUnReadMessage, getIsReadMessage, batchDelete, batchToRead, batchToUnRead } from '@/api/message'

  export default {
    components: {
      pagination
    },

    props: {
      type: {
        type: String,
        default: 'un_read'
      }
    },

    data() {
      return {
        list: null,
        total: 0,
        title: '',
        showDialogFlag: false,
        listQuery: {
          page: 1,
          limit: 20,
          sort: '+id'
        },
        loading: false,
        currentIndex: 0,
        multipleSelection: [],
        ids: []
      }
    },

    created() {
      this.getList()
    },
    watch:{
      watchTab:{
        deep:true,
        handler:function(newval){
          this.getList()
        }
      }
    },
    computed: {
      watchTab(){
        return this.$route.query.tab
      }
    },

    filters: {
      formatDate(time) {
        return moment(time).format('YYYY年MM月DD日 hh时mm分')
      }, statusFilter(status) {
        const statusMap = {
          0: 'success',
          1: 'info'
        }
        return statusMap[status]
      }
    },

    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val
      },

      handle(type) {
        if (type === 'delete') {
          this.batchDelete()
        } else if (type === 'setIsRead') {
          this.setIsRead()
        } else if (type === 'setUnRead') {
          this.setUnRead()
        }
      },

      getList() {
        this.loading = true
        let query = {
          pageNum: 1,
          pageSize: 10
        }
        if (this.$route.query.tab === 'is_read') {//已读
          getIsReadMessage().then(response => {
            this.list = response.data.records
            this.loading = false
            this.total = response.data.total
          })
        } else if (this.$route.query.tab === 'all') {//全部
          getAllMessage().then(response => {
            this.list = response.data.records
            this.loading = false
            this.total = response.data.total
          })
        } else {      //默认未读
          getUnReadMessage().then(response => {
            this.list = response.data.records
            this.loading = false
            this.total = response.data.total
          })
        }

      },

      checkIsSelect() {
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
        if (this.checkIsSelect() === false) {
          return
        }
        this.$confirm('将选中记录删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          batchDelete(this.ids).then(response => {
            alert(response.code)
            if (response.code === 0) {
              this.$message({ type: 'success', message: '删除成功!' })
              this.getList()
            } else {
              this.$message({ type: 'warning', message: '删除失败!' })
            }
          })
        })
      },

      setIsRead() {
        if (this.checkIsSelect() === false) {
          return
        }
        this.$confirm('将选中消息置为已读", 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          batchToRead(this.ids).then(response => {
            if (response.code === 0) {
              this.$message({ type: 'success', message: '设置成功!' })
              this.getList()
            } else {
              this.$message({ type: 'warning', message: '设置失败!' })
            }
          })
        })
      },
      setUnRead() {
        if (this.checkIsSelect() === false) {
          return
        }
        this.$confirm('将选中消息置为未读", 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          batchToUnRead(this.ids).then(response => {
            if (response.code === 0) {
              this.$message({ type: 'success', message: '设置成功!' })
              this.getList()
            } else {
              this.$message({ type: 'warning', message: '设置失败!' })
            }
          })
        })
      },

      checkMsg(id, content) {
        this.$alert('<strong>' + content + '</strong>', '消息详情', {
          dangerouslyUseHTMLString: true
        })
        let ids = []
        ids.push(id)
        batchToRead(ids).then(resp =>{
          if (resp.code === 0) {
            this.getList()
          }
        }).catch(err =>{
          this.$message({ type: 'warning', message: '服务器出错!' })
        })
      }
    }
  }
</script>




