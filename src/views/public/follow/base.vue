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
       <el-option label="跟进时间" value="f.follow_time"></el-option>
     </el-select>
     <el-select v-model="sortType" placeholder="排序方式" style="width:200px" size="small" >
       <el-option label="降序" value="desc"></el-option>
       <el-option label="升序" value="asc"></el-option>
     </el-select>
      <el-button size="small" icon="el-icon-search" @click="handle('search')">
            搜索
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
     <div style="margin-top:20px">
      <el-timeline>
        <el-timeline-item
          v-for="(item, index) in followList"
          :key="index"
          icon="people"
          :timestamp="item.followResult">
             <!-- <span>{{index}}</span> -->
             <span>录入人：</span>
             <span class="detail" @click="show('employee',item)">{{item.employeeName}}</span>
             <span>&nbsp;&nbsp;&nbsp;&nbsp;录入时间：</span>
             <span @click="show('followDetail',item)" class="detail">{{item.followTime|formateDate}}</span>
              <p></p>
              <div>
                <span>联系人名称&nbsp;&nbsp;[客户名称]：</span>
                <span class="detail" @click="show('relation',item)">{{item.relationName}}</span>
                <span class="detail" @click="show('customer',item)">&nbsp;&nbsp;[{{item.customerName}}]</span>
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
                  <el-button size="small" icon="el-icon-edit" @click="edit('followDetail',true,item)">修改</el-button>
                  <el-button size="small" icon="el-icon-document" @click="show('followDetail',item)">详情</el-button>
              </div>
              
        </el-timeline-item>
      </el-timeline>
      <pagination v-show="listQuery.total>0" :total="listQuery.total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getFollow" />
      <el-dialog :title="textMap[type]" :visible.sync="dialogFlag" append-to-body="true" width="60%" :before-close="setEditFlag">
        <followDetail v-if="type=='followDetail'" :id="followId" :edit="editFlag" @setedit="setEditFlag" @updatefollow="getFollow"></followDetail>
        <relation v-else-if="type=='relation'" :Rid="relationId"></relation>
        <customer v-else-if="type=='customer'" :Cid="customerId"></customer>
        <employee v-else-if="type=='employee'" :id="employeeId"></employee>
        <search v-if="type=='search'" @updatelist='updateList'></search>
      </el-dialog>
     
  </div>
  </div>
</template>
<script>
import followDetail from '../../public/follow/follow-detail'
import relation from '../../public/customer/relationById'
import customer from '../../public/customer/all-detail/index'
import employee from '../../public/employee/index'
import {getFollowAll,deleteFollow} from '@/api/follow'
import {getEmployeeAll} from '@/api/employee'
import search from '../../crm/contact-follow/search/index'
import moment from 'moment'
import pagination from '@/components/Pagination'
export default {
  components:{
    followDetail,
    relation,
    customer,
    employee,
    search,
    pagination
  },
  filters:{
    formateDate(date){
       return moment(date).format('YYYY-MM-DD HH:MM:SS')
    }
  },
  data() {
    return {
      textMap:{
        followDetail:'跟进详情',
        relation:'联系人详情',
        customer:'客户详情',
        employee:'录入人详情',
        search:'搜索',
        add:'新建跟进',
       
      },
      listQuery:{
        total:0,
        page:1,//跳转页码
        size:10,//每页显示的数据条数
      },
      sortName:'',
      sortType:'',
      searchQuery:{},
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
    this.getEmployee()
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
       this.selection=newVal
        console.log("selection啦啦啦啦")            
          console.log(newVal) 
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
     * 获取所有跟进信息
     * method:getFollow()
     */
    getFollow(){
      //检查tab
      this.checkTab()
      console.log("params!!!")
      this.$set(this.params,'pageNum',this.listQuery.page)
      this.$set(this.params,'pageSize',this.listQuery.size)
      console.log(this.params)
      getFollowAll(this.params).then(res=>{
        this.followList=res.data.records
        this.listQuery.total=res.data.total
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
     * 不同点击显示不同弹框模块
     * method:show()
     */
    show(type,item){
      this.followId=item.id
      this.employeeId=item.employeeId
      this.relationId=item.relationId
      this.customerId=item.customerId
      console.log("employeeId")
      console.log(this.employeeId)
      this.type=type
      this.dialogFlag=true
    },
    /**
     * 点击修改
     * method:edit()
    */
    edit(type,editFlag,item){
      this.editFlag=editFlag
      this.followId=item.id
      this.type=type
      this.dialogFlag=true
    },
    /**
     * 点击删除
     * method:deletefollow()
     */
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
              this.followList.splice(index,1)
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
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
    text(v){
      console.log(this.btnFlag)
      console.log(v=="true")
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
     * 跟新editFlag
     * method:setEditFlag()
     */
    setEditFlag(){
      console.log("seeeee")
      this.dialogFlag=false
      this.editFlag=false
      
    },
    /**
     * 获取搜索组件返回来的条件
     */
    updateList(val){
       this.searchQuery=val
       this.setEditFlag()
       this.getFollow()
    },
    /**
     * 点击新建或删除
     */
    handle(type){
      this.type=type
      this.dialogFlag=true
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