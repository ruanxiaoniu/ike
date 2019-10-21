<template>
  <div>
    <el-form ref="followForm" :model="followList" label-width="200px" :rules="rules" style="width:500px">
      <el-form-item label="跟进时间:" prop="followTime">
        <el-input v-model="followList.followTime" v-if="editFlag"></el-input>
        <span v-else>{{followList.followTime|formateDate}}</span>
      </el-form-item>
      <el-form-item v-if="editFlag" label="客户联系人名称" prop="relationName"> 
        <el-input v-model="followList.relationName" v-if="editFlag"></el-input>
      </el-form-item>
      <el-form-item v-if="editFlag" label="客户名称" prop="customerName">
        <el-input v-model="followList.customerName" v-if="editFlag"></el-input>
      </el-form-item>
      <el-form-item v-else label="客户联系人名称[客户名称]:">         
        <span >{{followList.relationName}}&nbsp;&nbsp;[{{followList.customerName}}]</span>
      </el-form-item>
      <el-form-item label="跟进方式:" prop="followWay">
        <el-input v-model="followList.followWay" v-if="editFlag"></el-input>
        <span v-else>{{followList.followWay}}</span>
      </el-form-item>
      <el-form-item label="跟进过程:" prop="followDetail">
         <el-input type="textarea" v-if="editFlag" v-model="followList.followDetail"></el-input>
        <span v-else>{{followList.followDetail}}</span>
      </el-form-item>
      <el-form-item label="跟进结果:" prop="customerStatus">
         <el-input v-if="editFlag" v-model="followList.followResult"></el-input>
        <span v-else>{{followList.followResult}}</span>
      </el-form-item>
       <el-form-item label="客户状态:" prop="customerStatus">
           <el-select v-if="editFlag" v-model="followList.customerStatus" style="width:100%" placeholder="请选择客户状态">
                <el-option label="冷却" value="冷却"></el-option>
                <el-option label="潜在" value="潜在"></el-option>
                <el-option label="意向" value="意向"></el-option>
                <el-option label="成交" value="成交"></el-option>
                <el-option label="失败" value="失败"></el-option>
                <el-option label="流失" value="流失"></el-option>
          </el-select>
        <span v-else>{{followList.employeeName}}</span>
      </el-form-item>
      <el-form-item label="录入人:" prop="employeeName">
         <el-select 
            size="small" 
            v-model="followList.employeeName" 
            placeholder="请选择" 
            filterable
            remote
            reserve-keyword
            :remote-method="remoteMethod"
            v-if="editFlag"
            style="width:100%"
          >
            <el-option-group>
              <el-option label="所有成员" value="所有成员"></el-option>
            </el-option-group>
            <el-option-group label="指定成员">
              <el-option v-for="(item) in employeeOptions" :key="item.id" :label="item.name" :value="item.id"> </el-option>

            </el-option-group>
        </el-select>
        <span v-else>{{followList.employeeName}}</span>
      </el-form-item>
       <el-form-item label="录入时间:" prop="createTime">
         <el-input v-if="editFlag" v-model="followList.createTime"></el-input>
        <span v-else>{{followList.createTime|formateDate}}</span>
      </el-form-item>
        
    </el-form>
    <div style="margin-left:600px;margin-top:50px" v-if="editFlag">
          <el-button  size="small" icon="el-icon-cancel" @click="cancel">取消</el-button>
          <el-button  size="small" type="primary" @click="edit('followForm')">确认</el-button>
    </div>
  </div>
</template>
<script>
import {getFollowDetail,updateFollow} from '@/api/follow'
import {getEmployeeAll} from '@/api/employee'
import moment from 'moment'

export default {
  props:['id','edit'],
  filters:{
    formateDate(date){
       return moment(date).format('YYYY-MM-DD HH:MM:SS')
    }
  },
  data() {
    return {
      followList:null,
      params:{},
      editFlag:false,
      employeeOptions:null,
      employeeFilter:null,
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
  created() {
    if(this.id){
      this.$set(this.params,'id',this.id)
    }
    if(this.edit){
      this.editFlag=this.edit
    }
    this.getEmployee()
    this.getDetai()
  },
  watch:{
    id(newVal){
      this.params.id=newVal
       this.getDetai()
    },
    edit(newVal){
       this.editFlag=newVal
      //  this.getDetai()
    }
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
      }).catch(err=>{
        console.log(err)
      })
    },

     /**
     * 获取跟进详情
     * method:getFollowDetail()
     */
    getDetai(){
      getFollowDetail(this.params).then(res=>{
        this.followList=res.data
        console.log("folloe???")
        console.log(this.followList)
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
    /**
     * 点击取消，触发父组件方法
     * method:cancel()
     */
    cancel(){
      this.$emit('setedit')
    },
    /**
     * 点击确定，验证并提交表单，触发父组件方法
     * method:cancel()
     */
    edit(formName){
        this.$refs[formName].validate(valid=>{
        if(valid){
          /**
           * 修改请求
          */
         updateFollow(this.followList).then(res=>{
           //更新跟进列表
           this.$emit('updatefollow')
           this.$emit('setedit')
           this.$message.success('修改成功！')
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