<template>
  <div>
    <el-form label-width="70px" label-position="left">
      <el-form-item label="投诉方式">
        <el-select v-model="complaintMethod">
          <el-option label="电话" value="电话"></el-option>
          <el-option label="传真" value="传真"></el-option>
          <el-option label="网上留言" value="网上留言"></el-option>
          <el-option label="在线客服" value="在线客服"></el-option>
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
        complaintMethod: '',
        rowList: null
      }
    },
    created() {
      this.complaintMethod = this.$store.getters.complaintRowList.complaintMethod
      this.rowList = this.$store.getters.complaintRowList
    },
    methods: {
      update() {
        const params = {
          id: this.rowList.id,
          complaintMethod: this.complaintMethod
        }
        updateComplaint(params).then(res => {
          this.rowList.complaintMethod = this.complaintMethod
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
