<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
        <keep-alive>
          <tab-pane v-if="activeName==item.key" :type="item.key"  />
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
  data() {
    return {
       tabMapOptions: [
        { label: '全部', key: 'all' },
        { label: '由我负责的', key: 'my_responsibility.' },
        { label: '已处理的', key: 'processed' },
        { label: '未处理的', key: 'unprocessed' },
        { label: '自定义', key: 'customize' }
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
