<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" style="margin-top:15px;" >
     <!-- <el-tab-pane v-for="element in ToptabMapOptions" :key="element.key" :label="element.label" :name="element.key">
       <keep-alive>
         <tab-pane v-if="TopactiveName==element.key" :type="element.key"  />
       </keep-alive>
     </el-tab-pane> -->
      <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
        <keep-alive>
          <tab-pane v-if="activeName==item.key" :type="item.key"  />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tabPane from './index'

export default {
  name: 'Tab',
  components: { tabPane },
  data() {
    return {
      tabMapOptions: [
        { label: '全部', key: 'all' },
        { label: '今日跟进任务', key: 'today_follow' },
        { label: '明天跟进任务', key: 'tomorrow_follow' },
        { label: '后天跟进任务', key: 'after_tomorrow' },
        { label: '本周跟进任务', key: 'this_week' },
        { label: '指定时间', key: 'appoint_time' }
      ],
      activeName:'all',
      TopactiveName:'myExcute',
      modelType:'myCustomer'
    }
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${this.TopactiveName}&subtab=${val}`)
    },
  },
  created() {
    // init the default selected tab
    const tab = this.$route.query.subtab
    if (tab) {
      this.activeName = tab
    }
    this.$store.dispatch('customer/setmodelType','myCustomer')
  },
  mounted(){
    
  },
  methods: {
    showCreatedTimes() {
      this.createdTimes = this.createdTimes + 1
    }
  }
}
</script>

<style scoped>
  .tab-container {
    margin: 30px;
  }
</style>
