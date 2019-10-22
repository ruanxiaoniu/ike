 <template>
 <div class="app-container">
  <header>{{customerName}}详情</header>
   <el-tabs>
      <el-tab-pane  label="详细资料">
        <customerDetail :type="show" :Cid="Cid"></customerDetail>
      </el-tab-pane>
      <el-tab-pane  label="历史跟进">
        <history :Cid="Cid"></history>
      </el-tab-pane>

      <el-tab-pane  label="跟进计划">
        <planDetail :Cid="Cid"></planDetail>
      </el-tab-pane>
      <el-tab-pane  label="跟进任务">
          <taskDetail :Cid="Cid"></taskDetail>
      </el-tab-pane>
      <el-tab-pane  label="联系人">
        <relation :Cid="Cid"></relation>
      </el-tab-pane>
      <el-tab-pane  label="成交订单">

      </el-tab-pane>
        <el-tab-pane  label="回款记录">

      </el-tab-pane>
      <el-tab-pane  label="投诉记录">

      </el-tab-pane>
        <el-tab-pane  label="阶段修改记录">
          <stageLog :Cid="Cid"></stageLog>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import customerDetail from '../../../public/customer/part-detail'
// import history from '../../../crm/contact-follow/index'
import history from '../../../public/follow/base'
import planDetail from '../../../crm/follow-plan/index'
import taskDetail from '../../../crm/follow-task/index'
import relation from '../../customer/relation'
// import relation from '../../../public/customer/relation'
import stageLog from '../stage-log'

export default {
  // props:['Cid'],
  components:{
    customerDetail,
    history,
    relation,
    planDetail,
    taskDetail,
    stageLog,
  },
  data() {
    return {
      Cid:'',
      customerName:''
    }
  },
  created(){
    this.Cid=this.$route.query.customerId
    this.customerName=this.$route.query.customerName
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