<template>
  <div>
    <div>
      <el-form ref="plan" :model="plan" label-position="right" label-width="180px" style="width: 400px; margin-left:50px;">
          <el-form-item label="跟进计划时间：" prop="planDate">
            <span>{{plan.planDate}}</span>
          </el-form-item>
          <el-form-item label="客户联系人名称[客户名]：">
            <span class="link-type" @click="handle(plan.relationId,'relation')">{{plan.relationName}}</span>
            <span class="link-type" @click="handle(plan.customerId,'customer')">[{{plan.customerName}}]</span>
          </el-form-item>
          <el-form-item label="计划内容：" prop="planContent">
            <span>{{plan.planContent}}</span>
          </el-form-item>
          <el-form-item label="员工名称：" prop="employeeName">
            <span>{{plan.employeeName}}</span>
          </el-form-item>
          <el-form-item label="是否完成：" prop="iscomplete">
            <span>
              <el-radio v-model="plan.iscomplete" :label="0">完成</el-radio>
              <el-radio v-model="plan.iscomplete" :label="1">未完成</el-radio>
            </span>
          </el-form-item>
        </el-form>
        <div v-if="iscomplete!=plan.iscomplete" style="margin-left:300px;margin-top:50px">
          <el-button size="small" type="success" @click="save">保存修改</el-button>
        </div>
        <el-dialog title="联系人详情" :visible.sync="dialogFlag" append-to-body="">
          <relationDetail :Rid="Rid"></relationDetail>
        </el-dialog>
    </div>
  </div>
</template>
<script>
import {planDetail,planComplete,planFail} from '@/api/follow'
import relationDetail from '../relation/relationById'
export default {
  props:['type','planId'],
  components:{
    relationDetail
  },
  data() {
    return {
      plan:null,
      iscomplete:0,//保存原始计划完成状态
      Rid:'',
      Cid:'',
      dialogFlag:false
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    /**
     * 获取改计划的详情
     */
    getDetail(){
      const params={
        id:this.planId
      }
      planDetail(params).then(res=>{
        this.plan=res.data
        this.iscomplete=res.data.iscomplete
      }).catch(err=>{

      })
    },
    /**
     * 保存完成状态修改后的记录
     */
    save(){
      console.log("complete......")
      console.log(this.plan.iscomplete,this.iscomplete)
      if(this.plan.iscomplete==0){//更新计划为失败
          /**
          * 请求计划失败接口
          */
         planFail(this.plan).then(res=>{
           this.$message.success('已更改计划为失败！')
           //更新列表
           this.getDetail()
           this.$emit('updatelist')
         }).catch(err=>{

         })
      }else{
        /**
         * 请求计划更改为完成接口
         */
        console.log(this.plan)
        planComplete(this.plan).then(res=>{
           this.$message.success('已更改计划为已完成！')
           this.getDetail()
           this.$emit('updatelist')
         }).catch(err=>{
           
         })
      }
    },
    /**
     * 查看联系人详情和客户详情
     */
    handle(id,type){
      if(type=='customer'){
        this.$router.push({name:'CustomerDetail',query:{customerId:id}})
      }else{
        this.Rid=id
        this.dialogFlag=true
      }
    }
  },
}
</script>
<style scoped>
</style>