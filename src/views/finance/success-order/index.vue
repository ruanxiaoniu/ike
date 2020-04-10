<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
        <keep-alive>
          <tab-pane v-if="activeName==item.key" :type="item.key" :Cid="Cid"/>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tabPane from './TabPane/index'

export default {

  name: 'Tab',
  components: { tabPane },
  props:['Cid'],
  data() {
    return {
      tabMapOptions: [
        { label: '全部', key: 'all' },
        { label: '未付款', key: 'unpaid' },
        { label: '已付款', key: 'paid' },
        { label: '回款中', key: 'returning' },
        { label: '退款中', key: 'refunding' },
        { label: '退款完成', key: 'refunded' }
      ],
      activeName: 'all'
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
    this.$store.dispatch('customer/setmodelType', 'allCustomer')
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
