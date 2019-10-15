 <template>
   <el-tabs>
          <el-tab-pane  label="详细资料">
            <customerDetail :type="show"></customerDetail>
          </el-tab-pane>
          <el-tab-pane  label="历史跟进">
            <history></history>
          </el-tab-pane>

          <el-tab-pane  label="跟进计划">
            <planDetail></planDetail>
          </el-tab-pane>
          <el-tab-pane  label="跟进任务">
             <taskDetail></taskDetail>
          </el-tab-pane>
          <el-tab-pane  label="联系人">
            <relation></relation>
          </el-tab-pane>
          <el-tab-pane  label="成交订单">

          </el-tab-pane>
            <el-tab-pane  label="回款记录">

          </el-tab-pane>
            <el-tab-pane  label="投诉记录">

          </el-tab-pane>
            <el-tab-pane  label="阶段修改记录">
              <stageLog></stageLog>
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