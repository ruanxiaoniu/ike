<template>
  <div>
     <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>修改日志</span>
        </div>
        <div class="text item" v-for="(item,index) in logList" :key="index">
          <span class="icon">
            <svg-icon icon-class="people"></svg-icon>
          </span>
          <span>{{item.modifyName}}于{{item.modifyTime|formatDate}}从‘{{item.stageBeforeName}}’阶段修改为‘{{item.stageAfterName}}’阶段</span>
        </div>
        <el-pagination
          small
          layout="prev, pager, next"
          :total="10"
          >
        </el-pagination>
      </el-card>

  </div>
</template>
<script>
import moment from 'moment'
import {stageLog} from '@/api/customer'
export default {
  props:['Cid'],
  data() {
    return {
      logList:null,
      params:{
        Cid:''
      }
    }
  },
  created() {
    if(this.Cid){
      this.params.Cid=this.Cid
      this.getstageLog()
    }
    
  },
  filters:{
     formatDate(time){
      return moment(time).format('YYYY-MM-DD hh:mm:ss')
    }
  },
  methods:{
    getstageLog(){
      // const params={
      //   Cid:this.$store.getters.customerRowList.id,
      //   pageNum:1,
      //   pageSize:10
      // }
      stageLog(params).then(res=>{
         this.logList=res.data.records
         console.log("logList")
         console.log(this.logList)
      })
    },
   
  }
}
</script>
<style scoped>
.icon{
  border: 1px solid rgb(125, 156, 201);
  border-radius: 50%;
  background-color: rgb(125, 156, 201);
  line-height: 50px;
}
</style>