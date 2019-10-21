<template>
  <div>
    <el-form ref="followForm" :model="followList" label-width="200px"  style="width:500px">
      <el-form-item label="跟进时间:" prop="followTime">
           <el-date-picker
            v-model="followTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
      </el-form-item>
      <el-form-item v-if="editFlag" label="客户联系人名称" prop="relationName"> 
        <el-input v-model="followList.relationName"></el-input>
      </el-form-item>
      <el-form-item v-if="editFlag" label="客户名称" prop="customerName">
        <el-input v-model="followList.customerName"></el-input>
      </el-form-item>
      <el-form-item label="跟进方式:" prop="followWay">
        <el-input v-model="followList.followWay"></el-input>
      </el-form-item>
       <el-form-item label="客户状态:" prop="customerStatus">
           <el-select  v-model="followList.customerStatus" style="width:100%" placeholder="请选择客户状态">
                <el-option label="冷却" value="冷却"></el-option>
                <el-option label="潜在" value="潜在"></el-option>
                <el-option label="意向" value="意向"></el-option>
                <el-option label="成交" value="成交"></el-option>
                <el-option label="失败" value="失败"></el-option>
                <el-option label="流失" value="流失"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="录入人:" prop="employeeIds">
         <el-select 
            size="small" 
            v-model="followList.employeeIds" 
            placeholder="请选择" 
            filterable
            remote
            reserve-keyword
            :remote-method="remoteMethod"
            style="width:100%"
          >
              <el-option v-for="(item) in employeeOptions" :key="item.id" :label="item.name" :value="item.id"> </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div style="margin-left:600px;margin-top:50px">
        <el-button  size="small" icon="el-icon-cancel" @click="cancel">取消</el-button>
        <el-button  size="small" type="primary" @click="search('followForm')">确认</el-button>
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
      followList:{
        followWay:'',
        customerStatus:'',
        customerName:'',
        relationName:'',
        minTime:'',
        maxTime:'',
        employeeIds:'' 
      },
      followTime:'',
      params:{},
      editFlag:false,
      employeeOptions:null,
      employeeFilter:null
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
    search(formName){
      //处理搜索数据
      if(this.followTime){
          this.followList.minTime=this.formatDate(this.creatRang[0]);
          this.followList.maxTime=this.formatDate(this.creatRang[1]);
      }
      //返回搜索数据给数据
      this.$emit('updatelist',this.followList)
    }
  }
}
</script>