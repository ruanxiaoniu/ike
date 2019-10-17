<template>
  <div>
     <el-form label-width="70px" label-position="left">
      <el-form-item label="客户阶段" >
        <el-select v-model="stageId" @change="changeStage">
           <el-option v-for="(item) in stageList" :key="item.id" :label="item.stageName" :value="item.id">
           </el-option>
        </el-select>
        <el-button size="small" icon="el-icon-edit" @click="edit">编辑</el-button>
      </el-form-item>
    </el-form>
    <div>
      <div style="text-align:center">
        <el-button size="small" @click="cancel">取消</el-button>
        <el-button type="primary" size="small" @click="update">确认</el-button>
      </div>
      <p></p>
      <stageLog></stageLog>
    </div>
    <el-dialog title="编辑——客户阶段" :visible.sync="visibleFlag" append-to-body width="60%">
       <stageEdit @setvisible="setVisible" @setvalue="setValue" @updatelist="getStage"></stageEdit>
    </el-dialog>
   

  </div>
</template>
<script>
import pagination from '@/components/Pagination'
import stageLog from '../../../../public/customer/stage-log'
import stageEdit from '../../../../public/customer/edit/stage'
import {getCustomerStage,getCustomerAllStage,updateOneStage} from '@/api/customer'
export default {
  components:{
    pagination,
    stageLog,
    stageEdit,
  },
  data() {
    return {
       total:10,
       stageId:'',
       stageName:'',
       stageList:null,
       editVal:null,
       editFlag:false,
       visibleFlag:false,
       rowList:null,
       listQuery: {
        page: 1,
        limit: 20,
        sort: '+id'
      },
    }
  },
  created(){
    this.rowList=this.$store.getters.customerRowList
    this.stageId=this.$store.getters.customerRowList.stageName
    console.log(this.rowList)
    this.getStage()
  },
  methods:{
    getStage(){
      getCustomerAllStage(this.rowList.id).then(res=>{
       this.stageList=res.data
      }).catch(err=>{
        console.log(err)
      })
    },
    update() {
      let params={
        Cid:this.rowList.id,
        Sid:this.stageId
      }
      if(this.editFlag){
        console.log("hhh")
        params={
           Cid:this.rowList.id,
           Sid:this.editVal.id,
        }
      }
      updateOneStage(params).then(res=>{
        this.rowList.stageName=this.stageName;
        this.$store.dispatch('customer/setcustomerRowList',this.rowList)
        this.$store.dispatch('customer/setupdateDialogVisible',this.updateDialogVisible)
        this.$message.success("修改成功！")
      }).catch(err=>{
        this.$message.error("修改失败，请重试！")
      })
    },
    changeStage(val){
      const obj=this.stageList.find(item=>{
        return item.id==parseInt(val)
      })
      this.stageName=obj.stageName
      //  console.log("stageName")
      // console.log(this.stageName)
    },
    edit(){
      this.visibleFlag=true
      console.log(this.visibleFlag)
    },
    cancel(){
      this.$store.dispatch('customer/setupdateDialogVisible',false)
    },
    setVisible(){
      this.visibleFlag=false
      console.log(this.visibleFlag)
    },
    //客户选择回显
    setValue(val){
      console.log("选择的选项")
      this.setVisible()
      this.editVal=val
      this.editFlag=true
      this.stageId=val.stageName
      this.stageName=val.stageName
      console.log(val)
    }
  }
}
</script>
