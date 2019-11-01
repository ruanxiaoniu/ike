<template>
  <div>
    <div>
      <el-select v-if="arrangeMyself" style="width:200px" size="small" v-model="arrangeId" placeholder="安排人">
        <el-option-group>
          <el-option label="所有安排人" value="所有安排人"></el-option>
        </el-option-group>
        <el-option-group label="指定成员">
          <el-option v-for="(item) in employeeOptions" :key="item.id" :label="item.name" :value="item.id"> </el-option>
        </el-option-group>
      </el-select>

      <el-select v-if="chargeMyself" style="width:200px" size="small" v-model="chargeId" placeholder="执行人">
        <el-option-group>
          <el-option label="所有负责人" value="所有负责人"></el-option>
        </el-option-group>
        <el-option-group label="指定成员">
          <el-option v-for="(item) in employeeOptions" :key="item.id" :label="item.name" :value="item.id"> </el-option>
        </el-option-group>
      </el-select>
      
      <el-select v-model="sortName" placeholder="排序" style="width:200px" size="small">
        <el-option label="跟进任务创建时间" value="fa.create_time"></el-option>
        <el-option label="跟进任务执行时间" value="fa.execute_time"></el-option>
      </el-select>
      <el-select v-model="sortType" placeholder="排序方式" style="width:200px" size="small">
        <el-option label="降序" value="desc"></el-option>
        <el-option label="升序" value="asc"></el-option>
      </el-select>
      <el-button size="small" icon="el-icon-search" @click="serachArrange('search')">搜索</el-button>
      <el-button :loading="downloadLoading" size="small" icon="el-icon-plus" @click="addArrange(false,'add')">新建</el-button>
      <el-button :loading="downloadLoading" size="small" icon="el-icon-edit" @click="editArrange(true,'edit')">修改</el-button>
      <el-button size="small" icon="el-icon-delete" @click="deleteArrange">删除</el-button>
    </div>
    <p></p>
    <el-table :data="arrangeList" border fit highlight-current-row style="width: 100%" @selection-change="handleSelectionChange" >
      <el-table-column type="selection" align="center"/>
      <el-table-column
        v-loading="loading"
        align="center"
        label="创建时间"
        min-width="150px"
        element-loading-text="请给我点时间！"
        prop="create_time"
      >
        <template slot-scope="scope">
          <span class="link-type" @click="handle('arrangeDetail',scope.row)" >{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" align="center" label="安排人姓名" prop="arrangeName">
        <template slot-scope="scope">
          <span>{{ scope.row.arrangeName }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" align="center" label="负责人姓名" prop="chargeName">
        <template slot-scope="scope">
          <span>{{ scope.row.chargeName }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" align="center" label="执行时间" prop="executeTime">
        <template slot-scope="scope">
          <span>{{ scope.row.executeTime }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="180px" align="center" label="客户联系人名称[客户名]">
        <template slot-scope="scope">
          <span class="link-type" @click="handle('relation',scope.row)">{{ scope.row.relationName}}</span>
          <span class="link-type" @click="handle('customer',scope.row)">[{{ scope.row.customerName}}]</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" align="center" label="已读状态" prop="isread">
        <template slot-scope="scope">
          <span v-if="scope.row.isread == 0" >已读</span>
          <span v-if="scope.row.isread == null" >未读</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" align="center" label="完成状态" prop="iscomplete">
        <template slot-scope="scope">
          <span v-if="scope.row.iscomplete == null" >未执行</span>
          <span v-if="scope.row.iscomplete == 0" >完成</span>
          <span v-if="scope.row.iscomplete == 1" >失败</span>
        </template>
      </el-table-column>

    </el-table>
    <pagination v-show="listQuery.total>0" :total="listQuery.total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getArrange" />
  
    <el-dialog :title="textMap[title]" :visible.sync="showDialogFlag"  width="60%" @before-close="setClose">
      <relation v-if="title=='relation'" :Rid="Rid"></relation>
      <arrangeDetail v-else-if="title=='arrangeDetail'" :Aid="Aid" @updatelist="getArrange"></arrangeDetail>
      <updateAdd v-else-if="title=='add'||title=='edit'" :editFlag="editFlag" :Aid="Aid" @setdialog='showDialogFlag=!showDialogFlag' @updatelist="getArrange"></updateAdd>
      <search v-else-if="title=='search'" @updatelist="searchUpdate"></search>
  </el-dialog>
  </div>

</template>

<script>
  import {getArrangeAll , arrangeFail, arrangeComplete, updateArrange, deleteArrange, addArrange} from '@/api/arrange'
  import {getCustomerAll} from '@/api/customer'
  import pagination from '@/components/Pagination'
  import customer from '../../../public/customer/all-detail/index'
  import arrangeDetail from '../../../public/follow/task-detail'
  import search from '../search/index'
  import updateAdd from '../add/index'
  import relation from '../../../public/relation/relation'
  import {getEmployeeAll} from '@/api/employee'

  export default {

    components: {
      pagination,
      customer,
      relation,
      search,
      arrangeDetail,
      updateAdd,
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
      customerId:''
    },
    data() {
      return {
        arrangeState: '未完成',
        readState: '未读',
        arrangeList: null,
        total: 0,
        title: '',
        showDialogFlag: false,
        listQuery:{
          total:0,
          page:1,//跳转页码
          size:10,//每页显示的数据条数
        },
        loading: false,
        textMap: {
          search:'搜索',
          add:'新增任务',
          edit:'修改任务',
          arrangeDetail:'任务详情',
          customer:'客户详情',
          relation:'联系人详情',
        },
        Aid:'',
        Rid:'',
        Cid:'',
        modelType: '',
        sortName:'',
        sortType:'',
        searchQuery:{},
        reverse: true,
        employeeOptions:null,
        employeeFilter:null,
        params:{},
        arrangeId:'所有安排人',
        chargeId:'所有负责人',
        relationId:'', 
        editFlag:false,
        multipleSelection: [],
      }
    },
    watch:{
      watchTab:{
      deep:true,
        handler:function(val){
          this.getArrange()
        }
      },
      arrangeId(newVal){
        this.arrangeId=newVal
        this.getArrange()
      },
      chargeId(newVal){
        this.chargeId=newVal
        this.getArrange()
      },
      sortName(newVal){
        this.getArrange()
      },
      sortType(newVal){
        this.getArrange()
      }
    },
    computed: {
      watchTab(){
        return this.$route.query.tab
      }
    },
  
    created() {
      const tab=this.$route.query.tab
      if(tab=='arrangeMyself'){
        this.arrangeMyself = false
        this.chargeMyself = true
      }else if(tab=='chargeMyself'){
        this.chargeMyself = false
        this.arrangeMyself = true
      }else{
        this.chargeMyself = true
        this.arrangeMyself = true
      }

      this.getEmployee()
      this.getArrange()
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
       * 获取所有任务信息
       */
      getArrange() {
        console.log("查询任务信息")
        this.loading = true
        this.checkTab()
        this.$set(this.params,'pageNum',this.listQuery.page)
        this.$set(this.params,'pageSize',this.listQuery.size)
        if(this.customerId){
           this.$set(this.params,'customerId',this.customerId)
        }
        getArrangeAll(this.params).then(response => {
          console.log(this.listQuery)
          console.log(this.arrangeList)
          this.arrangeList = response.data.records
          this.loading = false
          this.listQuery.total=response.data.total
          this.multipleSelection=[]
          console.log(this.listQuery)
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
        if(tab=='arrangeMyself'){
          this.clearParams()
          console.log("不是清空了？")
          console.log(this.params)
          if(this.searchQuery){
              this.params=this.searchQuery
          }
          this.$set(this.params,'arrangeMyself','true')

        }else if(tab=='chargeMyself'){
          this.clearParams()
          if(this.searchQuery){
              this.params=this.searchQuery
          }
          this.$set(this.params,'chargeMyself','true')
          console.log(this.params)
        }else{
          this.clearParams()
          if(this.searchQuery){
              this.params=this.searchQuery
          }
          console.log(this.params)
        }
        
        if(this.arrangeId != '所有安排人' ){
          this.$set(this.params,'arrangeId',this.arrangeId)
        }else{
          delete this.params['arrangeId']
        }

        if(this.chargeId != '所有负责人' ){
          this.$set(this.params,'chargeId',this.chargeId)
        }else{
          delete this.params['chargeId']
        }
        console.log(this.params)

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
       * 显示详情
       */
      handle(type,row){
        if(type=='customer'){
          this.$router.push({name:'CustomerDetail',query:{customerId:row.customerId}})
        }else{
          this.title=type
          console.log("tirlrrlrlr")
          console.log(type)
          this.Aid=row.id
          this.Rid=row.relationId
          this.showDialogFlag=true
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
       * 新增计划
       */
      addArrange(flag,title){
        this.editFlag=flag
        this.title=title
        this.showDialogFlag=true
      },
      
      /**
       * 修改信息
      */
      editArrange(flag,title){
        console.log('修改数组')
        console.log(this.multipleSelection)
        if(this.multipleSelection.length<=0){
          this.$message.error('请选择需要修改的任务')
        }else if(this.multipleSelection.length>1){
          this.$message.error('只能选择一项进行修改！')
        }else{
          this.editFlag=flag
          this.title=title
          this.showDialogFlag=true
          this.Aid=this.multipleSelection[0].id
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
      deleteArrange(){
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
            deleteArrange(ids).then(res=>{
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getArrange()
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
          this.getArrange()
      },
      /**
       * 点击搜索
       */
      serachArrange(type){
        this.title=type
        this.showDialogFlag=true
      }
      
    }
  }
</script>

