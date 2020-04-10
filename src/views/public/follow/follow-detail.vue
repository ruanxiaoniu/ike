<template>
  <div v-if="dialogVisible">
    <el-dialog :title="type == 'edit' ? '修改跟进详情': '跟进详情'" :visible.sync="dialogVisible">
      <el-form ref="followForm" :model="follow" label-width="200px" :rules="rules" style="width:500px">
      <el-form-item label="跟进时间:" prop="followTime">
          <el-date-picker
            v-if="type == 'edit'"
            v-model="follow.followTime"
            type="datetime"
          placeholder="选择跟进时间" />
        <span v-else>{{follow.followTime|formateDate}}</span>
      </el-form-item>
      <el-form-item v-if="type == 'edit'" label="客户联系人名称" prop="relationName"> 
        <el-select v-model="relation" placeholder="请选择联系人" value-key="relationId">
          <el-option v-for="(item) in relationList" :key="item.relationId" :label="item.relationName" :value="item"/>
        </el-select>
      </el-form-item>
      <el-form-item v-if="type == 'edit'" label="客户名称" prop="customerName">
        <el-input v-model="follow.customerName" v-if="type == 'edit'"></el-input>
      </el-form-item>
      <el-form-item v-else label="客户联系人名称[客户名称]:">         
        <span >{{follow.relationName}}&nbsp;&nbsp;[{{follow.customerName}}]</span>
      </el-form-item>
      <el-form-item label="跟进方式:" prop="followWay">
        <el-input v-model="follow.followWay" v-if="type == 'edit'"></el-input>
        <span v-else>{{follow.followWay}}</span>
      </el-form-item>
      <el-form-item label="跟进过程:" prop="followDetail">
         <el-input type="textarea" v-if="type == 'edit'" v-model="follow.followDetail"></el-input>
        <span v-else>{{follow.followDetail}}</span>
      </el-form-item>
      <el-form-item label="跟进结果:" prop="followResult">
         <el-input v-if="type == 'edit'" v-model="follow.followResult"></el-input>
        <span v-else>{{follow.followResult}}</span>
      </el-form-item>
       <el-form-item label="客户状态:" prop="customerStatus">
           <el-select v-if="type == 'edit'" v-model="follow.customerStatus" style="width:100%" placeholder="请选择客户状态">
                <el-option v-for="item in customerStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        <span v-else>{{follow.customerStatus}}</span>
      </el-form-item>
      <el-form-item label="录入人:" prop="employeeName">
         <el-select 
            size="small" 
            v-model="follow.employeeName" 
            placeholder="请选择" 
            filterable
            remote
            reserve-keyword
            :remote-method="remoteMethod"
            v-if="type == 'edit'"
            style="width:100%"
          >
            <el-option v-for="(item) in employeeOptions" :key="item.id" :label="item.name" :value="item.id"> </el-option>
        </el-select>
        <span v-else>{{follow.employeeName}}</span>
      </el-form-item>
       <el-form-item label="录入时间:" prop="createTime">
          <el-date-picker
            v-if="type == 'edit'"
            v-model="follow.createTime"
            type="datetime"
          placeholder="选择跟进时间" />
        <span v-else>{{follow.createTime|formateDate}}</span>
      </el-form-item>
        
    </el-form>
    <div style="margin-left:400px;margin-top:50px" v-if="type == 'edit'">
      <el-button  size="small" icon="el-icon-cancel" @click="cancel">取消</el-button>
      <el-button  size="small" type="primary" @click="editDetail('followForm')">确认</el-button>
    </div>
    </el-dialog>
   
  </div>
</template>
<script>
import {getFollowDetail,updateFollow} from '@/api/follow'
import {getOneRelation} from '@/api/customer'
import {getEmployeeAll} from '@/api/employee'
import { customerStatus } from '@/utils/common.js';
import moment from 'moment'

export default {
  filters:{
    formateDate(date){
      if(date){
        return moment(date).format('YYYY-MM-DD HH:MM:SS')
      }
      return ''
    }
  },
  data() {
    return {
      customerStatus,
      id: '',
      Cid: '',
      dialogVisible: false,
      follow:{
        followTime: '',
        relationName: '',
        customerName: '',
        followWay: '',
        followDetail:'',
        followResult: '',
        customerStatus: '',
        employeeName: '',
        createTime: ''
      },
      params:{},
      employeeOptions:null,
      employeeFilter:null,
      relationList:null,
      relation:{
        relationId: '',
        relationName: ''
      },
      rules:{
        followWay:[
          {required:true,message:'请输入跟进方式',trigger:'blur'}
        ],
        followTime:[
          {required:true,message:'请输入跟进时间',trigger:'blur'}
        ],
        followDetail:[
          {required:true,message:'请输入跟进详情',trigger:'blur'}
        ],
        followResult:[
          {required:true,message:'请输入跟进结果',trigger:'blur'}
        ],
        customerStatus:[
          {required:true,message:'请选择客户状态',trigger:'blur'}
        ],
        createTime:[
          {required:true,message:'请输入录入时间',trigger:'blur'}
        ],
        customerName:[
          {required:true,message:'请输入客户名称',trigger:'blur'}
        ],
        relationName:[
          {required:true,message:'请输入客户联系人名称',trigger:'blur'}
        ],
        employeeName:[
          {required:true,message:'请输入选择录入人',trigger:'blur'}
        ]
      }
    }
  },
  methods:{
    show(item, flag){
      // this.$nextTick(() => {
        this.type = flag    
        this.id = item.id
        this.params.id = item.id
        this.Cid = item.customerId
        this.dialogVisible = true
        this.relation.relationId = item.relationId
        this.relation.relationName = item.relationName        
        this.getDetail()
        this.getEmployee()
        this.getRelation()
      // })
    },
    clearData(){
       this.follow = {
        followTime: '',
        relationName: '',
        customerName: '',
        followWay: '',
        followDetail:'',
        followResult: '',
        customerStatus: '',
        employeeName: '',
        createTime: ''
      }
    },
     /**
     * 获取所有成员，用于搜索
     * method:getEmployee()
     */
    getEmployee(){
      getEmployeeAll().then(res=>{
        this.employeeOptions=res.data
        this.employeeFilter=res.data
      }).catch(err=>{
        console.log(err)
      })
    },
     /**
      获取所有客户联系人信息
    */
     getRelation(){
       let params={
         Cid:this.Cid
       }
       getOneRelation(params).then(res=>{
         let data = res.data 
         this.relationList=[]
         data.map(item => {
           this.relationList.push({
             relationId: item.id,
             relationName: item.relationName
           })
         })
       }).catch(err=>{
         
       })
     },
     /**
     * 获取跟进详情
     * method:getFollowDetail()
     */
    getDetail(){
      this.clearData()
      getFollowDetail(this.params).then(res=>{
          this.follow =res.data
      }).catch(err=>{
        
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
    cancel(){
      this.clearData()
      this.dialogVisible = false
    },
    editDetail(formName){
        this.$refs[formName].validate(valid=>{
        if(valid){
          this.follow.relationId = this.relation.relationId
          this.follow.relationName = this.relation.relationName
          updateFollow(this.follow).then(res=>{
            //更新跟进列表
            this.$emit('updatefollow')
            this.$message.success('修改成功！')
            this.dialogVisible = false
          }).catch(err=>{
            this.$message.error('修改失败，请重试！')
          })
        }else{
          return false
        }
      })
    }
  }
}
</script>