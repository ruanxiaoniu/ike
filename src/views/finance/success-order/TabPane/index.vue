<template>
<div>
   <div style="margin-top:10px">
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
      <el-select v-model="sortName" placeholder="排序" style="width:200px">
        <el-option label="订单总成本" value="orderCost"></el-option>
        <el-option label="订单成交总额" value="orderTotal"></el-option>
        <el-option label="订单实际成交总额" value="orderActualTotal"></el-option>
        <el-option label="订单时间" value="orderTime"></el-option>
     </el-select>
     <el-select v-model="sortType" placeholder="排序方式" style="width:200px">
       <el-option label="降序" value="DESC"></el-option>
       <el-option label="升序" value="ASC"></el-option>
     </el-select>
      <el-button size="small" icon="el-icon-search" @click="search('search')">
            搜索
      </el-button>
      <el-button  size="small"  icon="el-icon-delete" @click="deleteOrder">
            删除
      </el-button>
      <el-button :loading="downloadLoading" size="small" icon="el-icon-plus" @click="addOrder(false,'add')" >
        新建
      </el-button>
      <el-button :loading="downloadLoading" size="small" icon="el-icon-edit" @click="editOrder(true,'edit')" >
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
  <el-table :data="orderList" border fit highlight-current-row style="width: 100%"  @selection-change="handleSelectionChange">
   <el-table-column  type="selection" align="center"  />

    <el-table-column label="下单时间" min-width="120px" prop="orderTime" align="center">
      <template slot-scope="scope">
        <span class="link-type">{{ scope.row.orderTime }}</span>
      </template>
    </el-table-column>

    <el-table-column label="负责人" min-width="70px" prop="employeeName" align="center">
      <template slot-scope="scope">
        <span class="link-type" @click="operation(scope.row,'employee')">{{ scope.row.employeeName }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="100px" align="center" label="客户联系人" prop="relationName" >
      <template slot-scope="scope">
        <span class="link-type" @click="operation(scope.row,'relation')">{{ scope.row.relationName}}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="80px" label="成交总额" prop="orderActualTotal" align="center">
       <template slot-scope="scope">
        <span class="link-type" @click="operation(scope.row,'orderProduct')">{{ scope.row.orderActualTotal }}</span>
      </template>
    </el-table-column>

   <el-table-column align="center" label="总成本" width="90px" prop="orderCost" >
      <template slot-scope="scope">
        <span class="link-type" @click="operation(scope.row,'orderProduct')">{{ scope.row.orderCost }}</span>
      </template>
    </el-table-column>

    <el-table-column class-name="status-col" label="创建时间" min-width="120px" prop="createTime" align="center">
      <template slot-scope="scope">
        <span class="link-type">{{ scope.row.createTime }}</span>
      </template>
    </el-table-column>

  </el-table>
  <pagination v-show="listQuery.total>0" :total="listQuery.total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getOrder" />
  
  <el-dialog :title="textMap[title]" :visible.sync="showDialogFlag" width="60%">
    <orderDetail v-if="title=='orderProduct'" :Oid="Oid"></orderDetail>
    <search v-else-if="title=='search'" @updatelist="searchUpdate"></search>
    <addUpdate v-else-if="title=='add'||title=='edit'" :edit="editFlag" :Oid="Oid" @setdialog="setDialogFlag" @seteditflag="setEditFlag" @updatelist="getOrder"></addUpdate>
    <relation v-else-if="title=='relation'" :Rid="Rid"></relation>
    <employee v-else-if="title=='employee'" :id="Eid"></employee>
  </el-dialog>
</div>
</template>

<script> 
import {searchOrder,deleteOrder} from '@/api/order'
import {getEmployeeAll} from '@/api/employee'
import pagination from '@/components/Pagination'
import show from '../../../public/customer/all-detail/index'
import addUpdate from '../add-update/index'
import search from '../search/index'
import orderDetail from '../../../public/finance/order/order-detail'
import relation from '../../../public/relation/relationById'
import employee from '../../../public/employee/index'
export default {
  components:{
    pagination,
    show,
    search,
    orderDetail,
    addUpdate,
    relation,
    employee
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
    },
    Cid:''
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
        add:'新增订单信息',
        orderProduct:'订单详情',
        edit:'修改订单信息',
        relation:'联系人详情',
        employee:'负责人详情'
      },
      employeeOptions:null,
      employeeFilter:null,
      selection:'所有成员',
      orderList:null,
      sortType:'',
      sortName:'',
      searchQuery:null,
      Oid:'',
      Eid:'',
      Rid:'',
      multipleSelection:[],
      params:{},
      editFlag:false
    }
  },
  watch:{
    watchTab:{
      deep:true,
      handler:function(val){
        this.getOrder()
      }
    },
    sortName(newVal){
      console.log("sortName")         
        this.getOrder()
    },
    sortType(newVal){
      this.getOrder()
    },
    selection(newVal){
      this.getOrder()
    }
  },
   computed: {
    watchTab(){
      return this.$route.query.tab
    },
   
  },
  created() {    
    this.getOrder()
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
    getOrder(){
      //检查tab
      this.checkTab()
      this.$set(this.params,'pageNum',this.listQuery.page)
      this.$set(this.params,'pageSize',this.listQuery.size)
      if(this.Cid){
        this.$set(this.params,'customerId',this.Cid)
      }
      searchOrder(this.params).then(res=>{
        this.listLoading = false
        this.orderList = res.data.list
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
        if(tab=='unpaid'){
          this.clearParams()
          console.log("不是清空了？")
          console.log(this.params)
          if(this.searchQuery){
              this.params=this.searchQuery
          }
          this.$set(this.params,'orderState',0)

        }else if(tab=='paid'){
           this.clearParams()
          if(this.searchQuery){
              this.params=this.searchQuery
          }
          this.$set(this.params,'orderState',1)
          console.log(this.params)
        }else if(tab=='returning'){
           this.clearParams()
          if(this.searchQuery){
              this.params=this.searchQuery
          }
          this.$set(this.params,'orderState',2)
          console.log(this.params)
        }else if(tab=='refunding'){
           this.clearParams()
          if(this.searchQuery){
             
              this.params=this.searchQuery
          }
          this.$set(this.params,'orderState',3)
          console.log(this.params)
        }else if(tab=='refunded'){
           this.clearParams()
          if(this.searchQuery){
              this.params=this.searchQuery
          }
          this.$set(this.params,'orderState',4)
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
      this.Oid=row.id
      console.log("row")
      console.log(row.id)
      this.Rid=row.relationId
      this.Eid=row.employeeId
      this.showDialogFlag=true
    },
    /**
     * 设置dialog
     */
    setDialogFlag(){
      this.showDialogFlag=false
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
      this.getOrder()
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
        this.Oid=this.multipleSelection[0].id
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
    deleteOrder(){
       if(this.multipleSelection.length>0){
        console.log("选择")
        console.log(this.multipleSelection)
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let order_base_id=[]
          // let query={
          //   order_base_id:[]
          // }
          this.multipleSelection.forEach(item=>{
            // this.$set(query,'id',item.id)
            order_base_id.push(item.id)
          })
          console.log("qeryyyyy")
          // console.log(order_base_id)
          deleteOrder(order_base_id).then(res=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getOrder()
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
       this.getOrder()
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

