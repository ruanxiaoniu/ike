<template>
<div>
   <div>
     <el-select v-show="modelType=='allCustomer'" size="small" v-model="selection" placeholder="请选择" >
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
      <el-button  size="small"  icon="el-icon-delete">
            删除
      </el-button>
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
  <el-table :data="list" border fit highlight-current-row style="width: 100%"  @update="update">
   <el-table-column  type="selection" align="center"  />
    <el-table-column
      v-loading="loading"
      align="center"
      label="客户名称"
      width="150px"
      element-loading-text="请给我点时间！"
      prop="customerName"

    >
      <template slot-scope="scope">
        <span class="link-type" @click="operation(scope.row,scope.$index,'customerName')">{{ scope.row.customerName }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="100px" align="center" label="客户状态" prop="customerState">
      <template slot-scope="scope">
        <span class="link-type"  @click="operation(scope.row,scope.$index,'customerState')">{{ scope.row.customerState}}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="100px" align="center" label="客户阶段" prop="stageName">
      <template slot-scope="scope">
        <span class="link-type"  @click="operation(scope.row,scope.$index,'stageName')">{{ scope.row.stageName }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="100px" align="center" label="客户等级" prop="levelName">
      <template slot-scope="scope">
        <span class="link-type"  @click="operation(scope.row,scope.$index,'levelName')">{{ scope.row.levelName }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="100px" label="客户来源" prop="originName">
       <template slot-scope="scope">
        <span class="link-type" @click="operation(scope.row,scope.$index,'originName')">{{ scope.row.originName }}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" label="主联系手机号" width="160px" prop="relationPhone">
      <template slot-scope="scope">
        <span class="link-type"  @click="operation(scope.row,scope.$index,'relationPhone')">{{ scope.row.relationPhone }}</span>
      </template>
    </el-table-column>
   <el-table-column align="center" label="主联系座机号" width="160px" prop="landLinePhone">
      <template slot-scope="scope">
        <span  class="link-type"  @click="operation(scope.row,scope.$index,'landLinePhone')">{{ scope.row.landLinePhone }}</span>
      </template>
    </el-table-column>
    <el-table-column class-name="status-col" label="最后跟进时间" min-width="160px" prop="listFollowTime">
      <template slot-scope="scope">
        
        <i class="el-icon-time" v-show="scope.row.listFollowTime"/>
        <span class="link-type" v-if="scope.row.listFollowTime==null" @click="operation(scope.row,scope.$index,'listFollowTime')">未跟进</span>
        <span class="link-type" v-else  @click="operation(scope.row,scope.$index,'listFollowTime')">{{ scope.row.listFollowTime }}</span>

      </template>
    </el-table-column>
     <el-table-column class-name="status-col" label="负责人" min-width="80px" prop="employeeName">
        <template slot-scope="scope">
        <span class="link-type"  @click="operation(scope.row,scope.$index,'employeeName')">{{ scope.row.employeeName }}</span>
      </template>
    </el-table-column>
  </el-table>
  <!-- <pagination v-show="listQuery.total>0" :total="listQuery.total" :page.sync="page" :limit.sync="listQuery.pageSize" @pagination="getList" /> -->
  
  <el-dialog title="客户详情" :visible.sync="showDialogFlag" v-if="title=='customerName'" width="60%">
    <show></show>
  </el-dialog>
  <el-dialog v-else-if="operation_type!='update'" :title="textMap[title]" :visible.sync="showDialogFlag">
    <search v-if="title=='search'"></search>
    <add v-else-if="title=='add'"></add>
  </el-dialog>
  <el-dialog v-else :title="textMap[title]" :visible.sync="showDialogFlag" width="30%">
    <update :type="title"></update>
  </el-dialog>
    <!-- <update v-else :type="title"></update> -->
</div>
  
</template>

<script>
import { getCustomerById,getCustomerAll} from '@/api/customer'
import pagination from '@/components/Pagination'
import show from '../../../public/customer/all-detail/index'
import update from '../update/index'
import search from '../search/index'
import add from '../add/index'
export default {
  components:{
    pagination,
    show,
    update,
    search,
    add,
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
      operation_type:'update',//判断是修改还是其他操作,update为修改
      selection:'所有成员',
      list: null,
      total:0,
      title:'',
      showDialogFlag:false,
      page:1,
      // listQuery: {
      //   pageNum: 1,//当前页面的数据数量
      //   pageSize: 20,//页面大小
      //   total:0,//数据总数量
      //   totalPage:0,//数据总页面
      // },
      loading: false,
      textMap:{
        search:'搜索',
        add:'新增客户',
        customerState:'修改客户状态',
        stageName:'修改客户阶段',
        levelName:'修改客户等级',
        originName:'修改客户来源',
        relationPhone:'修改主联系手机号',
        landLinePhone:'修改主联系座机号',
        listFollowTime:'修改最后跟进时间',
        employeeName:'修改负责人'
      },
      modelType:'',
      currentIndex:0
    }
  },
  created() {    
    console.log("刷新了吗？")
    this.modelType=this.$store.getters.modelType
    this.getList()
  },
   watch:{
       watchRowlist:{
         deep:true,
         handler:function(newval){             
             this.list[0]=newval             
         }
       },
       watchDialogFlag:{
         handler:function(newval){
           this.showDialogFlag=newval
          //  console.log("watch")
          //  console.log(newval)
         }
       }
    },
    computed: {
      watchRowlist(){
        return this.$store.getters.customerRowList
      },
      watchDialogFlag(){
        return this.$store.getters.customerUpdateDialogVisible
      }
    },
  methods: {
    getList() {
      this.loading = true
      const params={
           Eid:3,
          //  pageNum:this.listQuery.pageNum,
          //  pageSize:this.listQuery.pageSize
           pageNum:1,
           pageSize:10
      }
      const query={
        pageNum:1,
        pageSize:10
      }
      if(this.modelType=='allCustomer'){ //全部客户
         getCustomerAll(query).then(res=>{
          //  this.listQuery=res.data.pageInfo
           this.list=res.data.records
           console.log("hhh")
           console.log(this.list)
           this.loading = false
           this.total=res.data.total
           this.showDialogFlag=this.$store.getters.customerUpdateDialogVisible
         })
      }else if(this.modelType=='myCustomer'){ //根据id查询用户
        getCustomerById(params).then(response=>{
          //  this.listQuery=response.data.pageInfo
          //  this.list=response.data.customerList
          //  this.loading = false
          //  this.showDialogFlag=this.$store.getters.customerUpdateDialogVisible
        //    console.log("showDialogFlag")
        //  console.log(this.$store.getters.customerUpdateDialogVisible)
         this.listQuery=response.data.pageInfo
           this.list=response.data.records
           console.log("hhh")
           console.log(this.list)
           this.loading = false
           this.total=response.data.total
           this.showDialogFlag=this.$store.getters.customerUpdateDialogVisible
         })
      }  
    },
   
    update(val){
      console.log("val")
      console.log(val)
    },
    operation(row,index,title){
         this.operation_type='update'
         this.title=title
         this.currentIndex=index
         this.showDialogFlag=true
         this.$store.dispatch('customer/setcustomerRowList',row)
         this.$store.dispatch('customer/setupdateDialogVisible',true)
         console.log("setupdateDialogVisibel")
         console.log(this.$store.getters.customerUpdateDialogVisible)
    },
    handle(type){
      this.title=type
      this.operation_type='other'
      this.showDialogFlag=true
    }
  }
}
</script>

