<template>
  <div>
    <el-form label-width="70px" label-position="left">
      <el-form-item label="客户来源" >
          <el-select v-model="originId" @change="changeStage">
           <el-option v-for="(item) in originList" :key="item.id" :label="item.originName" :value="item.id">
           </el-option>
        </el-select>
        <el-button size="small" icon="el-icon-edit" @click="edit">编辑</el-button>
      </el-form-item>
    </el-form>
    <br>
    <div style="text-align:center">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button type="primary" size="small" @click="update">确认</el-button>
    </div>
     <el-dialog title="编辑——客户来源" :visible.sync="visibleFlag" append-to-body width="60%">
       <originEdit @setvisible="setVisible" @setvalue="setValue" @updatelist="getOrigin"></originEdit>
    </el-dialog>
  </div>
</template>
<script>
import { updatOneOriginName,getCustomerAllOrigin} from '@/api/customer'
import originEdit from '../../../../public/customer/edit/origin'

export default {
  inject:['reload'],
  components:{
    originEdit,
  },
  data() {
    return {
      originId:'',
      originName:'',
      originList:null,
      updateDialogVisible:false,
      rowList:null,
      editVal:null,
      editFlag:false,
      visibleFlag:false,
    }
  },
   created(){
     this.rowList=this.$store.getters.customerRowList
     this.originId=this.$store.getters.customerRowList.originName
     this.getOrigin()
  },
  
  methods:{
    //获取当前表中有的来源
    getOrigin(){
       getCustomerAllOrigin().then(res=>{
         this.originList=res.data
       }).catch(err=>{
       console.log(err)
     })
    },
    update(){
      let params={
        Cid:this.rowList.id,
        Oid:this.originId,
      }
      if(this.editFlag){
        console.log("hhh")
        params={
           Cid:this.rowList.id,
           Oid:this.editVal.id,
        }
      }
      updatOneOriginName(params).then(res=>{
        this.rowList.originName=this.originName;
        this.$store.dispatch('customer/setcustomerRowList',this.rowList)
        this.$store.dispatch('customer/setupdateDialogVisible',this.updateDialogVisible)
        this.$message.success("修改成功！")
        console.log("res")
        console.log(res)

      }).catch(err=>{
        console.log("失败？")
        console.log(err)
        this.$message.error("修改失败，请重试！")
      })
    },
    
    changeStage(val){
      const obj=this.originList.find(item=>{
        return item.id==parseInt(val)
      })
      this.originName=obj.originName
      //  console.log("originName")
      // console.log(this.originName)
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
      this.originId=val.originName
      this.originName=val.originName
      console.log(val)
    }
  }
}
</script>