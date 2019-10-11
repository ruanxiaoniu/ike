<template>
  <div style="margin-top:20px">
    <el-timeline>
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :timestamp="activity.timestamp">
      {{activity.content}} <span @click="t">{{activity.timestamp}}</span>
      <div>jjj</div>
    </el-timeline-item>
  </el-timeline>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        reverse: true,
        activities: [{
          content: '活动按期开始',
          timestamp: '2018-04-15'
        }, {
          content: '通过审核',
          timestamp: '2018-04-13'
        }, {
          content: '创建成功',
          timestamp: '2018-04-11'
        }]
      };
    },
    methods:{
      t(){
        alert("hhha")
      }
    }
  };
</script>