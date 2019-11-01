<template>
  <div>
    <el-form label-width="70px" label-position="left">
      <el-form-item label="紧急程度" >
        <el-select v-model="urgencyLevel">
          <el-option label="非常紧急" value="非常紧急"></el-option>
          <el-option label="紧急" value="紧急"></el-option>
          <el-option label="一般紧急" value="一般紧急"></el-option>
          <el-option label="不紧急" value="不紧急"></el-option>
          <el-option label="其他" value="其他"></el-option>
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
  import {updateComplaint} from '@/api/complaint'
  export default {
    inject:['reload'],
    data() {
      return {
        urgencyLevel: '',
        rowList: null
      }
    },
    created(){
      this.urgencyLevel=this.$store.getters.complaintRowList.urgencyLevel
      this.rowList=this.$store.getters.complaintRowList
    },
    methods:{
      update(){
        const params={
          id: this.rowList.id,
          urgencyLevel: this.urgencyLevel
        }
        updateComplaint(params).then(res=>{
          this.rowList.urgencyLevel=this.urgencyLevel;
          this.$store.dispatch('complaint/setComplaintRowList',this.rowList)
          this.$store.dispatch('complaint/setUpdateDialogVisible',false)
          this.$message.success("修改成功！")
        }).catch(err=>{
          this.$message.error("修改失败，请重试！")
        })
      },
      cancel(){
        this.$store.dispatch('complaint/setUpdateDialogVisible',false)
      }
    }
  }
</script>
