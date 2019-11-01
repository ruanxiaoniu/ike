<template>
  <div>
         <!-- 修改投诉方式 -->
        <complaintMethod v-if="type==='complaintMethod'"></complaintMethod>
        <complaintType v-if="type==='complaintType'"></complaintType>
        <urgencyLevel v-if="type==='urgencyLevel'"></urgencyLevel>
        <employee v-if="type==='employeeName'"></employee>
  </div>
</template>
<script>
import complaintMethod from './components/complaintMethod'
import complaintType from './components/complaintType'
import urgencyLevel from './components/urgencyLevel'


export default {
  props:['type'],
  components:{
    complaintMethod,
    complaintType,
    urgencyLevel
  },
  data() {
    return {
       textMap:{
        search:'搜索',
        add:'新增投诉',
        complaintMethod:'修改投诉方式',
        complaintType:'修改投诉类型',
      },
    }
  },
  created(){
    console.log("type:"+this.type)
  }
}
</script>
