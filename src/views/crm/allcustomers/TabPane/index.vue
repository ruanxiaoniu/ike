<template>
<div>
   <div>
     <el-select size="small" v-model="selection" placeholder="请选择">
       <el-row>
         <el-col span="24">
            <el-option-group>
              <el-option label="所有成员" value="所有成员" >所有成员</el-option>
            </el-option-group>
         </el-col>
       </el-row>
       <el-row>
         <el-col span="12">
            <el-option-group label="指定成员">
              <el-option label="成员A" value="成员A">成员A</el-option>
              <el-option label="成员B" value="成员B">成员B</el-option>
            </el-option-group>
         </el-col>
         <el-col span="12">
            <el-option-group label="指定部门">
                <el-option label="部门A" value="部门A">部门A</el-option>
                <el-option label="部门B" value="部门B">部门B</el-option>
            </el-option-group>
         </el-col>
       </el-row>
     </el-select>
      <el-button size="small" icon="el-icon-search" @click="search">
            搜索
      </el-button>
      <el-button  size="small"  icon="el-icon-delete">
            删除
      </el-button>
       <el-button :loading="downloadLoading" size="small" icon="el-icon-edit" @click="handleDownload">
        新建
      </el-button>
      <el-button :loading="downloadLoading" size="small" icon="el-icon-upload" @click="handleDownload">
        导入
      </el-button>
      <el-button :loading="downloadLoading" size="small" icon="el-icon-document" @click="handleDownload">
        导出
      </el-button>
    </div>
    <p></p>
  <el-table :data="list" border fit highlight-current-row style="width: 100%"  @cell-click="operation">
   <el-table-column  type="selection" align="center"  />
    <el-table-column
      v-loading="loading"
      align="center"
      label="客户名称"
      width="150px"
      element-loading-text="请给我点时间！"
      prop="customer_name"

    >
      <template slot-scope="scope">
        <span class="link-type">{{ scope.row.customer_name }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="100px" align="center" label="客户状态" prop="customer_state">
      <template slot-scope="scope">
        <span class="link-type">{{ scope.row.customer_state}}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="100px" align="center" label="客户阶段" prop="customer_stage">
      <template slot-scope="scope">
        <span class="link-type">{{ scope.row.customer_stage }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="100px" align="center" label="客户等级" prop="customer_level">
      <template slot-scope="scope">
        <span class="link-type">{{ scope.row.customer_level }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="100px" label="客户来源" prop="customer_origin">
       <template slot-scope="scope">
        <span class="link-type">{{ scope.row.customer_origin }}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" label="主联系手机号" width="160px" prop="relation_primary">
      <template slot-scope="scope">
        <span class="link-type">{{ scope.row.relation_primary }}</span>
      </template>
    </el-table-column>
   <el-table-column align="center" label="主联系座机号" width="160px" prop="landline_number">
      <template slot-scope="scope">
        <span class="link-type">{{ scope.row.landline_number }}</span>
      </template>
    </el-table-column>
    <el-table-column class-name="status-col" label="最后跟进时间" min-width="170px" prop="end_follow">
      <template slot-scope="scope">
        <i class="el-icon-time" />
        <span class="link-type">{{ scope.row.end_follow }}</span>

      </template>
    </el-table-column>
     <el-table-column class-name="status-col" label="负责人" min-width="80px" prop="employee">
        <template slot-scope="scope">
        <span class="link-type">{{ scope.row.employee }}</span>
      </template>
    </el-table-column>
  </el-table>
  <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  
  <el-dialog title="客户详情" :visible.sync="showDialogFlag" v-if="title=='customer_name'">
    <show></show>
  </el-dialog>
  <el-dialog v-else-if="title=='search'" title="搜索" :visible.sync="showDialogFlag">
    <search></search>
  </el-dialog>
  <el-dialog v-else :title="textMap[title]" :visible.sync="showDialogFlag" width="20%">
    <!-- <show v-if="title=='customer_name'"></show> -->
    <update :type="title"></update>
  </el-dialog>
</div>
  
</template>

<script>
import { getCustomerAll ,getCustomerToday} from '@/api/customer'
import pagination from '@/components/Pagination'
import show from '../show/index'
import update from '../update/index'
import search from '../search/index'

export default {
  components:{
    pagination,
    show,
    update,
    search
  },
  filters: {
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
      selection:'所有成员',
      list: null,
      total:0,
      title:'',
      showDialogFlag:false,
      listQuery: {
        page: 1,
        limit: 20,
        sort: '+id'
      },
      loading: false,
      textMap:{
        customer_state:'修改客户状态',
        customer_stage:'修改客户阶段',
        customer_level:'修改客户等级',
        customer_origin:'修改客户来源',
        relation_primary:'修改主联系手机号',
        landline_number:'修改主联系座机号',
        end_follow:'修改修改最后跟进时间',
        employee:'修改修改负责人'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true

      //全部客户
      // if(this.type==='all'){
      //    getCustomerAll(this.listQuery).then(response=>{
      //      console.log(this.listQuery)
      //      this.list=response.data.items
      //      this.loading = false
      //      this.total = response.data.total
      //    })
      // }else if(this.type==='today_add'){//今日新增
      //   getCustomerToday(this.listQuery).then(response=>{
      //      console.log(this.listQuery)
      //      this.list=response.data.items
      //      this.loading = false
      //      this.total = response.data.total
      //    })
      // }
       getCustomerAll(this.listQuery).then(response=>{
           console.log(this.listQuery)
           this.list=response.data.items
           this.loading = false
           this.total = response.data.total
         })
      
      
    },
    operation(row, column, cell, event){
         this.title=column.property
         console.log(this.title)
         this.showDialogFlag=true
    },
    search(){
      this.title='search'
      this.showDialogFlag=true
    }
  }
}
</script>

