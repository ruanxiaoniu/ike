<template>
  <div>
    <el-form label-width="70px" label-position="left">
      <el-form-item label="客户等级" >
         <el-select v-model="levelId" @change="changeStage">
           <el-option v-for="(item) in levelList" :key="item.id" :label="item.levelName" :value="item.id">
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
    <el-dialog title="编辑——客户等级" :visible.sync="visibleFlag" append-to-body width="60%">
      <levelEdit @setvisible="setVisible" @setvalue="setValue" @updatelist="getLevel"></levelEdit>
    </el-dialog>
      
  </div>
</template>
<script>
import {getCustomerAllLevel,updatOneLevelName} from '@/api/customer'
import levelEdit from '../../../../public/customer/edit/level'
export default {
  components:{
    levelEdit
  },
  data() {
    return {
      levelId:'',
      levelName:'',
      levelList:null,
      rowList:null,
      dialogFlag:false,
      visibleFlag:false,
      editFlag:false,//标记是否从编辑页面传过来的值
      editVal:null,
    }
  },
  created() {
    this.rowList=this.$store.getters.customerRowList
    this.levelId=this.$store.getters.customerRowList.levelName
    this.getLevel()
  },
  methods:{
     getLevel(){
       getCustomerAllLevel().then(res=>{
         this.levelList=res.data
       }).catch(err=>{
       console.log(err)
     })
    },
    update(){
      let params={
        Cid:this.rowList.id,
        Lid:this.levelId,
      }
      if(this.editFlag){
        console.log("hhh")
        params={
           Cid:this.rowList.id,
           Lid:this.editVal.id,
        }
      }
      // console.log("params")
      // console.log(params)
      updatOneLevelName(params).then(res=>{
        this.rowList.levelName=this.levelName;
        this.$store.dispatch('customer/setcustomerRowList',this.rowList)
        this.$store.dispatch('customer/setupdateDialogVisible',false)
        this.editFlag=false
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
      const obj=this.levelList.find(item=>{
        return item.id==parseInt(val)
      })
      this.levelName=obj.levelName
      // console.log("选项变了")
      //  console.log("level")
      // console.log(val)
    },
    cancel(){
      this.$store.dispatch('customer/setupdateDialogVisible',false)
    },
    edit(){
      this.visibleFlag=true
      console.log(this.visibleFlag)
    },
    setVisible(){
      this.visibleFlag=false
      console.log(this.visibleFlag)
    },
    setValue(val){
      console.log("选择的选项")
      this.setVisible()
      this.editVal=val
      this.editFlag=true
      this.levelId=val.levelName
      this.levelName=val.levelName
      console.log(val)
    }
  }
}
</script>