<template>
  <div>
    <el-form ref="form" label-width="130px" label-position="left" :rules="rules" :model="form">
      <el-form-item label="主联系人手机号" prop="relationPhone">
        <el-input v-model="form.relationPhone" style="width:150px" placeholder="请输入手机号" />
      </el-form-item>

    </el-form>
    <br>
    <div style="text-align:center">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button type="primary" size="small" @click="updatePhone('form')">确认</el-button>
    </div>
  </div>
</template>
<script>
import { updatePrimary } from '@/api/customer'

export default {
  props: ['value'],
  data() {
    return {
      form: {
        relationId: '',
        relationPhone: ''
      },
      rules: {
        relationPhone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    'value': {
      immediate: true,
      handler: function() {
        this.form.relationId = this.value.relationId
        this.form.relationPhone = this.value.relationPhone
      }
    }
  },
  methods: {
    updatePhone(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) { // 验证通过
          const params = {
            Rid: this.form.relationId,
            phone: this.form.relationPhone
          }
          updatePrimary(params).then(res => {
            this.$emit('update')
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
