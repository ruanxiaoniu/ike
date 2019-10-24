<template>
  <div>
      <el-form  ref="followPlan" :rules="rules" :model="followPlan" label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
        <el-form-item label="客户" prop="customerId">
           <el-row>
          <el-col span="18">
            <!-- 可进行远程搜索 -->
            <el-select
              v-model="followPlan.customerId"
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
              <el-select v-model="followPlan.relationId" placeholder="请选择联系人">
                <el-option v-for="(item) in relationList" :key="item.id" :label="item.relationName" :value="item.id"/>
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="跟进计划时间" prop="planDate">
          <el-row>
          <el-col span="18">
            <el-date-picker
                v-model="followPlan.planDate"
                type="datetime"
                placeholder="选择跟进计划时间"/>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="跟进计划内容" prop="planContent">
          <el-row>
            <el-col span="18">
              <el-input type="textarea" v-model="followPlan.planContent"></el-input>
            </el-col>
          </el-row> 
        </el-form-item>
      </el-form>
      <div style="margin-left:500px">
        <el-button size="small" @click="cancel">取消</el-button>
        <el-button size="small" v-if="editFlag" type="primary" @click="editPlan('followPlan')">保存</el-button>
        <el-button size="small" v-else type="success" @click="add('followPlan')">添加</el-button>
      </div>
  </div>
</template>
<script>
import {updatePlan,planDetail,addPlan} from '@/api/follow'
import { getCustomerInfo,getOneRelation} from '@/api/customer'
export default {
  props:['editFlag','planId'],
  components:{
  },
  data() {
    return {
      followPlan:{
        planDate:'',
        planContent:'',
        relationId:'',
        customerId:'',
      },
      customerFilter:null,
      customerOptions:null,
      relationList:null,
      Cid:'',
      originRelationId:'',//原始联系人Id
      loading:false,
      rules:{
        customerId:[
          { required:true,message:'请选择客户',trigger:'blur'}
        ],
        relationId:[
          { required:true,message:'请选择联系人',trigger:'blur'}
        ],
        planDate:[
          {required:true,message:'请输入计划时间',trigger:'blur'}
        ]
      }
    }
  },
  watch: {
    "followPlan.customerId":function (newVal) {
      this.Cid=newVal
      if(newVal!=''){
        console.log(newVal)
        this.getRelation()
      }
    },
    editFlag(newVal){
      
        if(this.editFlag){
          this.getPlan()
        }
    },
    planId(newVal){
      if(newVal){
        this.getPlan()
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
    this.getCustomer()
    if(this.editFlag){
      this.getPlan()
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
      * 获取某条计划信息
      */
     getPlan(){
       if(this.editFlag){
         const params={
           id:this.planId
        }
        planDetail(params).then(res=>{
          this.followPlan=res.data
          this.originRelationId=res.data.relationId 
          this.followPlan.relationId=res.data.relationName 
          
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
              console.log(this.followPlan)
             console.log(typeof this.followPlan.relationId)
              if(typeof this.followPlan.relationId=='string'){
               
                this.followPlan.relationId=this.originRelationId
               
              }
               console.log(this.followPlan)
              updatePlan(this.followPlan).then(res=>{
                this.$message.success('修改成功！')
                this.$emit('updatelist')
                this.$emit('setdialog')
                this.followPlan={
                  planDate:'',
                  planContent:'',
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
           addPlan(this.followPlan).then(res=>{
             this.$message.success('添加成功！')
             this.$emit('updatelist')
                this.$emit('setdialog')
                this.followPlan={
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
      * 点击取消
    */
     cancel(){
        this.$emit('setdialog')
        this.followPlan={
          planDate:'',
          planContent:'',
          relationId:'',
          customerId:'',
        }
     },
  }
}
</script>