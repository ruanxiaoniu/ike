<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
        <keep-alive>
          <baseData v-if="activeName==item.key" :type="item.key" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import baseData from '../../public/follow/base'
export default {
  name: 'Tab',
  components: { baseData },
  data() {
    return {
      tabMapOptions: [
        { label: '全部', key: 'all' },
        { label: '我负责的', key: 'myfollow' },
        { label: '今日跟进', key: 'today_follow' },
        { label: '昨天跟进', key: 'yesterday' },
        { label: '本周跟进', key: 'this_week' },
        { label: '本月跟进', key: 'this_month' }
      ],
      activeName: 'all',
      modelType: 'myCustomer'
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
    this.$store.dispatch('customer/setmodelType', 'myCustomer')
  },
  mounted() {

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
