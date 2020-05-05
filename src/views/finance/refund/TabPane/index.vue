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
      <!-- <el-select v-model="sortName" placeholder="排序" style="width:200px" size="small">
        <el-option label="回款时间" value="ob.order_cost"></el-option>
        <el-option label="回款金额" value="ob.ob.order_actual_total"></el-option>
     </el-select> -->
     <el-select v-model="sortType" placeholder="排序方式" style="width:200px" size="small">
       <el-option label="降序" value="DESC"></el-option>
       <el-option label="升序" value="ASC"></el-option>
     </el-select>
      <el-button size="small" icon="el-icon-search" @click="search('search')">
            搜索
      </el-button>
      <el-button  size="small"  icon="el-icon-delete" @click="Refunddelete">
            删除
      </el-button>
      <el-button :loading="downloadLoading" size="small" icon="el-icon-plus" @click="addOrder(false,'add')" >
        新建
      </el-button>
      <el-button :loading="downloadLoading" size="small" icon="el-icon-edit" @click="editOrder(true,'edit')" >
        修改
      </el-button>
    </div>
    <p></p>
  <el-table :data="refundList" border fit highlight-current-row style="width: 100%"  @selection-change="handleSelectionChange">
   <el-table-column  type="selection" align="center"  />

    <el-table-column label="退款时间" min-width="100px" prop="refundDate" align="center">
      <template slot-scope="scope">
        <span class="link-type" @click="operation(scope.row,'refundDetail')">{{ scope.row.refundDate }}</span>
      </template>
    </el-table-column>

    <el-table-column label="退款金额" min-width="70px" prop="refundAmount" align="center">
      <template slot-scope="scope">
        <span class="link-type" @click="operation(scope.row,'refundDetail')">{{ scope.row.refundAmount }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="100px" align="center" label="客户联系人[客户名称]" >
      <template slot-scope="scope">
        <span class="link-type" @click="operation(scope.row,'relation')">{{ scope.row.relationName}}</span>
        <!-- <span class="link-type" @click="operation(scope.row,'customer')">[{{ scope.row.customerName}}]</span> -->
      </template>
    </el-table-column>

    <el-table-column min-width="150px" label="成交订单" prop="orderBaseMessages" align="center">
      <template slot-scope="scope">
         <span>{{scope.row.orderBaseMessages}}</span>
      </template>
      
    </el-table-column>
    <el-table-column class-name="status-col" label="负责人姓名" min-width="100px" prop="employeeName" align="center">
      <template slot-scope="scope">
        <span class="link-type" @click="operation(scope.row,'employee')">{{ scope.row.employeeName }}</span>
      </template>
    </el-table-column>

  </el-table>
  <pagination v-show="listQuery.total>0" :total="listQuery.total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getRefund" />
  
  <el-dialog :title="textMap[title]" :visible.sync="showDialogFlag" append-to-body>
    <refundDetail v-if="title=='refundDetail'" :Rid="refundId"></refundDetail>
    <search v-else-if="title=='search'" @updatelist="searchUpdate"></search>
    <addUpdate v-else-if="title=='add'||title=='edit'" :edit="editFlag" :refundId="refundId" @setdialog="setDialogFlag" @seteditflag="setEditFlag" @updatelist="getRefund"></addUpdate>
    <relation v-else-if="title=='relation'" :Rid="Rid"></relation>
    <employee v-else-if="title=='employee'" :id="Eid"></employee>
  </el-dialog>
</div>
</template>

<script> 
import {getAllRefund,deleteRefund} from '@/api/refund'
import {getEmployeeAll} from '@/api/employee'
import pagination from '@/components/Pagination'
import show from '../../../public/customer/all-detail/index'
import addUpdate from '../add-update/index'
import search from '../search/index'
import refundDetail from '../../../public/finance/refund/refund-detail'
import relation from '../../../public/relation/relationById'
import employee from '../../../public/employee/index'

export default {
  components:{
    pagination,
    show,
    search,
    refundDetail,
    addUpdate,
    relation,
    employee
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
        add:'新增回款信息',
        refundDetail:'退款详情',
        edit:'修改订单信息',
        relation:'联系人详情',
        employee:'负责人详情'
      },
      employeeOptions:null,
      employeeFilter:null,
      selection:'所有成员',
      refundList:null,
      sortType:'',
      sortName:'',
      searchQuery:null,
      Oid:'',
      Eid:'',
      Rid:'',
      refundId:'',
      multipleSelection:[],
      params:{},
      editFlag:false
    }
  },
  watch:{
    watchTab:{
      deep:true,
      handler:function(val){
        this.getRefund()
      }
    },
    // sortName(newVal){
    //   console.log("sortName")         
    //     this.getRefund()
    // },
    sortType(newVal){
      this.getRefund()
    },
    selection(newVal){
      this.getRefund()
    }
  },
   computed: {
    watchTab(){
      return this.$route.query.tab
    },
   
  },
  created() {    
    this.getRefund()
    this.getEmployee()

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
     * 获取所有订单信息
     */
    getRefund(){
      //检查tab
      this.checkTab()
      this.$set(this.params,'pageNum',this.listQuery.page)
      this.$set(this.params,'pageSize',this.listQuery.size)
      getAllRefund(this.params).then(res=>{
        this.listLoading = false
        this.refundList = res.data.list
        this.listQuery.total=res.data.total
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
    checkTab(){
        const tab=this.$route.query.tab
        if(tab=='today'){
          this.clearParams()
          console.log("不是清空了？")
          console.log(this.params)
          if(this.searchQuery){
              this.params=this.searchQuery
          }
          this.$set(this.params,'isToday','true')

        }else if(tab=='yestoday'){
           this.clearParams()
          if(this.searchQuery){
              this.params=this.searchQuery
          }
          this.$set(this.params,'yesterday','true')
          console.log(this.params)
        }else if(tab=='this_month'){
           this.clearParams()
          if(this.searchQuery){
              this.params=this.searchQuery
          }
          this.$set(this.params,'isMouth','true')
          console.log(this.params)
        }else if(tab=='last_month'){
           this.clearParams()
          if(this.searchQuery){
              this.params=this.searchQuery
          }
          this.$set(this.params,'preMouth','true')
          console.log(this.params)
        }else{
           this.clearParams()
          if(this.searchQuery){
              this.params=this.searchQuery
          }
          console.log(this.params)
        }
        
        if(this.selection!='所有成员'){
          this.$set(this.params,'employeeId',this.selection)
        }
       
        if(this.sortType){
          this.$set(this.params,'sortType',this.sortType)
        }
        if(this.sortName){
          this.$set(this.params,'sortName',this.sortName)
        }
    },
    /**
     * 点击进行操作
     */
    operation(row,title){
     
      this.title=title
      console.log("row")
      console.log(row.id)

      this.Rid=row.relationId
      this.Eid=row.employeeId
      this.refundId=row.id
      this.showDialogFlag=true
      this.editFlag=true
     
    },
    /**
     * 设置dialog
     */
    setDialogFlag(){
      this.showDialogFlag=false
      this.editFlag=false
    },
    /**
     * 更新列表
     */
    updateList(searchQuery){
      if(this.title=='search'){
        this.searchQuery=searchQuery
      }
      console.log("search......")
      console.log(this.searchQuery)
      this.getRefund()
      this.showDialogFlag=false
    },
    /**
     * 点击搜索
     */
    search(title){
      this.title=title
      this.showDialogFlag=true
    },
     /**
     * 新增订单
     */
    addOrder(flag,title){
      this.editFlag=flag
      this.title=title
      this.showDialogFlag=true
    },
    /**
     * 修改信息
    */
    editOrder(flag,title){
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
        this.refundId=this.multipleSelection[0].id
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
     * 删除
     */
    Refunddelete(){
        if(this.multipleSelection.length>0){
        console.log("选择")
        console.log(this.multipleSelection)
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let refundId=[]
          this.multipleSelection.forEach(item=>{
           refundId.push(item.id)
          })
          deleteRefund(refundId).then(res=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getRefund()
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
       this.getRefund()
    },
    /**
     * 设置editFlag
     */
    setEditFlag(){
      this.editFlag=false
    }
  }
}
</script>

