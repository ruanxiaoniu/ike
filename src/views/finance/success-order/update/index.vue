<template>
  <div>
    <!-- 修改状态 -->
    <state v-if="type=='customer_state'"></state>
    <!-- 修改客户阶段 -->
    <stage v-if="type=='customer_stage'"></stage>
    <!-- 修改客户等级 -->
    <level v-if="type=='customer_level'"></level>
    <!-- 修改客户来源 -->
    <origin v-if="type=='customer_origin'"></origin>
    <!-- 修改主联系手机号 -->
    <relationPrimary v-if="type=='relation_primary'"></relationPrimary>
    <!-- 修改主联系座机号 -->
    <landlineNumber v-if="type=='landline_number'"></landlineNumber>
    <!-- 修改最后跟进时间 -->
    <endFollow v-if="type=='end_follow'"></endFollow>
    <!-- 修改负责人 -->
    <employee v-if="type=='employee'"></employee>
  </div>
</template>
<script>
import state from './components/state'
import stage from './components/stage'
import level from './components/level'
import origin from './components/origin'
import relationPrimary from './components/relationPrimary'
import landlineNumber from './components/landlineNumber'
import endFollow from './components/endFollow'
import employee from './components/employee'

export default {
  props:['type'],
  components:{
    stage,
    state,
    level,
    origin,
    relationPrimary,
    landlineNumber,
    endFollow,
    employee
  },
  created(){
    console.log("type:"+this.type)
  }
}
</script>