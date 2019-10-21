<template>
  <div>
         <!-- 修改状态 -->
        <state v-if="type=='customerState'"></state>
        <!-- 修改客户阶段 -->
        <stage v-if="type=='stageName'"></stage>
        <!-- 修改客户等级 -->
        <level v-if="type=='levelName'"></level>
        <!-- 修改客户来源 -->
        <origin v-if="type=='originName'"></origin>
        <!-- 修改主联系手机号 -->
        <relationPrimary v-if="type=='relationPhone'"></relationPrimary>
        <!-- 修改主联系座机号 -->
        <landlineNumber v-if="type=='landLinePhone'"></landlineNumber>
        <!-- 修改最后跟进时间 -->
        <endFollow v-if="type=='listFollowTime'"></endFollow>
        <!-- 修改负责人 -->
        <employee v-if="type=='employeeName'"></employee>    
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
// import employee from './components/employee'
import employee from '../../../public/employee/index'


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
  data() {
    return {
       textMap:{
        search:'搜索',
        add:'新增客户',
        customerState:'修改客户状态',
        stageName:'修改客户阶段',
        levelName:'修改客户等级',
        originName:'修改客户来源',
        relationPhone:'修改主联系手机号',
        landLinePhone:'修改主联系座机号',
        listFollowTime:'修改最后跟进时间',
        employeeName:'修改负责人'
      },
    }
  },
  created(){
    console.log("type:"+this.type)
  }
}
</script>