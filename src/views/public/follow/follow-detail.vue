<template>
  <div>
    <el-form ref="followForm" :model="follow" label-width="200px" :rules="rules" style="width:500px">
      <el-form-item label="跟进时间:" prop="followTime">
          <el-date-picker
            v-if="editFlag"
            v-model="follow.followTime"
            type="datetime"
          placeholder="选择跟进时间" />
        <span v-else>{{follow.followTime|formateDate}}</span>
      </el-form-item>
      <el-form-item v-if="editFlag" label="客户联系人名称" prop="relationName"> 
        <!-- <el-input v-model="follow.relationName" v-if="editFlag"></el-input> -->
        <el-select v-model="relationId" placeholder="请选择联系人">
          <el-option v-for="(item) in relationList" :key="item.id" :label="item.relationName" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item v-if="editFlag" label="客户名称" prop="customerName">
        <el-input v-model="follow.customerName" v-if="editFlag"></el-input>
      </el-form-item>
      <el-form-item v-else label="客户联系人名称[客户名称]:">         
        <span >{{follow.relationName}}&nbsp;&nbsp;[{{follow.customerName}}]</span>
      </el-form-item>
      <el-form-item label="跟进方式:" prop="followWay">
        <el-input v-model="follow.followWay" v-if="editFlag"></el-input>
        <span v-else>{{follow.followWay}}</span>
      </el-form-item>
      <el-form-item label="跟进过程:" prop="followDetail">
         <el-input type="textarea" v-if="editFlag" v-model="follow.followDetail"></el-input>
        <span v-else>{{follow.followDetail}}</span>
      </el-form-item>
      <el-form-item label="跟进结果:" prop="followResult">
         <el-input v-if="editFlag" v-model="follow.followResult"></el-input>
        <span v-else>{{follow.followResult}}</span>
      </el-form-item>
       <el-form-item label="客户状态:" prop="customerStatus">
           <el-select v-if="editFlag" v-model="follow.customerStatus" style="width:100%" placeholder="请选择客户状态">
                <el-option label="冷却" value="冷却"></el-option>
                <el-option label="潜在" value="潜在"></el-option>
                <el-option label="意向" value="意向"></el-option>
                <el-option label="成交" value="成交"></el-option>
                <el-option label="失败" value="失败"></el-option>
                <el-option label="流失" value="流失"></el-option>
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
        <span v-else>{{follow.employeeName}}</span>
      </el-form-item>
       <el-form-item label="录入时间:" prop="createTime">
          <el-date-picker
            v-if="editFlag"
            v-model="follow.createTime"
            type="datetime"
          placeholder="选择跟进时间" />
        <span v-else>{{follow.createTime|formateDate}}</span>
      </el-form-item>
        
    </el-form>
    <div style="margin-left:600px;margin-top:50px" v-if="editFlag">
          <el-button  size="small" icon="el-icon-cancel" @click="cancel">取消</el-button>
          <el-button  size="small" type="primary" @click="editDetail('followForm')">确认</el-button>
    </div>
  </div>
</template>
<script>
import {getFollowDetail,updateFollow} from '@/api/follow'
import {getOneRelation} from '@/api/customer'
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
      follow:null,
      params:{},
      editFlag:false,
      employeeOptions:null,
      employeeFilter:null,
      relationList:null,
      relationId:'',
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
    console.log("editttttt")
    console.log(this.editFlag)
    this.getEmployee()
    this.getRelation()
    this.getDetail()
  },
  watch:{
    id(newVal){
      this.params.id=newVal
       this.getDetail()
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
      获取所有客户联系人信息
    */
     getRelation(){
       let params={
         Cid:this.id
       }
       console.log("Ciiiiiiiii")
       console.log(this.Cid)
       getOneRelation(params).then(res=>{
         this.relationList=res.data
       }).catch(err=>{
         
       })
     },
     /**
     * 获取跟进详情
     * method:getFollowDetail()
     */
    getDetail(){
      getFollowDetail(this.params).then(res=>{
        this.follow=res.data
        this.relationId=this.follow.relationName
        console.log("folloe???")
        console.log(this.follow)
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
    editDetail(formName){
        this.$refs[formName].validate(valid=>{
        if(valid){
          /**
           * 修改请求
          */
         this.follow.relationId=this.relationId
         updateFollow(this.follow).then(res=>{
           //更新跟进列表
           this.$emit('updatefollow')
           this.$emit('setdialog')
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