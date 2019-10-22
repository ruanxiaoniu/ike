<template>
<div>
   <div>
     <el-select style="width:120px" size="small" v-model="selection" placeholder="任务状态" >
            <el-option label="进行中" value="进行中" >进行中</el-option>
            <el-option label="进行中" value="进行中" >已完成</el-option>
            <el-option label="进行中" value="进行中" >未完成</el-option>
      </el-select>
      <el-select style="width:120px" size="small" v-model="selection" placeholder="已读状态" >
            <el-option label="已读" value="已读" >已读</el-option>
            <el-option label="未读" value="未读" >未读</el-option>
      </el-select>
       <el-select style="width:100px" size="small" v-model="selection" placeholder="执行人" >
            <el-option-group>
              <el-option label="我自己" value="我自己" >我自己</el-option>
            </el-option-group>
            <el-option-group label="指定以下成员">
              <el-option label="成员A" value="成员A">成员A</el-option>
              <el-option label="成员B" value="成员B">成员B</el-option>
            </el-option-group>
     </el-select>
      <el-select v-model="sortName" placeholder="排序" style="width:200px" size="small" >
       <el-option label="跟进任务创建时间" value="fa.create_time"></el-option>
     </el-select>
     <el-select v-model="sortType" placeholder="排序方式" style="width:200px" size="small" >
       <el-option label="降序" value="desc"></el-option>
       <el-option label="升序" value="asc"></el-option>
     </el-select>
      <el-button size="small" icon="el-icon-search" @click="operation('search')">
            搜索
      </el-button>
      <el-button  size="small"  icon="el-icon-delete">
            删除
      </el-button>
       <el-button :loading="downloadLoading" size="small" icon="el-icon-edit" @click="operation('add')" >
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
  <el-table :data="list" border fit highlight-current-row style="width: 100%"  >
   <el-table-column  type="selection" align="center"  />
    <el-table-column
      v-loading="loading"
      align="center"
      label="安排时间"
      min-width="150px"
      element-loading-text="请给我点时间！"
      prop="customer_name"

    >
      <template slot-scope="scope">
        <span class="link-type" @click="operation('taskDetail')">{{ scope.row.customer_name }}</span>
      </template>
    </el-table-column>
    <el-table-column min-width="100px" align="center" label="安排人姓名" prop="customer_stage">
      <template slot-scope="scope">
        <span class="link-type">{{ scope.row.customer_stage }}</span>
      </template>
    </el-table-column>
    <el-table-column min-width="180px" align="center" label="客户联系人名称[客户名]" prop="customer_state">
      <template slot-scope="scope">
        <span class="link-type" @click="operation('relation')">{{ scope.row.customer_state}}</span>
        <span class="link-type" @click="operation('customer')">[客户名]</span>
      </template>
    </el-table-column>

    <el-table-column min-width="100px" align="center" label="已读状态" prop="customer_stage">
      <template slot-scope="scope">
        <span class="link-type">{{ scope.row.customer_stage }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="100px" align="center" label="完成状态" prop="customer_level">
      <template slot-scope="scope">
        <span class="link-type">{{ scope.row.customer_level }}</span>
      </template>
    </el-table-column>

  </el-table>
  <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  
  <el-dialog :title="textMap[operation_type]" :visible.sync="showDialogFlag"  width="60%">
    <relation v-if="operation_type=='relation'"></relation>
    <customer v-else-if="operation_type=='customer'"></customer>
    <taskDetail v-else-if="operation_type=='taskDetail'"></taskDetail>
    <add v-else-if="operation_type=='add'"></add>
    <search v-else-if="operation_type=='search'"></search>
    <update v-else-if="operation_type=='update'"></update>
  </el-dialog>
  <!-- <el-dialog v-else-if="operation_type!='update'" :title="textMap[title]" :visible.sync="showDialogFlag">
    <search v-if="title=='search'"></search>
    <add v-else-if="title=='add'"></add>
  </el-dialog>
  <el-dialog v-else :title="textMap[title]" :visible.sync="showDialogFlag" width="30%">
    <update :type="title"></update>
  </el-dialog> -->
</div>
  
</template>

<script>
import { getCustomerAll ,getCustomerToday} from '@/api/customer'
import pagination from '@/components/Pagination'
import customer from '../../../public/customer/all-detail/index'
import taskDetail from '../../../public/follow/task-detaol'
import update from '../update/index'
import search from '../search/index'
import add from '../add/index'
import relation from '../../../public/relation/relation'
export default {
  components:{
    pagination,
    customer,
    relation,
    update,
    search,
    add,
    taskDetail,
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
      operation_type:'',//判断是修改还是其他操作,update为修改
      selection1:'进行中',
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
        search:'搜索',
        add:'新增跟进任务',
        taskDetail:'跟进任务详情',
        customer:'客户详情',
        relation:'联系人详情',
        customer_origin:'修改客户来源',
        relation_primary:'修改主联系手机号',
        landline_number:'修改主联系座机号',
        end_follow:'修改最后跟进时间',
        employee:'修改负责人'
      },
      modelType:'',
    }
  },
  created() {    
    this.getList()
    this.modelType=this.$store.getters.modelType
  },
  methods: {
    text(){
        alert('hh')
    },
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
    operation(type){
         this.operation_type=type
         this.showDialogFlag=true
    },
    handle(type){
      this.title=type
      this.operation_type='other'
      this.showDialogFlag=true
    }
  }
}
</script>

