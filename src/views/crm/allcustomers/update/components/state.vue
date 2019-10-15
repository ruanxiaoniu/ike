<template>
  <div>
    <el-form label-width="70px" label-position="left">
      <el-form-item label="客户状态" >
        <el-select v-model="customerState">
          <el-option label="冷却" value="冷却"></el-option>
          <el-option label="潜在" value="潜在"></el-option>
          <el-option label="意向" value="意向"></el-option>
          <el-option label="成交" value="成交"></el-option>
          <el-option label="失败" value="失败"></el-option>
          <el-option label="流失" value="流失"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <br>
    <div style="text-align:center">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button type="primary" size="small" @click="update">确认</el-button>
    </div>
  </div>
</template>
<script>
import {updateState} from '@/api/customer'
export default {
  inject:['reload'],
  data() {
    return {
      customerState:'',
      rowList:null
    }
  },
  created(){
    this.customerState=this.$store.getters.customerRowList.customerState
    this.rowList=this.$store.getters.customerRowList
  },
  methods:{
    update(){
      const params={
        Cid:this.rowList.id,
        state:this.customerState
      }
      updateState(params).then(res=>{
        this.rowList.customerState=this.customerState;
        this.$store.dispatch('customer/setcustomerRowList',this.rowList)
        this.$store.dispatch('customer/setupdateDialogVisible',false)
        this.$message.success("修改成功！")
      }).catch(err=>{
        this.$message.error("修改失败，请重试！")
      })
    },
     cancel(){
      this.$store.dispatch('customer/setupdateDialogVisible',false)
    }
  }
}
</script>