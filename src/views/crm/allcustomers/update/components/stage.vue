<template>
  <div>
     <el-form label-width="70px" label-position="left">
      <el-form-item label="客户阶段" >
         <el-input style="width:250px"></el-input>
      </el-form-item>
    </el-form>
    <div>
      <div style="text-align:center">
        <el-button size="small">取消</el-button>
        <el-button type="primary" size="small">确认</el-button>
      </div>
      <p></p>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>修改日志</span>
        </div>
        <div class="text item">
          <span class="icon">
            <svg-icon icon-class="people"></svg-icon>
          </span>
          <span>ruanyaolan于2019-10-09 15：14分修改阶段</span>   
        </div>
        <div class="text item">
          <span class="icon">
            <svg-icon icon-class="people"></svg-icon>
          </span>
          <span>ruanyaolan于2019-10-09 15：14分修改阶段</span>   
        </div>
        <div class="text item">
          <span class="icon">
            <svg-icon icon-class="people"></svg-icon>
          </span>
          <span>ruanyaolan于2019-10-09 15：14分修改阶段</span>   
        </div>
        <el-pagination
          small
          layout="prev, pager, next"
          :total="10"
          >
        </el-pagination>
      </el-card>

    </div>
    
  </div>
</template>
<script>
import pagination from '@/components/Pagination'
export default {
  components:{
    pagination,
  },
  data() {
    return {
       total:10,
       listQuery: {
        page: 1,
        limit: 20,
        sort: '+id'
      },
    }
  },
}
</script>
<style scoped>
.icon{
  border: 1px solid rgb(125, 156, 201);
  border-radius: 50%;
  background-color: rgb(125, 156, 201)
}
</style>