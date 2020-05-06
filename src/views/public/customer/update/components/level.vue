<template>
  <div>
    <el-form label-width="70px" label-position="left">
      <el-form-item label="客户等级">
        <el-select v-model="level" value-key="id" placeholder="请选择等级" size="small">
          <el-option v-for="(item) in levelList" :key="item.id" :label="item.levelName" :value="item" />
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
      <levelEdit @setvisible="setVisible" @setvalue="setValue" @updatelist="getLevel" />
    </el-dialog>

  </div>
</template>
<script>
import { getCustomerAllLevel, updatOneLevelName } from '@/api/customer'
import levelEdit from '../../../../public/customer/edit/level'
export default {
  components: {
    levelEdit
  },
  props: ['value'],
  data() {
    return {
      level: {
        id: '',
        levelName: ''
      },
      levelName: '',
      levelList: [],
      dialogFlag: false,
      visibleFlag: false,
      editFlag: false, // 标记是否从编辑页面传过来的值
      editVal: null
    }
  },
  watch: {
    'value': {
      immediate: true,
      handler: function() {
        console.log('level');
        
        this.level.id = this.value.customerLevelId
        this.level.levelName = this.value.levelName
        this.getLevel()
      }
    }
  },
  methods: {
    getLevel() {
      getCustomerAllLevel().then(res => {
        const data = res.data || []
        this.levelList = []
        data.forEach(element => {
          const item = {
            id: element.id,
            levelName: element.levelName
          }
          this.levelList.push(item)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    update() {
      let params = {
        Cid: this.value.id,
        Lid: this.level.id
      }
      if (this.editFlag) {
        params = {
          Cid: this.value.id,
          Lid: this.editVal.id
        }
      }
      updatOneLevelName(params).then(res => {
        // this.editFlag = false
        this.$emit('update')
        this.$message.success('修改成功！')
        this.$emit('hide')
      // eslint-disable-next-line handle-callback-err
      }).catch(err => {
        this.$message.error('修改失败，请重试！')
      })
    },
    cancel() {
      this.$emit('hide')
    },
    edit() {
      this.visibleFlag = true
      console.log(this.visibleFlag)
    },
    setVisible() {
      this.visibleFlag = false
      console.log(this.visibleFlag)
    },
    setValue(val) {
      console.log('选择的选项')
      this.setVisible()
      this.editVal = val
      this.editFlag = true
      // this.level = val.levelName
      // this.levelName = val.levelName
      // console.log(val)
    }
  }
}
</script>
