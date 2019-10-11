<template>
  <div class="tab-container">
    <el-tabs v-model="TopactiveName" style="margin-top:15px;" type="border-card">
     <el-tab-pane v-for="item in ToptabMapOptions" :key="item.key" :label="item.label" :name="item.key">
       <keep-alive>
         <subtabPane v-if="TopactiveName==item.key" :type="item.key"  />
       </keep-alive>
     </el-tab-pane>
      <!-- <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
        <keep-alive>
          <tab-pane v-if="activeName==item.key" :type="item.key"  />
        </keep-alive>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import subtabPane from './TabPane/subTapPane'

export default {
  name: 'Tab',
  components: { subtabPane },
  data() {
    return {
      ToptabMapOptions: [
        { label: '我执行的', key: 'myExcute' },
        { label: '我创建的', key: 'myCreate' },
        { label: '抄送给我的', key: 'copy' },
      ],
      activeName:'all',
      TopactiveName:'myExcute',
      modelType:'myCustomer'
    }
  },
  watch: {
     TopactiveName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}&subtab=${this.activeName}`)
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
