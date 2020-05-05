<template>
  <div>
    <div>
      <employeeSelect v-model="selection"></employeeSelect>
     <el-select v-model="sortName" placeholder="排序" style="width:200px" size="small" >
       <el-option label="跟进时间" value="f.follow_time"></el-option>
     </el-select>
     <el-select v-model="sortType" placeholder="排序方式" style="width:200px" size="small" :clearable="true" >
       <el-option v-for="item in sortTypeOpts" :key="item.value" :label="item.label" :value="item.value" />
     </el-select>
      <el-button size="small" icon="el-icon-search" @click="search">
            搜索
      </el-button>
       <el-button  size="small" icon="el-icon-edit" @click="add" >
        新建
      </el-button>
    </div>
    <p></p>
     <div style="margin-top:20px">
      <el-timeline>
        <el-timeline-item
          v-for="(item, index) in followList"
          :key="index"
          icon="people"
          :timestamp="item.followResult">
             <span>录入人：</span>
             <span class="detail" @click="viewEmployee(item)">{{item.employeeName}}</span>
             <span>&nbsp;&nbsp;&nbsp;&nbsp;录入时间：</span>
             <span @click="followDetail(item)" class="detail">{{item.followTime|formateDate}}</span>
              <p></p>
              <div>
                <span>联系人名称&nbsp;&nbsp;[客户名称]：</span>
                <span class="detail" @click="viewRelation(item)">{{item.relationName}}</span>
                <span class="detail" @click="viewCustomer(item)">&nbsp;&nbsp;[{{item.customerName}}]</span>
              </div>
              <div>
                <span>跟进方式:</span>
                <span>{{item.followWay}}</span>
              </div>
               <div>
                <span>跟进过程:</span>
                <span>{{item.followDetail}}</span>
              </div>
              <div  style="float:right" >
                  <el-button size="small" icon="el-icon-delete" @click="deletefollow(item.id,index)">删除</el-button>
                  <el-button size="small" icon="el-icon-edit" @click="edit(item)">修改</el-button>
                  <el-button size="small" icon="el-icon-document" @click="followDetail(item)">详情</el-button>
              </div>
        </el-timeline-item>
      </el-timeline>
      <pagination v-show="listQuery.total>0" :total="listQuery.total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getFollow" />
      <employee ref="employee"></employee>
      <search ref="search" @updatelist="getFollow"></search>
      <add ref="add" @updatelist="getFollow"></add>
      <followDetail ref="followDetail" @updatefollow="getFollow"></followDetail>
      <relation ref="relation"></relation>
  </div>
  </div>
</template>
<script>
import employeeSelect from '../employeeSelect/employeeSelect'
import { sortTypeOpts } from '@/utils/common.js'
import followDetail from './follow-detail'
import employee from '../employee/index'
import relation from '../relation/relationById'
import customer from '../customer/all-detail/index'
import add from '../../crm/contact-follow/add/index'
import {getFollowAll,deleteFollow} from '@/api/follow'
import search from '../../crm/contact-follow/search/index'
import moment from 'moment'
import pagination from '@/components/Pagination'
import assign from 'lodash/assign'
import {parseTime} from '@/utils/formateDate'

export default {
  components:{
    followDetail,
    relation,
    customer,
    employee,
    search,
    pagination,
    add,
    employeeSelect
  },
  filters:{
    formateDate(date){
       return parseTime(date)
    }
  },
  props:['Cid'],
  data() {
    return {
      sortTypeOpts,
      listQuery:{
        total:0,
        page:1,//跳转页码
        size:10,//每页显示的数据条数
      },
      sortName:'',
      sortType:'',
      dialogFlag:false,
      reverse: true,
      btnFlag:['false'],
      type:'',
      followList:null,
      params:{
        pageNum:1,
        pageSize:10
      },
      employeeOptions:null,
      employeeFilter:null,
      selection:'所有成员',
      employeeId:'',
      relationId:'',
      customerId:'',
      followId:'',
      editFlag:false,
    }
  },
  created() {
    this.getFollow()
  },
  watch:{
    watchTab:{
      deep:true,
      handler:function(val){
        this.getFollow()
      }
    },
    selection(newVal){
     this.selection = newVal
      this.getFollow()
    },
    sortName(newVal){
         
          this.getFollow()
    },
    sortType(newVal){
      this.getFollow()
    }
  },
  computed: {
    watchTab(){
      return this.$route.query.tab
    },
   
  },
  methods:{ 
    getFollow(searchQuery){
      //检查tab
       if (searchQuery) {
        assign(this.params, searchQuery)
      } else {
        this.params = {}
      }
      this.checkTab()
      assign(this.params, this.listQuery)
      if(this.Cid){
        this.$set(this.params,'customerId',this.Cid)
      }
      getFollowAll(this.params).then(res=>{
        this.followList=res.data.records
        this.listQuery.total=res.data.total
      }).catch(err=>{
        console.log(err)
      })
    },
    clearParams(){
      for(let key in this.params){
        delete this.params[key]
      }
    },
    checkTab(){
        const tab=this.$route.query.tab
        if(tab=='myfollow'){
          this.clearParams()
          this.$set(this.params,'isMyself','true')

        }else if(tab=='today_follow'){
           this.clearParams()
          this.$set(this.params,'isToday','true')
        }else if(tab=='yesterday'){
           this.clearParams()
          this.$set(this.params,'yesterday','true')
        }else if(tab=='this_week'){
           this.clearParams()
          this.$set(this.params,'isWeek','true')
        }else if(tab=='this_month'){
          this.clearParams()
          this.$set(this.params,'isMouth','true')
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
    viewEmployee(item){
      this.$refs.employee.show(item.employeeId)
    },
    viewRelation(item){
      this.$refs.relation.show(item.relationId)
    },
    viewCustomer(item){
      this.$router.push({
        name: 'CustomerDetail',
        query: { customerId: item.customerId, customerName: item.customerName }
      })
    },
    edit(item){
      this.$refs.followDetail.show(item, 'edit')
    },
    followDetail(item){
      this.$refs.followDetail.show(item, 'detail')
    },
    deletefollow(id,index){
      let query={
        id
      }
      this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          /**
           * 删除请求
           */
          deleteFollow(query).then(res=>{
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getFollow()
          }).catch(err=>{
              this.$message({
                type: 'error',
                message: '删除失败，请重试!'
              });
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });    
        })   
     
    },
    search(){
      this.$refs.search.show()
    },
    add(){
      this.$refs.add.show()
    }
  }
}
</script>
<style scoped>
.detail:hover{
  cursor: pointer;
  color: blue
}
</style>