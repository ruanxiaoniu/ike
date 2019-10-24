<template>
<div>
   <div>
     <el-select 
        size="small" 
        v-model="selection" 
        placeholder="请选择" 
        filterable
        remote
        reserve-keyword
        :remote-method="remoteMethod"
      >
        <el-option-group>
          <el-option label="所有成员" value="所有成员"></el-option>
        </el-option-group>
        <el-option-group label="指定成员">
          <el-option v-for="(item) in employeeOptions" :key="item.id" :label="item.name" :value="item.id"> </el-option>
        </el-option-group>
     </el-select>
     <el-select v-model="sortName" placeholder="排序" style="width:200px" size="small" >
       <el-option label="跟进计划创建时间" value="fp.plan_date"></el-option>
     </el-select>
     <el-select v-model="sortType" placeholder="排序方式" style="width:200px" size="small" >
       <el-option label="降序" value="desc"></el-option>
       <el-option label="升序" value="asc"></el-option>
     </el-select>
      <el-button size="small" icon="el-icon-search" @click="searchPlan('search')">
            搜索
      </el-button>
      <el-button  size="small"  icon="el-icon-delete" @click="planDelete">
            删除
      </el-button>
       <el-button :loading="downloadLoading" size="small" icon="el-icon-plus" @click="addPlan(false,'add')" >
        新建
      </el-button>
       <el-button :loading="downloadLoading" size="small" icon="el-icon-edit" @click="editPlan(true,'edit')" >
        修改
      </el-button>
      <el-button :loading="downloadLoading" size="small" icon="el-icon-upload" @click="handleDownload">
        导入
      </el-button>
      <el-button :loading="downloadLoading" size="small" icon="el-icon-document" @click="handleDownload">
        导出
      </el-button>
    </div>
    <p></p>
  <el-table :data="planList" border fit highlight-current-row style="width: 100%"  @selection-change="handleSelectionChange" >
   <el-table-column  type="selection" align="center"  />
    <el-table-column
      v-loading="loading"
      align="center"
      label="计划时间"
      min-width="150px"
      element-loading-text="请给我点时间！"
      prop="planDate"
     
    >
      <template slot-scope="scope">
        <span class="link-type" @click="handle('planDetail',scope.row)">{{ scope.row.planDate }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="180px" align="center" label="客户联系人名称[客户名]">
      <template slot-scope="scope">
        <span class="link-type" @click="handle('relation',scope.row)">{{ scope.row.relationName}}</span>
        <span class="link-type" @click="handle('customer',scope.row)">[{{ scope.row.customerName}}]</span>
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
        <span  v-if="scope.row.iscomplete==1">未完成</span>
        <span  v-else-if="scope.row.iscomplete==0">已完成</span>
        <span  v-else-if="scope.row.iscomplete==null">未执行</span>
      </template>
    </el-table-column>
  </el-table>
  <pagination v-show="listQuery.total>0" :total="listQuery.total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getPlan" />
  
  <el-dialog :title="textMap[title]" :visible.sync="showDialogFlag"  width="60%" @before-close="setClose">
    <relation v-if="title=='relation'" :Rid="Rid"></relation>
    <planDetail v-else-if="title=='planDetail'" :planId="planId" @updatelist="getPlan"></planDetail>
    <updateAdd v-else-if="title=='add'||title=='edit'" :editFlag="editFlag" :planId="planId" @setdialog='showDialogFlag=!showDialogFlag' @updatelist="getPlan"></updateAdd>
    <search v-else-if="title=='search'" @updatelist="searchUpdate"></search>
  </el-dialog>
</div>
  
</template>

<script>
import pagination from '@/components/Pagination'
import customer from '../../../public/customer/all-detail/index'
import planDetail from '../../../public/follow/plan-detail'
import search from '../search/index'
import relation from '../../../public/relation/relationById'
import updateAdd from '../add/index'
import {planAll,deleteFollow,deletePlan} from '@/api/follow'
import {getEmployeeAll} from '@/api/employee'

export default {
  components:{
    pagination,
    customer,
    relation,
    updateAdd,
    search,
    planDetail,
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
      listQuery:{
        total:0,
        page:1,//跳转页码
        size:10,//每页显示的数据条数
      },
      loading: false,
      textMap:{
        search:'搜索',
        add:'新增客户',
        edit:'修改客户信息',
        planDetail:'跟进计划详情',
        customer:'客户详情',
        relation:'联系人详情',
      },
      sortName:'',
      sortType:'',
      searchQuery:{},
      reverse: true,
      employeeOptions:null,
      employeeFilter:null,
      selection:'所有成员',
      params:{},
      planId:'',
      Rid:'', 
      planList:null,
      editFlag:false,
      multipleSelection: [],
    }
  },
  watch:{
    watchTab:{
      deep:true,
      handler:function(val){
        this.getPlan()
      }
    },
    selection(newVal){
      this.selection=newVal
      this.getPlan()
    },
    sortName(newVal){
          this.getPlan()
    },
    sortType(newVal){
      this.getPlan()
    }
  },
  computed: {
    watchTab(){
      return this.$route.query.tab
    }
  },
  created() {    
    this.getEmployee()
    this.getPlan()
  },
  methods: {
     /**
     * 获取所有成员，用于搜索
     * method:getEmployee()
     */
    getEmployee(){
      getEmployeeAll().then(res=>{
        this.employeeOptions=res.data
        this.employeeFilter=res.data
        // console.log("employee")
        // console.log(this.employeeOptions)
      }).catch(err=>{
        console.log(err)
      })
    },
    /**
     * 获取所有跟进计划内容
    */
    getPlan(){
      this.listLoading = true
      this.checkTab()
      this.$set(this.params,'pageNum',this.listQuery.page)
      this.$set(this.params,'pageSize',this.listQuery.size)
      planAll(this.params).then(res=>{
        
        this.listLoading = false
        console.log("为什么修改不跟你更新")
        this.planList=res.data.records
        this.listQuery.total=res.data.total
        this.multipleSelection=[]
      }).catch(err=>{

      })
    },
    /**
     * 清空params
     */
    clearParams(){
      for(let key in this.params){
        delete this.params[key]
      }
    },
     /**
     * 检查变化
     * method:checkTab()
     */
     /**
     * 检查变化
     * method:checkTab()
     */
    checkTab(){
        const tab=this.$route.query.tab
        if(tab=='myfollow'){
          this.clearParams()
          console.log("不是清空了？")
          console.log(this.params)
          if(this.searchQuery){
              this.params=this.searchQuery
          }
          this.$set(this.params,'isMyself','true')

        }else if(tab=='today_follow'){
           this.clearParams()
          if(this.searchQuery){
              this.params=this.searchQuery
          }
          this.$set(this.params,'isToday','true')
          console.log(this.params)
        }else if(tab=='yesterday'){
           this.clearParams()
          if(this.searchQuery){
              this.params=this.searchQuery
          }
          this.$set(this.params,'yesterday','true')
          console.log(this.params)
        }else if(tab=='this_week'){
           this.clearParams()
          if(this.searchQuery){
             
              this.params=this.searchQuery
          }
          this.$set(this.params,'isWeek','true')
          console.log(this.params)
        }else{
           this.clearParams()
          if(this.searchQuery){
              this.params=this.searchQuery
          }
          console.log(this.params)
        }
        
        if(this.selection!='所有成员'){
          this.$set(this.params,'employeeIds',this.selection)
        }
       
        if(this.sortType){
          this.$set(this.params,'sortType',this.sortType)
        }
        if(this.sortName){
          this.$set(this.params,'sortName',this.sortName)
        }
    },
     /**
     * 远程搜索负责人
     * method:remoteMethod()
     */
    remoteMethod(query){
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.employeeOptions = this.employeeFilter.filter(item => {
            return item.name.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 100);
      }else{
        this.employeeOptions=this.employeeFilter
      }
    },
    /**
     * 存储表格选择
     */
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log("数组大小")
      console.log(this.multipleSelection)
    },
    /**
     * 显示产品详情、客户详情、联系人详情
     */
    handle(type,row){
      if(type=='customer'){
         this.$router.push({name:'CustomerDetail',query:{customerId:row.customerId}})
      }else{
        this.title=type
        console.log("tirlrrlrlr")
        console.log(type)
        this.planId=row.id
        this.Rid=row.relationId
        this.showDialogFlag=true
      }
    },
    /**
     * 新增计划
     */
    addPlan(flag,title){
      this.editFlag=flag
      this.title=title
      this.showDialogFlag=true
    },
    /**
     * 修改信息
    */
    editPlan(flag,title){
      console.log('修改数组')
      console.log(this.multipleSelection)
      if(this.multipleSelection.length<=0){
        this.$message.error('请选择需要修改计划！')
      }else if(this.multipleSelection.length>1){
        this.$message.error('只能选择一项进行修改！')
      }else{
        this.editFlag=flag
        this.title=title
        this.showDialogFlag=true
        this.planId=this.multipleSelection[0].id
      }
    },
    /**
     * 关闭前设置editFlag
     */
    setClose(){
      this.editFlag=false
      this.showDialogFlag=false
    },
    /**
     * 删除
     */
     planDelete(){
      if(this.multipleSelection.length>0){
        console.log("选择")
        console.log(this.multipleSelection)
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids=[]

          this.multipleSelection.forEach(item=>{
            // this.$set(query,'id',item.id)
            ids.push(item.id)
          })
          console.log("qeryyyyy")
          console.log(ids)
          deletePlan(ids).then(res=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getPlan()
          }).catch(err=>{
            this.$message({
              type: 'error',
              message: '删除失败!'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }else{
        console.log("未选择")
         this.$message({
              type: 'error',
              message: '请选择!'
            });
      }
    },
    /**
     * 高级搜索
     */
    searchUpdate(val){
       this.searchQuery=val
       this.showDialogFlag=false
       this.getPlan()
    },
    /**
     * 点击搜索
     */
    searchPlan(type){
      this.title=type
      this.showDialogFlag=true
    }
  }
}
</script>

