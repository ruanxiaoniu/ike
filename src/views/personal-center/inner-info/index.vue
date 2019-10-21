<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane v-for="item in tabMap" :key="item.key" :label="item.label" :name="item.key">
        <keep-alive>
          <tab-pane v-if="activeName==item.key" :type="item.key"/>
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
        tabMap: [
          { label: '未读', key: 'un_read' },
          { label: '已读', key: 'is_read' },
          { label: '全部', key: 'all' }
        ],
        activeName: 'un_read'
      }
    },
    watch: {
      activeName(val) {
        this.$router.push(`${this.$route.path}?tab=${val}`)
      }
    },
    created() {
      const tab = this.$route.query.tab
      if (tab) {
        this.activeName = tab
      }
      // this.$store.dispatch('message/setmodelType', 'unReadMsg')
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


