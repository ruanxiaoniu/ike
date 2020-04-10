<template>
  <div>
    <el-form ref="form" label-width="130px" label-position="left" :rules="rules" :model="form">
      <el-form-item label="主联系人座机号" prop="landLinePhone">
        <el-input v-model="form.landLinePhone" style="width:150px" />
      </el-form-item>

    </el-form>
    <br>
    <div style="text-align:center">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button type="primary" size="small" @click="updateNumber('form')">确认</el-button>
    </div>
  </div>
</template>
<script>
import { updateNumber } from '@/api/customer'

export default {
  props: ['value'],
  data() {
    return {
      form: {
        relationId: '',
        landLinePhone: ''
      },
      rules: {
        landLinePhone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    'value': {
      immediate: true,
      handler: function() {
        this.form.relationId = this.value.relationId
        this.form.landLinePhone = this.value.landLinePhone
      }
    }
  },
  methods: {
    updateNumber(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) { // 验证通过
          const params = {
            Rid: this.form.relationId,
            number: this.form.landLinePhone
          }
          updateNumber(params).then(res => {
            this.$emit('update')
            // this.rowList.landLinePhone = this.form.landLinePhone
            // this.$store.dispatch('customer/setcustomerRowList', this.rowList)
            // this.$store.dispatch('customer/setupdateDialogVisible', false)
            this.$message.success('修改成功！')
            this.$emit('hide')
          // eslint-disable-next-line handle-callback-err
          }).catch(err => {
            this.$message.error('修改失败，请重试！')
          })
        } else {
          return false
        }
      })
    },
    cancel() {
      this.$emit('hide')
    }
    // 表格验证
  }
}
</script>
