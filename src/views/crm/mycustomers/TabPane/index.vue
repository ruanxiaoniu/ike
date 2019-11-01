<template>
<div>
   <div>
     <el-select v-model="sortName" placeholder="排序" style="width:200px">
       <el-option label="客户id" value="c.id"></el-option>
       <el-option label="客户名" value="c.customer_name"></el-option>
       <el-option label="联系人名称" value="re_name"></el-option>
       <el-option label="跟进时间" value="ftime"></el-option>
       <el-option label="客户状态" value="c.customer_state"></el-option>
       <el-option label="客户阶段id" value="c.customer_stage_id"></el-option>
       <el-option label="客户来源" value="c.customer_origin_id"></el-option>
     </el-select>
     <el-select v-model="sortType" placeholder="排序方式" style="width:200px">
       <el-option label="降序" value="desc"></el-option>
       <el-option label="升序" value="asc"></el-option>
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
        <span class="link-type" @click="customerDetail(scope.row)">{{ scope.row.customerName }}</span>
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
        <span class="link-type" v-if="scope.row.lastFollowTime==null" @click="operation(scope.row,scope.$index,'listFollowTime')">未跟进</span>
        <span class="link-type" v-else  @click="operation(scope.row,scope.$index,'listFollowTime')">{{ scope.row.lastFollowTime }}</span>

      </template>
    </el-table-column>
     <el-table-column class-name="status-col" label="负责人" min-width="80px" prop="employeeName">
        <template slot-scope="scope">
        <span class="link-type"  @click="operation(scope.row,scope.$index,'employeeName')">{{ scope.row.employeeName }}</span>
      </template>
    </el-table-column>
  </el-table>
  <pagination v-show="listQuery.total>0" :total="listQuery.total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getMyList" />
  
  <el-dialog title="客户详情" :visible.sync="showDialogFlag" v-if="title=='customerName'" width="60%">
    <show></show>
  </el-dialog>
  <el-dialog v-else-if="operation_type!='update'" :title="textMap[title]" :visible.sync="showDialogFlag" @setdialog="setDialog">
    <search v-if="title=='search'" @setdialog="setDialog" :selection="selection" :sortType="sortType" :sortName="sortName" @updatecustomer="getList"></search>
    <add v-else-if="title=='add'" @updatelist="getList"></add>
  </el-dialog>
  <el-dialog v-else :title="textMap[title]" :visible.sync="showDialogFlag" width="30%">
    <update :type="title"></update>
  </el-dialog>
    <!-- <update v-else :type="title"></update> -->
</div>
  
</template>

<script>
import { getCustomerById,getCustomerAll} from '@/api/customer'
import {getEmployeeAll} from '@/api/employee'
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
      employeeOptions:null,
      list: null,
      title:'',
      sortName:'',
      sortType:'',
      showDialogFlag:false,
      listQuery:{
        total:0,
        page:1,//跳转页码
        size:10,//每页显示的数据条数
      },
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
        listFollowTime:'跟进详情',
        employeeName:'员工详情'
      },
      // modelType:'',
      currentIndex:0,
      
    }
  },
  created() {   
    this.$store.dispatch('customer/setupdateDialogVisible',false)  
    console.log("刷新了吗？")
    this.getMyList()
  },
   watch:{
       watchRowlist:{
         deep:true,
         handler:function(newval){             
             this.list[this.currentIndex]=newval             
         }
       },
       watchDialogFlag:{
         handler:function(newval){
           this.showDialogFlag=newval
          //  console.log("watch")
          //  console.log(newval)
         }
       },
       watchTableList:{
         deep:true,
         handler:function(newval){ 
           console.log("watchtable啦啦啦啦")            
             this.list=newval     
             console.log(this.list,newval)        
         }
       },
       watchTab:{
         deep:true,
         handler:function(newval){ 
            this.$store.dispatch('customer/setupdateDialogVisible',false) 
             this.getMyList()
         }
       },
       selection(newVal){
          this.getMyList()
        },
        sortName(newVal){
          console.log("selection啦啦啦啦")            
              console.log(newVal) 
          this.getMyList()
        },
        sortType(newVal){
          this.getMyList()
        }
    },
    
    computed: {
      watchRowlist(){
        return this.$store.getters.customerRowList
      },
      watchDialogFlag(){
        return this.$store.getters.customerUpdateDialogVisible
      },
      watchTableList(){
        return this.$store.getters.customerTableList
      },
      watchTab(){
        return this.$route.query.tab
      }
    },
  methods: {
    //判断Tab的值
    checkTab(query){
      console.log("check")
      console.log(query)
      if(this.sortType!=''){
        this.$set(query,'sortType',this.sortType)
      }
      console.log("selecion")
      console.log(this.selection)
      if(this.$route.query.tab==='today_add'){//今天新增
           this.$set(query,'isToday',"true")
      }else if(this.$route.query.tab==='today_follow'){//今天跟进
          this.$set(query,'differMin',0)
      }else if(this.$route.query.tab==='never'){//从未跟进
            this.$set(query,'isFollowed',"true")
      }else if(this.$route.query.tab==='thirty'){//30天未跟进
            this.$set(query,'differMax',30)
      }
      return query
    },

    getMyList() {
      this.loading = true
      let employeeId=''
        let query={
        pageNum:this.listQuery.page,
        pageSize:this.listQuery.size,
      }
      console.log("query")
       console.log(query)
      query=this.checkTab(query)
       
      getCustomerById(query).then(res=>{
            this.list=res.data.records
            this.loading = false
            this.listQuery.total=res.data.total
            this.showDialogFlag=this.$store.getters.customerUpdateDialogVisible
            this.$store.dispatch('customer/setCustomerTableList',this.list)
        })
      // }  
    },
   /**
    * 客户详情
    */
    customerDetail(row){
       this.$router.push({name:'CustomerDetail',query:{customerId:row.id,customerName:row.customerName}})
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
    },
    //设置dialog
    setDialog(){
      this.showDialogFlag=false
    }
  }
}
</script>

