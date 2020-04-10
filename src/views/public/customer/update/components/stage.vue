<template>
  <div>
    <el-form label-width="70px" label-position="left">
      <el-form-item label="客户阶段">
        <el-select v-model="stage" value-key="id" size="small" placeholder="请选择阶段">
          <el-option v-for="(item) in stageList" :key="item.id" :label="item.stageName" :value="item" />
        </el-select>
        <el-button size="small" icon="el-icon-edit" @click="edit">编辑</el-button>
      </el-form-item>
    </el-form>
    <div>
      <div style="text-align:center">
        <el-button size="small" @click="cancel">取消</el-button>
        <el-button type="primary" size="small" @click="update">确认</el-button>
      </div>
      <p />
      <stageLog :Cid="value.id" />
    </div>
    <el-dialog title="编辑——客户阶段" :visible.sync="visibleFlag" append-to-body width="60%">
      <stageEdit @hide="hide" @setvalue="setValue" @updatelist="getStage" />
    </el-dialog>

  </div>
</template>
<script>
import stageLog from '../../../../public/customer/stage-log'
import stageEdit from '../../../../public/customer/edit/stage'
import { getCustomerAllStage, updateOneStage } from '@/api/customer'
export default {
  components: {
    stageLog,
    stageEdit
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['value'],
  data() {
    return {
      total: 10,
      stage: {
        id: '',
        stageName: ''
      },
      stageName: '',
      stageList: null,
      editVal: null,
      editFlag: false,
      visibleFlag: false
    }
  },
  watch: {
    'value': {
      immediate: true,
      handler: function() {
        // eslint-disable-next-line no-sequences
        this.stage.id = this.value.customerStageId,
        this.stage.stageName = this.value.stageName
        this.getStage()
      }
    }
  },
  methods: {
    getStage() {
      getCustomerAllStage(this.value.id).then(res => {
        const data = res.data || []
        this.stageList = []
        data.forEach(element => {
          const item = {
            id: element.id,
            stageName: element.stageName
          }
          this.stageList.push(item)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    update() {
      let params = {
        Cid: this.value.id,
        Sid: this.stage.id
      }
      if (this.editFlag) {
        console.log('hhh')
        params = {
          Cid: this.value.id,
          Sid: this.editVal.id
        }
      }
      updateOneStage(params).then(res => {
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
    },
    cancel() {
      this.$emit('hide')
    },
    hide() {
      this.visibleFlag = false
    },
    // 客户选择回显
    setValue(val) {
      console.log('选择的选项')
      this.setVisible()
      this.editVal = val
      this.editFlag = true
      // this.stage = val.stageName
      // this.stageName = val.stageName
      // console.log(val)
    }
  }
}
</script>
