<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
        <keep-alive>
          <tab-pane v-if="activeName==item.key" :type="item.key"  :Cid="Cid" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tabPane from './TabPane/index'

export default {
  props:['Cid'],
  name: 'Tab',
  components: { tabPane },
  data() {
    return {
      tabMapOptions: [
         { label: '全部', key: 'all' },
        { label: '我负责的', key: 'myfollow' },
        { label: '今日跟进计划', key: 'today_follow' },
        { label: '昨天跟进计划', key: 'yesterday' },
        { label: '本周跟进计划', key: 'this_week' },
      ],
      activeName:'all',
      modelType:'myCustomer'
    }
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },
  created() {
    // init the default selected tab
    const tab = this.$route.query.tab
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
