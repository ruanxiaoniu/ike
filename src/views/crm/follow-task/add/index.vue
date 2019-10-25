<template>
  <div>
      <el-form ref="followArrange" :rules="rules" :model="followArrange" label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
        <el-form-item label="客户" prop="customerId">
          <el-row>
            <el-col span="18">
              <!-- 可进行远程搜索 -->
              <el-select
                v-model="followArrange.customerId"
                filterable
                remote
                reserve-keyword
                style="width:100%"
                placeholder="请输入关键词"
                :remote-method="remoteMethod"
                :loading="loading"
              >
                <el-option
                  v-for="item in customerOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="联系人" prop="relationId">
          <el-row>
            <el-col span="18">
              <el-select v-model="followArrange.relationId" placeholder="请选择联系人">
                <el-option v-for="(item) in relationList" :key="item.id" :label="item.relationName" :value="item.id"/>
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="安排人" prop="arrangeName" v-if="followArrange.arrangeName != null">
          <el-row>
            <el-col span="18">
              <el-input readonly="readonly" type="text" v-model="followArrange.arrangeName">{{followArrange.arrangeName}}</el-input>
            </el-col>
          </el-row>
        </el-form-item>
        
        <el-form-item label="负责人" prop="chargeId">
          <el-row>
            <el-col span="18">
              <!-- 可进行远程搜索 -->
              <el-select
                v-model="followArrange.chargeId"
                filterable
                remote
                reserve-keyword
                style="width:100%"
                placeholder="请输入关键词（不选默认自己）"
                :remote-method="remoteChargeMethod"
                :loading="chargeLoading"
              >
                <el-option
                  v-for="item in chargeOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>


        <el-form-item label="跟进任务内容" prop="arrangeContent">
          <el-row>
            <el-col span="18">
              <el-input type="textarea" v-model="followArrange.arrangeContent"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div style="margin-left:500px">
        <el-button size="small" @click="cancel">取消</el-button>
        <el-button size="small" v-if="editFlag" type="primary" @click="editPlan('followArrange')">保存</el-button>
        <el-button size="small" v-else type="success" @click="add('followArrange')">添加</el-button>
      </div>
  </div>
</template>
<script>
import {arrangeDetail,updateArrange,addArrange} from '@/api/arrange'
import { getCustomerInfo,getOneRelation} from '@/api/customer'
import { getEmployeeAll } from '@/api/employee'
export default {
  props:['editFlag','Aid'],
  components:{
  },
  data() {
    return {
      followArrange:{
        arrangeContent:'',
        arrangeId:'',
        chargeId:'',
        relationId:'',
      },
      customerFilter:null,
      customerOptions:null,
      arrangeOptions:null,
      arrangeFilter:null,
      chargeOptions:null,
      chargeFilter:null,
      relationList:null,
      Cid:'',
      originRelationId:'',//原始联系人Id
      loading:false,
      arrangeLoading:false,
      chargeLoading:false,
      rules:{
        customerId:[
          { required:true,message:'请选择客户',trigger:'blur'}
        ],
        relationId:[
          { required:true,message:'请选择联系人',trigger:'blur'}
        ],
        arrangeContent:[
          {required:true,message:'请输入任务内容',trigger:'blur'}
        ],
        
      }
    }
  },
  watch: {
    "followArrange.customerId":function (newVal) {
      this.Cid=newVal
      if(newVal!=''){
        console.log(newVal)
        this.getRelation()
      }
    },
    editFlag(newVal){
        if(this.editFlag){
          this.getArrange()
        }
    },
    Aid(newVal){
      if(newVal){
        this.getArrange()
      }
    },
    // Cid(newVal){
    //   if(newVal){
    //     console.log("添加计划")
    //     console.log(newVal)
    //     this.getRelation()
    //   }
    // }
  },
  created() {
    console.log("修改页面被创建")
    this.getCustomer()
    this.getEmployee()
    if(this.editFlag){
      this.getArrange()
    }
     
  },
  methods:{
     /**
      获取所有客户信息
      */
     getCustomer(){
       console.log("kehu xinxi ")
       getCustomerInfo().then(res=>{
         this.customerOptions=res.data
         this.customerFilter=res.data
       }).catch(err=>{

       })
     },

     /**
      获取所有员工信息
      */
     getEmployee(){
       console.log("获取所有员工信息..... ")
       getEmployeeAll().then(res=>{
         this.chargeOptions=res.data
         this.chargeFilter=res.data
       }).catch(err=>{

       })
     },
    
     /**
      获取所有客户联系人信息
      */
     getRelation(){
       let params={
         Cid:this.Cid
       }
       console.log("Ciiiiiiiii")
       console.log(this.Cid)
       getOneRelation(params).then(res=>{
         this.relationList=res.data
       }).catch(err=>{
         
       })
     },
     /**
      * 获取某条任务信息
      */
     getArrange(){
       if(this.editFlag){
         const params={
           id:this.Aid
        }
        console.log(this.params)
        arrangeDetail(params).then(res=>{
          this.followArrange=res.data
          this.originRelationId=res.data.relationId 
          this.followArrange.relationId=res.data.relationName 
          
          if(this.editFlag){
            this.Cid=res.data.customerId
            console.log("this.Cid")
            console.log(this.Cid)
          } 
         }).catch(err=>{

         })
       }
     },
    
     /**
      * 修改信息
      */
     editPlan(formName){
       if(this.editFlag){
         this.$refs[formName].validate(valid=>{
           if(valid){
              console.log("要修改了")
              console.log(this.followArrange)
              console.log(typeof this.followArrange.relationId)
              console.log(this.followArrange.arrangeId)
              if(typeof this.followArrange.relationId=='string'){
                //没有选择其他的联系人 说明选的是默认的联系人
                this.followArrange.relationId=this.originRelationId
                
              }
                console.log(this.followArrange)
                updateArrange(this.followArrange).then(res=>{
                this.$message.success('修改成功！')
                this.$emit('updatelist')
                this.$emit('setdialog')
                this.followArrange={
                  arrangeId:'',
                  chargeId:'',
                  arrangeContent:'',
                  relationId:'',
                  customerId:'',
                }
              }).catch(err=>{
                console.log(err)
              })
           }else{
             return false
           }
         })
        
       }
     },
     /**
      * 添加计划信息
      */
     add(formName){
       this.$refs[formName].validate(valid=>{
         if(valid){
           addArrange(this.followArrange).then(res=>{
             this.$message.success('添加成功！')
             this.$emit('updatelist')
                this.$emit('setdialog')
                this.followArrange={
                  planDate:'',
                  planContent:'',
                  relationId:'',
                  customerId:'',
                }
            }).catch(err=>{
                this.$message.error('添加失败，请重试')
            })
         }else{
           return false
         }
       })
     },

     /**
      * 远程搜索客户
      */
    remoteMethod(query){
       if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.customerOptions = this.customerFilter.filter(item => {
              return item.name.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 100);
        }else{
          this.customerOptions=this.customerFilter
          
        }
    },

    /**
      * 远程搜索负责人
      */
    remoteChargeMethod(query){
       if (query !== '') {
          this.chargeLoading = true;
          setTimeout(() => {
            this.chargeLoading = false;
            this.chargeOptions = this.chargeFilter.filter(item => {
              return item.name.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 100);
        }else{
          this.chargeOptions=this.chargeFilter
        }
    },


    /**
      * 点击取消
    */
     cancel(){
        this.$emit('setdialog')
        this.followArrange={
          arrangeId:'',
          chargeId:'',
          arrangeContent:'',
          relationId:'',
          customerId:'',
        }
     },
  }
}
</script>