 <template>
   <el-tabs>
          <el-tab-pane  label="详细资料">
            <detail></detail>
          </el-tab-pane>
          <el-tab-pane  label="历史跟进">
            <history></history>
              <!-- <el-form ref="deal_detail" :model="deal_detail.deal" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
                <el-form-item label="成交时间" prop="order_time">
                  <span>{{deal_detail.deal.order_time}}</span>
                </el-form-item>
                <el-form-item label="成本" prop="cost">
                  <span>{{deal_detail.deal.cost}}</span>
                </el-form-item>
                <el-form-item label="销售单价" prop="sale_price">
                  <span>{{deal_detail.deal.sale_price}}</span>
                </el-form-item>
                <el-form-item label="成交数量" prop="order_count">
                  <span>{{deal_detail.deal.order_count}}</span>
                </el-form-item>
                <el-form-item label="实际成交价" prop="actual_price">
                  <span>{{deal_detail.deal.actual_price}}</span>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                  <span>{{deal_detail.deal.remark}}</span>
                </el-form-item>
              </el-form> -->

            </el-tab-pane>

            <el-tab-pane  label="跟进计划">
  
            </el-tab-pane>
            <el-tab-pane  label="跟进任务">
  
            </el-tab-pane>
            <el-tab-pane  label="联系人">
  
            </el-tab-pane>
            <el-tab-pane  label="成交订单">
  
            </el-tab-pane>
             <el-tab-pane  label="回款记录">
  
            </el-tab-pane>
             <el-tab-pane  label="投诉记录">
  
            </el-tab-pane>
             <el-tab-pane  label="阶段修改记录">
  
            </el-tab-pane>
        </el-tabs>
</template>
<script>
import detail from './components/detail'
import history from './components/history'
export default {
  components:{
    detail,
    history
  }
}
</script>
<style scoped>

</style>