<template>
  <div class="app-container">
    <el-tabs v-model="complaint">
      <el-tab-pane  label="投诉详情">
        <complaintDetail :type="show" :id="id" :key="complaint"></complaintDetail>
      </el-tab-pane>
      <el-tab-pane  label="投诉处理">
        <complaintHandle :id="id" :key="handle"></complaintHandle>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import complaintDetail from './detail/index'
  import complaintHandle from './handle/index'

  export default {
    components:{
      complaintDetail,
      complaintHandle
    },
    data() {
      return {
        id:'',
      }
    },
    created(){
      this.id = this.$store.getters.complaintRowList.id
    }
  }
</script>
<style scoped>
  header{
    /* font-weight: bolder */
    background-color: rgba(0, 0, 0, 0.02);
    height: 50px;
    line-height: 50px;
    font-weight: bolder;
    padding-left: 20px;
  }
</style>
