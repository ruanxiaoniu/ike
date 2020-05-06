<template>
  <div v-if="dialogVisible">
    <el-dialog :title="textMap[type]" :visible.sync="dialogVisible" width="30%">
      <!-- 修改状态 -->
      <state v-if="type=='customerState'" :value="value" @hide="hide" @update="update" />
      <!-- 修改客户阶段 -->
      <stage v-if="type=='stageName'" :value="value" @hide="hide" @update="update" />
      <!-- 修改客户等级 -->
      <level v-if="type=='levelName'" :value="value" @hide="hide" @update="update" />
      <!-- 修改客户来源 -->
      <origin v-if="type=='originName'" :value="value" @hide="hide" @update="update" />
      <!-- 修改主联系手机号 -->
      <relationPrimary v-if="type=='relationPhone'" :value="value" @hide="hide" @update="update" />
      <!-- 修改主联系座机号 -->
      <landlineNumber v-if="type=='landLinePhone'" :value="value" @hide="hide" @update="update" />
      <!-- 修改负责人 -->
      <employee v-if="type=='employeeName'" :value="value" @hide="hide" @update="update" />
    </el-dialog>

  </div>
</template>
<script>
import state from './components/state'
import stage from './components/stage'
import level from './components/level'
import origin from './components/origin'
import relationPrimary from './components/relationPrimary'
import landlineNumber from './components/landlineNumber'
import employee from './components/employee'
// import employee from '../../../public/employee/index'

export default {
  components: {
    stage,
    state,
    level,
    origin,
    relationPrimary,
    landlineNumber,
    employee
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['type'],
  data() {
    return {
      dialogVisible: false,
      textMap: {
        search: '搜索',
        add: '新增客户',
        customerState: '修改客户状态',
        stageName: '修改客户阶段',
        levelName: '修改客户等级',
        originName: '修改客户来源',
        relationPhone: '修改主联系手机号',
        landLinePhone: '修改主联系座机号',
        listFollowTime: '修改最后跟进时间',
        employeeName: '修改负责人'
      },
      item: {}
    }
  },
  methods: {
    show(item) {
      this.$nextTick(() => {
        this.dialogVisible = true
        console.log('type');
        console.log(this.type);
        
        this.value = item
      })
    },
    hide() {
      this.dialogVisible = false
    },
    update() {
      this.$emit('update')
    }
  }
}
</script>
