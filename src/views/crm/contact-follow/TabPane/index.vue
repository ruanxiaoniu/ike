<template>
<div>
   <div>
     <el-select size="small" v-model="selection" placeholder="请选择" >
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
      <el-button size="small" icon="el-icon-search" @click="handle('search')">
            搜索
      </el-button>
      <!-- <el-button  size="small"  icon="el-icon-delete">
            删除
      </el-button> -->
       <el-button :loading="downloadLoading" size="small" icon="el-icon-edit" @click="handle('add')" >
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
  <baseData></baseData>
  <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  <el-dialog title="搜索" :visible.sync="showDialogFlag" v-if="operation_type=='search'">
    <search></search>
  </el-dialog>
  <el-dialog v-else title="新建跟进" :visible.sync="showDialogFlag">
    <add></add>
  </el-dialog>

</div>
  
</template>

<script>
import { getfCustomerAll ,getCustomerToday} from '@/api/customer'
import pagination from '@/components/Pagination'
import baseData from '../../../public/follow/base'
import search from '../search/index'
import add from '../add/index'

export default {
  components:{
    pagination,
    baseData,
    search,
    add
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
    
      operation_type:'search',//判断是修改还是其他操作,update为修改
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
        search:'搜索',
        add:'新增客户',
        customer_state:'修改客户状态',
        customer_stage:'修改客户阶段',
        customer_level:'修改客户等级',
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
         this.operation_type='update'
         this.title=column.property
         console.log(this.title)
         this.showDialogFlag=true
    },
    handle(type){
      this.title=type
      this.operation_type=type
      this.showDialogFlag=true
    }
  }
}
</script>

