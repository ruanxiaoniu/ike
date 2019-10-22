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
       <el-option label="跟进计划创建时间" value="fp.plan_time"></el-option>
     </el-select>
     <el-select v-model="sortType" placeholder="排序方式" style="width:200px" size="small" >
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
  <el-table :data="list" border fit highlight-current-row style="width: 100%"  >
   <el-table-column  type="selection" align="center"  />
    <el-table-column
      v-loading="loading"
      align="center"
      label="跟进时间"
      min-width="150px"
      element-loading-text="请给我点时间！"
      prop="customer_name"

    >
      <template slot-scope="scope">
        <span class="link-type" @click="operation('planDetail')">{{ scope.row.customer_name }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="180px" align="center" label="客户联系人名称[客户名]" prop="customer_state">
      <template slot-scope="scope">
        <span class="link-type" @click="operation('relation')">{{ scope.row.customer_state}}</span>
        <span class="link-type" @click="operation('customer')">[客户名]</span>
      </template>
    </el-table-column>

    <el-table-column min-width="100px" align="center" label="计划内容" prop="customer_stage">
      <template slot-scope="scope">
        <span class="link-type">{{ scope.row.customer_stage }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="100px" align="center" label="员工名称" prop="customer_level">
      <template slot-scope="scope">
        <span class="link-type">{{ scope.row.customer_level }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="100px" label="是否完成" prop="customer_origin">
       <template slot-scope="scope">
        <span class="link-type">{{ scope.row.customer_origin }}</span>
      </template>
    </el-table-column>
  </el-table>
  <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  
  <el-dialog :title="textMap[operation_type]" :visible.sync="showDialogFlag"  width="60%">
    <relation v-if="operation_type=='relation'"></relation>
    <customer v-else-if="operation_type=='customer'"></customer>
    <planDetail v-else-if="operation_type=='planDetail'"></planDetail>
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
import pagination from '@/components/Pagination'
import customer from '../../../public/customer/all-detail/index'
import planDetail from '../../../public/follow/plan-detail'
import update from '../update/index'
import search from '../search/index'
import add from '../add/index'
import relation from '../../../public/relation/relation'

import {getFollowAll,deleteFollow} from '@/api/follow'
import {getEmployeeAll} from '@/api/employee'
export default {
  components:{
    pagination,
    customer,
    relation,
    update,
    search,
    add,
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
      operation_type:'',//判断是修改还是其他操作,update为修改
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
        planDetail:'跟进计划详情',
        customer:'客户详情',
        relation:'联系人详情',
        customer_origin:'修改客户来源',
        relation_primary:'修改主联系手机号',
        landline_number:'修改主联系座机号',
        end_follow:'修改最后跟进时间',
        employee:'修改负责人'
      },
      sortName:'',
      sortType:'',
      searchQuery:{},
      reverse: true,
      employeeOptions:null,
      employeeFilter:null,
      selection:'所有成员',
    }
  },
  created() {    
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
        }else if(tab=='this_month'){
           this.clearParams()
          if(this.searchQuery){
              this.params=this.searchQuery
          }
          this.$set(this.params,'isMouth','true')
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
    text(){
        alert('hh')
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

