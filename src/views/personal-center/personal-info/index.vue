<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
        <keep-alive>
          <tab-pane v-if="item.key=='person_info'"></tab-pane>
          <update v-if="item.key=='info_modify'"></update>
          <updatePwd v-if="item.key=='password_modify'"></updatePwd>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import tabPane from './TabPane/index'
  import update from './TabPane/updateInfo'
  import updatePwd from './TabPane/updatePWD'
  export default {
    name: 'Tab',
    components: { tabPane ,update,updatePwd},
    data() {
      return {
        tabMapOptions: [
          { label: '个人信息', key: 'person_info' },
          { label: '信息修改', key: 'info_modify' },
          { label: '密码修改', key: 'password_modify' }
        ],
        activeName: 'person_info',
        createdTimes: 0
      }
    },
    watch: {
      activeName(val) {
        // 保存tab
        this.$router.push(`${this.$route.path}?tab=${val}`)
      }
    },
    created() {
      // init the default selected tab
      const tab = this.$route.query.tab
      if (tab) {
        this.activeName = tab
      }
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


