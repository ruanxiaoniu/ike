<template>
  <div>
    <el-form label-width="70px" label-position="left">
      <el-form-item label="投诉类型">
        <el-select v-model="complaintType">
          <el-option label="产品投诉" value="产品投诉"></el-option>
          <el-option label="服务投诉" value="服务投诉"></el-option>
          <el-option label="客户意见" value="客户意见"></el-option>
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
  import { updateComplaint } from '@/api/complaint'

  export default {
    inject: ['reload'],
    data() {
      return {
        complaintType: '',
        rowList: null
      }
    },
    created() {
      this.complaintType = this.$store.getters.complaintRowList.complaintType
      console.log(this.complaintType)
      this.rowList = this.$store.getters.complaintRowList
    },
    methods: {
      update() {
        const params = {
          id: this.rowList.id,
          complaintType: this.complaintType
        }
        updateComplaint(params).then(res => {
          this.rowList.complaintType = this.complaintType
          this.$store.dispatch('complaint/setComplaintRowList', this.rowList)
          this.$store.dispatch('complaint/setUpdateDialogVisible', false)
          this.$message.success('修改成功！')
        }).catch(err => {
          this.$message.error('修改失败，请重试！')
        })
      },
      cancel() {
        this.$store.dispatch('complaint/setUpdateDialogVisible', false)
      }
    }
  }
</script>
