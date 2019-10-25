<template>
  <div class="tab-container">
    <el-tabs v-model="TopactiveName" style="margin-top:15px;" type="border-card">
     <el-tab-pane v-for="item in ToptabMapOptions" :key="item.key" :label="item.label" :name="item.key">
       <keep-alive>
         <tab-pane v-if="TopactiveName==item.key" :type="item.key"/>
       </keep-alive>
     </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import tabPane from './TabPane/index'

export default {
  components: { tabPane },
  data() {
    return {
      ToptabMapOptions: [
        { label: '我安排的', key: 'arrangeMyself' },
        { label: '我负责的', key: 'chargeMyself' },
        { label: '全部客户', key: 'allArrange' }
      ],
      TopactiveName:'allArrange',
      modelType:'myCustomer'
    }
  },
  watch: {
     TopactiveName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },
  created() {
    // init the default selected tab
    const tab = this.$route.query.tab
    if (tab) {
      this.TopactiveName = tab
    }
    this.$store.dispatch('customer/setmodelType','myCustomer')
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
