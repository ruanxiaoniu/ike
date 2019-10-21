 <template>
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
</template>
<script>
import customerDetail from '../../../public/customer/part-detail'
import history from '../../../crm/contact-follow/index'
import planDetail from '../../../crm/follow-plan/index'
import taskDetail from '../../../crm/follow-task/index'
import relation from '../../customer/relation'
// import relation from '../../../public/customer/relation'
import stageLog from '../stage-log'

export default {
  props:['Cid'],
  components:{
    customerDetail,
    history,
    relation,
    planDetail,
    taskDetail,
    stageLog
  }
}
</script>
<style scoped>

</style>