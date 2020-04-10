<template>
  <div>
    <el-form label-width="70px" label-position="left">
      <el-form-item label="客户来源">
        <el-select v-model="origin" size="small" value-key="id" placeholder="请选择来源">
          <el-option v-for="(item) in originList" :key="item.id" :label="item.originName" :value="item" />
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
      <originEdit @setvisible="setVisible" @setvalue="setValue" @updatelist="getOrigin" />
    </el-dialog>
  </div>
</template>
<script>
import { updatOneOriginName, getCustomerAllOrigin } from '@/api/customer'
import originEdit from '../../../../public/customer/edit/origin'

export default {
  inject: ['reload'],
  components: {
    originEdit
  },
  props: ['value'],
  data() {
    return {
      origin: {
        id: '',
        originName: ''
      },
      originName: '',
      originList: [],
      updateDialogVisible: false,
      editVal: null,
      editFlag: false,
      visibleFlag: false
    }
  },
  watch: {
    'value': {
      immediate: true,
      handler: function() {
        this.origin.id = this.value.customerOriginId
        this.origin.originName = this.value.originName
        this.getOrigin()
      }
    }
  },
  methods: {
    // 获取当前表中有的来源
    getOrigin() {
      getCustomerAllOrigin().then(res => {
        const data = res.data || []
        this.originList = []
        data.forEach(element => {
          const item = {
            id: element.id,
            originName: element.originName
          }
          this.originList.push(item)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    update() {
      let params = {
        Cid: this.value.id,
        Oid: this.origin.id
      }
      if (this.editFlag) {
        params = {
          Cid: this.value.id,
          Oid: this.editVal.id
        }
      }
      updatOneOriginName(params).then(res => {
        this.$emit('update')
        this.$message.success('修改成功！')
        this.$emit('hide')
      // eslint-disable-next-line handle-callback-err
      }).catch(err => {
        this.$message.error('修改失败，请重试！')
      })
    },
    edit() {
      this.visibleFlag = true
      console.log(this.visibleFlag)
    },
    cancel() {
      this.$emit('hide')
    },
    setVisible() {
      this.visibleFlag = false
    },
    // 客户选择回显
    setValue(val) {
      this.setVisible()
      this.editVal = val
      this.editFlag = true
      // this.origin = val.originName
      // this.originName = val.originName
      // console.log(val)
    }
  }
}
</script>
